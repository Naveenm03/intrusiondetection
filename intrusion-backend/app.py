from flask import Flask,render_template,url_for,request,redirect,session,jsonify
from flask_material import Material
import pandas as pd
import numpy as np
from sklearn.feature_selection import RFE
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import classification_report
from sklearn import metrics

# ML Pkg

app = Flask(__name__)
Material(app)
app.secret_key="dont tell any one"

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/',methods=["POST"])
def login():
    if request.method == 'POST':
        username = request.form['id']
        password = request.form['pass']
        if username=='admin' and password=='admin':
            return redirect(url_for('main'))
        else:
            return render_template("index.html")

@app.route('/main')
def main():
    return render_template('main.html')

@app.route('/APT')
def APT():
    return render_template('APT.html')

@app.route('/ZERODAY')
def ZERODAY():
    return render_template('ZERODAY.html')

@app.route('/DDOS')
def DDOS():
    return render_template('DDOS.html')

@app.route('/main',methods=["POST"])
def analyze():
    if request.method == 'POST':
        print("calling dos")
        logged_in = float(request.form['logged_in'])
        rerror_rate = float(request.form['rerror_rate'])
        srv_rerror_rate = float(request.form['srv_rerror_rate'])
        dst_host_srv_count = float(request.form['dst_host_srv_count'])
        dst_host_diff_srv_rate = float(request.form['dst_host_diff_srv_rate'])
        dst_host_same_src_port_rate = float(request.form['dst_host_same_src_port_rate'])
        dst_host_srv_diff_host_rate = float(request.form['dst_host_srv_diff_host_rate'])
        dst_host_rerror_rate = float(request.form['dst_host_rerror_rate'])
        dst_host_srv_rerror_rate = float(request.form['dst_host_srv_rerror_rate'])
        Protocol_type_icmp = float(request.form['Protocol_type_icmp'])
        service_eco_i = float(request.form['service_eco_i'])
        service_private = float(request.form['service_private'])
        flag_SF = float(request.form['flag_SF'])

        col_names = ["duration","protocol_type","service","flag","src_bytes",
        "dst_bytes","land","wrong_fragment","urgent","hot","num_failed_logins",
        "logged_in","num_compromised","root_shell","su_attempted","num_root",
        "num_file_creations","num_shells","num_access_files","num_outbound_cmds",
        "is_host_login","is_guest_login","count","srv_count","serror_rate",
        "srv_serror_rate","rerror_rate","srv_rerror_rate","same_srv_rate",
        "diff_srv_rate","srv_diff_host_rate","dst_host_count","dst_host_srv_count",
        "dst_host_same_srv_rate","dst_host_diff_srv_rate","dst_host_same_src_port_rate",
        "dst_host_srv_diff_host_rate","dst_host_serror_rate","dst_host_srv_serror_rate",
        "dst_host_rerror_rate","dst_host_srv_rerror_rate","label"]

        df = pd.read_csv(r"KDDTrain+_2.csv", header=None, names = col_names)
        df_test = pd.read_csv(r"KDDTest+_2.csv", header=None, names = col_names)

        for col_name in df.columns:
            if df[col_name].dtypes == 'object' :
                unique_cat = len(df[col_name].unique())
                print("Feature '{col_name}' has {unique_cat} categories".format(col_name=col_name, unique_cat=unique_cat))

        print('Test set:')
        for col_name in df_test.columns:
            if df_test[col_name].dtypes == 'object' :
                unique_cat = len(df_test[col_name].unique())
                print("Feature '{col_name}' has {unique_cat} categories".format(col_name=col_name, unique_cat=unique_cat))

        from sklearn.preprocessing import LabelEncoder,OneHotEncoder
        categorical_columns=['protocol_type', 'service', 'flag']
        # insert code to get a list of categorical columns into a variable, categorical_columns
        categorical_columns=['protocol_type', 'service', 'flag'] 
        # Get the categorical values into a 2D numpy array
        df_categorical_values = df[categorical_columns]
        testdf_categorical_values = df_test[categorical_columns]
        df_categorical_values.head()

        # protocol type
        unique_protocol=sorted(df.protocol_type.unique())
        string1 = 'Protocol_type_'
        unique_protocol2=[string1 + x for x in unique_protocol]
        # service
        unique_service=sorted(df.service.unique())
        string2 = 'service_'
        unique_service2=[string2 + x for x in unique_service]
        # flag
        unique_flag=sorted(df.flag.unique())
        string3 = 'flag_'
        unique_flag2=[string3 + x for x in unique_flag]
        # put together
        dumcols=unique_protocol2 + unique_service2 + unique_flag2

        #do same for test set
        unique_service_test=sorted(df_test.service.unique())
        unique_service2_test=[string2 + x for x in unique_service_test]
        testdumcols=unique_protocol2 + unique_service2_test + unique_flag2

        df_categorical_values_enc=df_categorical_values.apply(LabelEncoder().fit_transform)
        testdf_categorical_values_enc=testdf_categorical_values.apply(LabelEncoder().fit_transform)

        enc = OneHotEncoder()
        df_categorical_values_encenc = enc.fit_transform(df_categorical_values_enc)
        df_cat_data = pd.DataFrame(df_categorical_values_encenc.toarray(),columns=dumcols)
        # test set
        testdf_categorical_values_encenc = enc.fit_transform(testdf_categorical_values_enc)
        testdf_cat_data = pd.DataFrame(testdf_categorical_values_encenc.toarray(),columns=testdumcols)

        trainservice=df['service'].tolist()
        testservice= df_test['service'].tolist()
        difference=list(set(trainservice) - set(testservice))
        string = 'service_'
        difference=[string + x for x in difference]

        newdf=df.join(df_cat_data)
        newdf.drop('flag', axis=1, inplace=True)
        newdf.drop('protocol_type', axis=1, inplace=True)
        newdf.drop('service', axis=1, inplace=True)
        # test data
        newdf_test=df_test.join(testdf_cat_data)
        newdf_test.drop('flag', axis=1, inplace=True)
        newdf_test.drop('protocol_type', axis=1, inplace=True)
        newdf_test.drop('service', axis=1, inplace=True)

        labeldf=newdf['label']
        labeldf_test=newdf_test['label']
        # change the label column
        newlabeldf=labeldf.replace({ 'normal' : 0, 'neptune' : 1 ,'back': 1, 'land': 1, 'pod': 1, 'smurf': 1, 'teardrop': 1,'mailbomb': 1, 'apache2': 1, 'processtable': 1, 'udpstorm': 1, 'worm': 1,
                                    'ipsweep' : 2,'nmap' : 2,'portsweep' : 2,'satan' : 2,'mscan' : 2,'saint' : 2
                                    ,'ftp_write': 3,'guess_passwd': 3,'imap': 3,'multihop': 3,'phf': 3,'spy': 3,'warezclient': 3,'warezmaster': 3,'sendmail': 3,'named': 3,'snmpgetattack': 3,'snmpguess': 3,'xlock': 3,'xsnoop': 3,'httptunnel': 3,
                                    'buffer_overflow': 4,'loadmodule': 4,'perl': 4,'rootkit': 4,'ps': 4,'sqlattack': 4,'xterm': 4})
        newlabeldf_test=labeldf_test.replace({ 'normal' : 0, 'neptune' : 1 ,'back': 1, 'land': 1, 'pod': 1, 'smurf': 1, 'teardrop': 1,'mailbomb': 1, 'apache2': 1, 'processtable': 1, 'udpstorm': 1, 'worm': 1,
                                    'ipsweep' : 2,'nmap' : 2,'portsweep' : 2,'satan' : 2,'mscan' : 2,'saint' : 2
                                    ,'ftp_write': 3,'guess_passwd': 3,'imap': 3,'multihop': 3,'phf': 3,'spy': 3,'warezclient': 3,'warezmaster': 3,'sendmail': 3,'named': 3,'snmpgetattack': 3,'snmpguess': 3,'xlock': 3,'xsnoop': 3,'httptunnel': 3,
                                    'buffer_overflow': 4,'loadmodule': 4,'perl': 4,'rootkit': 4,'ps': 4,'sqlattack': 4,'xterm': 4})
        # put the new label column back
        newdf['label'] = newlabeldf
        newdf_test['label'] = newlabeldf_test

        to_drop_DoS = [2,3,4]
        DoS_df=newdf[~newdf['label'].isin(to_drop_DoS)];

        # Split dataframes into X & Y
        # assign X as a dataframe of feautures and Y as a series of outcome variables
        X_DoS = DoS_df.drop('label',axis=1)
        Y_DoS = DoS_df.label

        dos_attack=X_DoS[['logged_in','count','serror_rate','srv_serror_rate', 'same_srv_rate', 'dst_host_count', 'dst_host_srv_count', 'dst_host_same_srv_rate', 'dst_host_serror_rate', 'dst_host_srv_serror_rate', 'service_http', 'flag_S0', 'flag_SF']]

        clf = DecisionTreeClassifier(random_state=0)
        clf.fit(dos_attack, Y_DoS)

        sample_data=[logged_in, rerror_rate, srv_rerror_rate, dst_host_srv_count, dst_host_diff_srv_rate, dst_host_same_src_port_rate, dst_host_srv_diff_host_rate, dst_host_rerror_rate, dst_host_srv_rerror_rate, Protocol_type_icmp, service_eco_i, service_private, flag_SF]
        clean_data = [float(i) for i in sample_data]
        ex1 = np.array(clean_data).reshape(1,-1)
        Y_DoS_pred2=clf.predict(ex1)
        session['prediction'] = int(Y_DoS_pred2[0])  # Convert to regular Python int
        result=''
        if Y_DoS_pred2 == 0:
            result='Normal Attack'
        else:
            result='DOS attack'
        
        return jsonify({
            'prediction': int(Y_DoS_pred2[0]),
            'result': result
        })

@app.route('/APT',methods=["POST"])
def analyze_apt():
    if request.method == 'POST':
        print("calling apt")
        logged_in = float(request.form['logged_in'])
        rerror_rate = float(request.form['rerror_rate'])
        srv_rerror_rate = float(request.form['srv_rerror_rate'])
        dst_host_srv_count = float(request.form['dst_host_srv_count'])
        dst_host_diff_srv_rate = float(request.form['dst_host_diff_srv_rate'])
        dst_host_same_src_port_rate = float(request.form['dst_host_same_src_port_rate'])
        dst_host_srv_diff_host_rate = float(request.form['dst_host_srv_diff_host_rate'])
        dst_host_rerror_rate = float(request.form['dst_host_rerror_rate'])
        dst_host_srv_rerror_rate = float(request.form['dst_host_srv_rerror_rate'])
        Protocol_type_icmp = float(request.form['Protocol_type_icmp'])
        service_eco_i = float(request.form['service_eco_i'])
        service_private = float(request.form['service_private'])
        flag_SF = float(request.form['flag_SF'])

        col_names = ["duration","protocol_type","service","flag","src_bytes",
        "dst_bytes","land","wrong_fragment","urgent","hot","num_failed_logins",
        "logged_in","num_compromised","root_shell","su_attempted","num_root",
        "num_file_creations","num_shells","num_access_files","num_outbound_cmds",
        "is_host_login","is_guest_login","count","srv_count","serror_rate",
        "srv_serror_rate","rerror_rate","srv_rerror_rate","same_srv_rate",
        "diff_srv_rate","srv_diff_host_rate","dst_host_count","dst_host_srv_count",
        "dst_host_same_srv_rate","dst_host_diff_srv_rate","dst_host_same_src_port_rate",
        "dst_host_srv_diff_host_rate","dst_host_serror_rate","dst_host_srv_serror_rate",
        "dst_host_rerror_rate","dst_host_srv_rerror_rate","label"]

        df = pd.read_csv(r"KDDTrain+_2.csv", header=None, names = col_names)
        df_test = pd.read_csv(r"KDDTest+_2.csv", header=None, names = col_names)

        for col_name in df.columns:
            if df[col_name].dtypes == 'object' :
                unique_cat = len(df[col_name].unique())
                print("Feature '{col_name}' has {unique_cat} categories".format(col_name=col_name, unique_cat=unique_cat))

        print('Test set:')
        for col_name in df_test.columns:
            if df_test[col_name].dtypes == 'object' :
                unique_cat = len(df_test[col_name].unique())
                print("Feature '{col_name}' has {unique_cat} categories".format(col_name=col_name, unique_cat=unique_cat))

        from sklearn.preprocessing import LabelEncoder,OneHotEncoder
        categorical_columns=['protocol_type', 'service', 'flag']
        # insert code to get a list of categorical columns into a variable, categorical_columns
        categorical_columns=['protocol_type', 'service', 'flag'] 
        # Get the categorical values into a 2D numpy array
        df_categorical_values = df[categorical_columns]
        testdf_categorical_values = df_test[categorical_columns]
        df_categorical_values.head()

        # protocol type
        unique_protocol=sorted(df.protocol_type.unique())
        string1 = 'Protocol_type_'
        unique_protocol2=[string1 + x for x in unique_protocol]
        # service
        unique_service=sorted(df.service.unique())
        string2 = 'service_'
        unique_service2=[string2 + x for x in unique_service]
        # flag
        unique_flag=sorted(df.flag.unique())
        string3 = 'flag_'
        unique_flag2=[string3 + x for x in unique_flag]
        # put together
        dumcols=unique_protocol2 + unique_service2 + unique_flag2

        #do same for test set
        unique_service_test=sorted(df_test.service.unique())
        unique_service2_test=[string2 + x for x in unique_service_test]
        testdumcols=unique_protocol2 + unique_service2_test + unique_flag2

        df_categorical_values_enc=df_categorical_values.apply(LabelEncoder().fit_transform)
        testdf_categorical_values_enc=testdf_categorical_values.apply(LabelEncoder().fit_transform)

        enc = OneHotEncoder()
        df_categorical_values_encenc = enc.fit_transform(df_categorical_values_enc)
        df_cat_data = pd.DataFrame(df_categorical_values_encenc.toarray(),columns=dumcols)
        # test set
        testdf_categorical_values_encenc = enc.fit_transform(testdf_categorical_values_enc)
        testdf_cat_data = pd.DataFrame(testdf_categorical_values_encenc.toarray(),columns=testdumcols)

        trainservice=df['service'].tolist()
        testservice= df_test['service'].tolist()
        difference=list(set(trainservice) - set(testservice))
        string = 'service_'
        difference=[string + x for x in difference]

        newdf=df.join(df_cat_data)
        newdf.drop('flag', axis=1, inplace=True)
        newdf.drop('protocol_type', axis=1, inplace=True)
        newdf.drop('service', axis=1, inplace=True)
        # test data
        newdf_test=df_test.join(testdf_cat_data)
        newdf_test.drop('flag', axis=1, inplace=True)
        newdf_test.drop('protocol_type', axis=1, inplace=True)
        newdf_test.drop('service', axis=1, inplace=True)

        labeldf=newdf['label']
        labeldf_test=newdf_test['label']
        # change the label column
        newlabeldf=labeldf.replace({ 'normal' : 0, 'neptune' : 1 ,'back': 1, 'land': 1, 'pod': 1, 'smurf': 1, 'teardrop': 1,'mailbomb': 1, 'apache2': 1, 'processtable': 1, 'udpstorm': 1, 'worm': 1,
                                    'ipsweep' : 2,'nmap' : 2,'portsweep' : 2,'satan' : 2,'mscan' : 2,'saint' : 2
                                    ,'ftp_write': 3,'guess_passwd': 3,'imap': 3,'multihop': 3,'phf': 3,'spy': 3,'warezclient': 3,'warezmaster': 3,'sendmail': 3,'named': 3,'snmpgetattack': 3,'snmpguess': 3,'xlock': 3,'xsnoop': 3,'httptunnel': 3,
                                    'buffer_overflow': 4,'loadmodule': 4,'perl': 4,'rootkit': 4,'ps': 4,'sqlattack': 4,'xterm': 4})
        newlabeldf_test=labeldf_test.replace({ 'normal' : 0, 'neptune' : 1 ,'back': 1, 'land': 1, 'pod': 1, 'smurf': 1, 'teardrop': 1,'mailbomb': 1, 'apache2': 1, 'processtable': 1, 'udpstorm': 1, 'worm': 1,
                                    'ipsweep' : 2,'nmap' : 2,'portsweep' : 2,'satan' : 2,'mscan' : 2,'saint' : 2
                                    ,'ftp_write': 3,'guess_passwd': 3,'imap': 3,'multihop': 3,'phf': 3,'spy': 3,'warezclient': 3,'warezmaster': 3,'sendmail': 3,'named': 3,'snmpgetattack': 3,'snmpguess': 3,'xlock': 3,'xsnoop': 3,'httptunnel': 3,
                                    'buffer_overflow': 4,'loadmodule': 4,'perl': 4,'rootkit': 4,'ps': 4,'sqlattack': 4,'xterm': 4})
        # put the new label column back
        newdf['label'] = newlabeldf
        newdf_test['label'] = newlabeldf_test

        # For APT, we want to detect R2L attacks (label 3)
        to_drop_APT = [1,2,4]  # Keep only normal (0) and R2L (3)
        APT_df=newdf[~newdf['label'].isin(to_drop_APT)]

        # Split dataframes into X & Y
        # assign X as a dataframe of feautures and Y as a series of outcome variables
        X_APT = APT_df.drop('label',axis=1)
        Y_APT = APT_df.label

        # Use the same features as the DoS model for consistency
        apt_attack=X_APT[['logged_in', 'rerror_rate', 'srv_rerror_rate', 'dst_host_srv_count', 'dst_host_diff_srv_rate', 'dst_host_same_src_port_rate', 'dst_host_srv_diff_host_rate', 'dst_host_rerror_rate', 'dst_host_srv_rerror_rate', 'Protocol_type_icmp', 'service_eco_i', 'service_private', 'flag_SF']]

        clf = DecisionTreeClassifier(random_state=0)
        clf.fit(apt_attack, Y_APT)

        sample_data=[logged_in, rerror_rate, srv_rerror_rate, dst_host_srv_count, dst_host_diff_srv_rate, dst_host_same_src_port_rate, dst_host_srv_diff_host_rate, dst_host_rerror_rate, dst_host_srv_rerror_rate, Protocol_type_icmp, service_eco_i, service_private, flag_SF]
        clean_data = [float(i) for i in sample_data]
        ex1 = np.array(clean_data).reshape(1,-1)
        res=clf.predict(ex1)
        session['prediction'] = int(res[0])  # Convert to regular Python int
        result1=''
        if res == 0:
            result1='Normal Traffic'
        else:
            result1='APT ATTACK'
        
        return jsonify({
            'prediction': int(res[0]),
            'result': result1
        })

@app.route('/ZERODAY',methods=["POST"])
def analyze2():
	if request.method == 'POST':
		print("calling R2l")
		src_bytes = float(request.form['src_bytes'])
		dst_bytes = float(request.form['dst_bytes'])
		hot = float(request.form['hot'])
		num_failed_logins = float(request.form['num_failed_logins'])
		is_guest_login = float(request.form['is_guest_login'])
		dst_host_srv_count = float(request.form['dst_host_srv_count'])
		dst_host_same_src_port_rate = float(request.form['dst_host_same_src_port_rate'])
		dst_host_srv_diff_host_rate = float(request.form['dst_host_srv_diff_host_rate'])
		service_ftp = float(request.form['service_ftp'])
		service_ftp_data = float(request.form['service_ftp_data'])
		service_http = float(request.form['service_http'])
		service_imap4 = float(request.form['service_imap4'])
		flag_RSTO = float(request.form['flag_RSTO'])

		col_names = ["duration","protocol_type","service","flag","src_bytes",
    	"dst_bytes","land","wrong_fragment","urgent","hot","num_failed_logins",
		"logged_in","num_compromised","root_shell","su_attempted","num_root",
		"num_file_creations","num_shells","num_access_files","num_outbound_cmds",
		"is_host_login","is_guest_login","count","srv_count","serror_rate",
		"srv_serror_rate","rerror_rate","srv_rerror_rate","same_srv_rate",
		"diff_srv_rate","srv_diff_host_rate","dst_host_count","dst_host_srv_count",
		"dst_host_same_srv_rate","dst_host_diff_srv_rate","dst_host_same_src_port_rate",
		"dst_host_srv_diff_host_rate","dst_host_serror_rate","dst_host_srv_serror_rate",
		"dst_host_rerror_rate","dst_host_srv_rerror_rate","label"]

		df = pd.read_csv(r"KDDTrain+_2.csv", header=None, names = col_names)
		df_test = pd.read_csv(r"KDDTest+_2.csv", header=None, names = col_names)

		for col_name in df.columns:
			if df[col_name].dtypes == 'object' :
				unique_cat = len(df[col_name].unique())
				print("Feature '{col_name}' has {unique_cat} categories".format(col_name=col_name, unique_cat=unique_cat))

		print('Test set:')
		for col_name in df_test.columns:
			if df_test[col_name].dtypes == 'object' :
				unique_cat = len(df_test[col_name].unique())
				print("Feature '{col_name}' has {unique_cat} categories".format(col_name=col_name, unique_cat=unique_cat))

		from sklearn.preprocessing import LabelEncoder,OneHotEncoder
		categorical_columns=['protocol_type', 'service', 'flag']
		# insert code to get a list of categorical columns into a variable, categorical_columns
		categorical_columns=['protocol_type', 'service', 'flag'] 
		# Get the categorical values into a 2D numpy array
		df_categorical_values = df[categorical_columns]
		testdf_categorical_values = df_test[categorical_columns]
		df_categorical_values.head()

		# protocol type
		unique_protocol=sorted(df.protocol_type.unique())
		string1 = 'Protocol_type_'
		unique_protocol2=[string1 + x for x in unique_protocol]
		# service
		unique_service=sorted(df.service.unique())
		string2 = 'service_'
		unique_service2=[string2 + x for x in unique_service]
		# flag
		unique_flag=sorted(df.flag.unique())
		string3 = 'flag_'
		unique_flag2=[string3 + x for x in unique_flag]
		# put together
		dumcols=unique_protocol2 + unique_service2 + unique_flag2

		#do same for test set
		unique_service_test=sorted(df_test.service.unique())
		unique_service2_test=[string2 + x for x in unique_service_test]
		testdumcols=unique_protocol2 + unique_service2_test + unique_flag2

		df_categorical_values_enc=df_categorical_values.apply(LabelEncoder().fit_transform)
		testdf_categorical_values_enc=testdf_categorical_values.apply(LabelEncoder().fit_transform)

		enc = OneHotEncoder()
		df_categorical_values_encenc = enc.fit_transform(df_categorical_values_enc)
		df_cat_data = pd.DataFrame(df_categorical_values_encenc.toarray(),columns=dumcols)
		# test set
		testdf_categorical_values_encenc = enc.fit_transform(testdf_categorical_values_enc)
		testdf_cat_data = pd.DataFrame(testdf_categorical_values_encenc.toarray(),columns=testdumcols)

		trainservice=df['service'].tolist()
		testservice= df_test['service'].tolist()
		difference=list(set(trainservice) - set(testservice))
		string = 'service_'
		difference=[string + x for x in difference]

		newdf=df.join(df_cat_data)
		newdf.drop('flag', axis=1, inplace=True)
		newdf.drop('protocol_type', axis=1, inplace=True)
		newdf.drop('service', axis=1, inplace=True)
		# test data
		newdf_test=df_test.join(testdf_cat_data)
		newdf_test.drop('flag', axis=1, inplace=True)
		newdf_test.drop('protocol_type', axis=1, inplace=True)
		newdf_test.drop('service', axis=1, inplace=True)

		labeldf=newdf['label']
		labeldf_test=newdf_test['label']
		# change the label column
		newlabeldf=labeldf.replace({ 'normal' : 0, 'neptune' : 1 ,'back': 1, 'land': 1, 'pod': 1, 'smurf': 1, 'teardrop': 1,'mailbomb': 1, 'apache2': 1, 'processtable': 1, 'udpstorm': 1, 'worm': 1,
									'ipsweep' : 2,'nmap' : 2,'portsweep' : 2,'satan' : 2,'mscan' : 2,'saint' : 2
									,'ftp_write': 3,'guess_passwd': 3,'imap': 3,'multihop': 3,'phf': 3,'spy': 3,'warezclient': 3,'warezmaster': 3,'sendmail': 3,'named': 3,'snmpgetattack': 3,'snmpguess': 3,'xlock': 3,'xsnoop': 3,'httptunnel': 3,
									'buffer_overflow': 4,'loadmodule': 4,'perl': 4,'rootkit': 4,'ps': 4,'sqlattack': 4,'xterm': 4})
		newlabeldf_test=labeldf_test.replace({ 'normal' : 0, 'neptune' : 1 ,'back': 1, 'land': 1, 'pod': 1, 'smurf': 1, 'teardrop': 1,'mailbomb': 1, 'apache2': 1, 'processtable': 1, 'udpstorm': 1, 'worm': 1,
									'ipsweep' : 2,'nmap' : 2,'portsweep' : 2,'satan' : 2,'mscan' : 2,'saint' : 2
									,'ftp_write': 3,'guess_passwd': 3,'imap': 3,'multihop': 3,'phf': 3,'spy': 3,'warezclient': 3,'warezmaster': 3,'sendmail': 3,'named': 3,'snmpgetattack': 3,'snmpguess': 3,'xlock': 3,'xsnoop': 3,'httptunnel': 3,
									'buffer_overflow': 4,'loadmodule': 4,'perl': 4,'rootkit': 4,'ps': 4,'sqlattack': 4,'xterm': 4})
		# put the new label column back
		newdf['label'] = newlabeldf
		newdf_test['label'] = newlabeldf_test


		to_drop_R2L = [1,2,4]


		R2L_df=newdf[~newdf['label'].isin(to_drop_R2L)];

		

		X_R2L = R2L_df.drop('label',axis=1)
		Y_R2L = R2L_df.label

		R2L_attack=X_R2L[['src_bytes', 'dst_bytes', 'hot', 'num_failed_logins', 'is_guest_login', 'dst_host_srv_count', 'dst_host_same_src_port_rate', 'dst_host_srv_diff_host_rate', 'service_ftp', 'service_ftp_data', 'service_http', 'service_imap4', 'flag_RSTO']]
		clf1 = DecisionTreeClassifier(random_state=0)
		clf1.fit(R2L_attack, Y_R2L)

		sample_data=[src_bytes, dst_bytes, hot, num_failed_logins, is_guest_login, dst_host_srv_count, dst_host_same_src_port_rate, dst_host_srv_diff_host_rate, service_ftp, service_ftp_data, service_http, service_imap4, flag_RSTO]
		clean_data = [float(i) for i in sample_data]
		ex1 = np.array(clean_data).reshape(1,-1)
		res2=clf1.predict(ex1)
		session['prediction'] = int(res2[0])  # Convert to regular Python int
		result2=''
		if res2 == 0:
			result2='Normal attack'
		else:
			result2='ZERODAY ATTACK'
		
		return jsonify({
			'prediction': int(res2[0]),
			'result': result2
		})


@app.route('/DDOS',methods=["POST"])
def analyze3():
	if request.method == 'POST':
		print("calling U2r")
		urgent = float(request.form['urgent'])
		hot = float(request.form['hot'])
		root_shell = float(request.form['root_shell'])
		num_file_creations = float(request.form['num_file_creations'])
		num_shells = float(request.form['num_shells'])
		srv_diff_host_rate = float(request.form['srv_diff_host_rate'])

		dst_host_count = float(request.form['dst_host_count'])
		dst_host_srv_count = float(request.form['dst_host_srv_count'])
		dst_host_same_src_port_rate = float(request.form['dst_host_same_src_port_rate'])
		dst_host_srv_diff_host_rate = float(request.form['dst_host_srv_diff_host_rate'])
		service_ftp_data = float(request.form['service_ftp_data'])
		service_http = float(request.form['service_http'])
		service_telnet = float(request.form['service_telnet'])

		col_names = ["duration","protocol_type","service","flag","src_bytes",
    	"dst_bytes","land","wrong_fragment","urgent","hot","num_failed_logins",
		"logged_in","num_compromised","root_shell","su_attempted","num_root",
		"num_file_creations","num_shells","num_access_files","num_outbound_cmds",
		"is_host_login","is_guest_login","count","srv_count","serror_rate",
		"srv_serror_rate","rerror_rate","srv_rerror_rate","same_srv_rate",
		"diff_srv_rate","srv_diff_host_rate","dst_host_count","dst_host_srv_count",
		"dst_host_same_srv_rate","dst_host_diff_srv_rate","dst_host_same_src_port_rate",
		"dst_host_srv_diff_host_rate","dst_host_serror_rate","dst_host_srv_serror_rate",
		"dst_host_rerror_rate","dst_host_srv_rerror_rate","label"]

		df = pd.read_csv(r"KDDTrain+_2.csv", header=None, names = col_names)
		df_test = pd.read_csv(r"KDDTest+_2.csv", header=None, names = col_names)

		for col_name in df.columns:
			if df[col_name].dtypes == 'object' :
				unique_cat = len(df[col_name].unique())
				print("Feature '{col_name}' has {unique_cat} categories".format(col_name=col_name, unique_cat=unique_cat))

		print('Test set:')
		for col_name in df_test.columns:
			if df_test[col_name].dtypes == 'object' :
				unique_cat = len(df_test[col_name].unique())
				print("Feature '{col_name}' has {unique_cat} categories".format(col_name=col_name, unique_cat=unique_cat))

		from sklearn.preprocessing import LabelEncoder,OneHotEncoder
		categorical_columns=['protocol_type', 'service', 'flag']
		# insert code to get a list of categorical columns into a variable, categorical_columns
		categorical_columns=['protocol_type', 'service', 'flag'] 
		# Get the categorical values into a 2D numpy array
		df_categorical_values = df[categorical_columns]
		testdf_categorical_values = df_test[categorical_columns]
		df_categorical_values.head()

		# protocol type
		unique_protocol=sorted(df.protocol_type.unique())
		string1 = 'Protocol_type_'
		unique_protocol2=[string1 + x for x in unique_protocol]
		# service
		unique_service=sorted(df.service.unique())
		string2 = 'service_'
		unique_service2=[string2 + x for x in unique_service]
		# flag
		unique_flag=sorted(df.flag.unique())
		string3 = 'flag_'
		unique_flag2=[string3 + x for x in unique_flag]
		# put together
		dumcols=unique_protocol2 + unique_service2 + unique_flag2


		#do same for test set
		unique_service_test=sorted(df_test.service.unique())
		unique_service2_test=[string2 + x for x in unique_service_test]
		testdumcols=unique_protocol2 + unique_service2_test + unique_flag2

		df_categorical_values_enc=df_categorical_values.apply(LabelEncoder().fit_transform)
		testdf_categorical_values_enc=testdf_categorical_values.apply(LabelEncoder().fit_transform)

		enc = OneHotEncoder()
		df_categorical_values_encenc = enc.fit_transform(df_categorical_values_enc)
		df_cat_data = pd.DataFrame(df_categorical_values_encenc.toarray(),columns=dumcols)
		# test set
		testdf_categorical_values_encenc = enc.fit_transform(testdf_categorical_values_enc)
		testdf_cat_data = pd.DataFrame(testdf_categorical_values_encenc.toarray(),columns=testdumcols)

		trainservice=df['service'].tolist()
		testservice= df_test['service'].tolist()
		difference=list(set(trainservice) - set(testservice))
		string = 'service_'
		difference=[string + x for x in difference]

		newdf=df.join(df_cat_data)
		newdf.drop('flag', axis=1, inplace=True)
		newdf.drop('protocol_type', axis=1, inplace=True)
		newdf.drop('service', axis=1, inplace=True)
		# test data
		newdf_test=df_test.join(testdf_cat_data)
		newdf_test.drop('flag', axis=1, inplace=True)
		newdf_test.drop('protocol_type', axis=1, inplace=True)
		newdf_test.drop('service', axis=1, inplace=True)

		labeldf=newdf['label']
		labeldf_test=newdf_test['label']
		# change the label column
		newlabeldf=labeldf.replace({ 'normal' : 0, 'neptune' : 1 ,'back': 1, 'land': 1, 'pod': 1, 'smurf': 1, 'teardrop': 1,'mailbomb': 1, 'apache2': 1, 'processtable': 1, 'udpstorm': 1, 'worm': 1,
									'ipsweep' : 2,'nmap' : 2,'portsweep' : 2,'satan' : 2,'mscan' : 2,'saint' : 2
									,'ftp_write': 3,'guess_passwd': 3,'imap': 3,'multihop': 3,'phf': 3,'spy': 3,'warezclient': 3,'warezmaster': 3,'sendmail': 3,'named': 3,'snmpgetattack': 3,'snmpguess': 3,'xlock': 3,'xsnoop': 3,'httptunnel': 3,
									'buffer_overflow': 4,'loadmodule': 4,'perl': 4,'rootkit': 4,'ps': 4,'sqlattack': 4,'xterm': 4})
		newlabeldf_test=labeldf_test.replace({ 'normal' : 0, 'neptune' : 1 ,'back': 1, 'land': 1, 'pod': 1, 'smurf': 1, 'teardrop': 1,'mailbomb': 1, 'apache2': 1, 'processtable': 1, 'udpstorm': 1, 'worm': 1,
									'ipsweep' : 2,'nmap' : 2,'portsweep' : 2,'satan' : 2,'mscan' : 2,'saint' : 2
									,'ftp_write': 3,'guess_passwd': 3,'imap': 3,'multihop': 3,'phf': 3,'spy': 3,'warezclient': 3,'warezmaster': 3,'sendmail': 3,'named': 3,'snmpgetattack': 3,'snmpguess': 3,'xlock': 3,'xsnoop': 3,'httptunnel': 3,
									'buffer_overflow': 4,'loadmodule': 4,'perl': 4,'rootkit': 4,'ps': 4,'sqlattack': 4,'xterm': 4})
		# put the new label column back
		newdf['label'] = newlabeldf
		newdf_test['label'] = newlabeldf_test

		to_drop_U2R = [1,2,3]
		U2R_df=newdf[~newdf['label'].isin(to_drop_U2R)];

		X_U2R = U2R_df.drop('label',axis=1)
		Y_U2R = U2R_df.label

		U2R_attack=X_U2R[['urgent', 'hot', 'root_shell', 'num_file_creations', 'num_shells', 'srv_diff_host_rate', 'dst_host_count', 'dst_host_srv_count', 'dst_host_same_src_port_rate', 'dst_host_srv_diff_host_rate', 'service_ftp_data', 'service_http', 'service_telnet']]


		
		clf3 = DecisionTreeClassifier(random_state=0)
		clf3.fit(U2R_attack, Y_U2R)

		sample_data=[urgent, hot, root_shell, num_file_creations, num_shells, srv_diff_host_rate, dst_host_count, dst_host_srv_count, dst_host_same_src_port_rate, dst_host_srv_diff_host_rate, service_ftp_data, service_http, service_telnet]
		clean_data = [float(i) for i in sample_data]
		ex1 = np.array(clean_data).reshape(1,-1)
		res3=clf3.predict(ex1)
		session['prediction'] = int(res3[0])  # Convert to regular Python int
		result3=''
		if res3 == 0:
			result3='Normal Attack'
		else:
			result3='DDOS ATTACK'
		
		return jsonify({
			'prediction': int(res3[0]),
			'result': result3
		})

@app.route('/introductiondos')
def introductiondos():
    return render_template('introductiondos.html')

@app.route('/typesdos')
def typesdos():
    return render_template('typesdos.html')

@app.route('/glossarydos')
def glossarydos():
    return render_template('glossarydos.html')
 
@app.route('/introductionapt')
def introductionapt():
    return render_template('introductionapt.html')

@app.route('/typesapt')
def typesapt():
    return render_template('typesapt.html')

@app.route('/glossaryapt')
def glossaryapt():
    return render_template('glossaryapt.html')

@app.route('/introductionzeroday')
def introductionzeroday():
    return render_template('introductionzeroday.html')

@app.route('/typeszeroday')
def typeszeroday():
    return render_template('typeszeroday.html')

@app.route('/glossaryzeroday')
def glossaryzeroday():
    return render_template('glossaryzeroday.html')	

@app.route('/introductionddos')
def introductionddos():
    return render_template('introductionddos.html')	

@app.route('/typesddos')
def typesddos():
    return render_template('typesddos.html')

@app.route('/glossaryddos')
def glossaryddos():
    return render_template('glossaryddos.html')	
@app.route('/dos')
def dos():
    return render_template('dos.html')
@app.route('/apt')
def apt():
    return render_template('apt.html')
@app.route('/zeroday')
def zeroday():
    return render_template('zeroday.html')
@app.route('/ddos')
def ddos():
    return render_template('ddos.html')

@app.route('/preventive_measures')
def preventive_measures():
    prediction = session.get('prediction', 0)  # Get prediction from session, default to 0 if not found
    return render_template('preventive_measures.html', Y_DoS_pred2=prediction)

if __name__ == '__main__':
	app.run(debug=True)
