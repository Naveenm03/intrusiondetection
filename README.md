# Intrusion Detection System

A modern web-based Intrusion Detection System (IDS) that combines machine learning with a user-friendly interface for network security monitoring.

## Project Structure

The project is divided into two main components:

1. **Frontend (intrusion-detection/)**
   - Next.js-based web application
   - Modern UI with Tailwind CSS
   - Real-time monitoring dashboard
   - Interactive visualizations

2. **Backend (intrusion-backend/)**
   - Python-based machine learning backend
   - Network traffic analysis
   - Anomaly detection
   - KDD Cup 99 dataset integration

## Features

- Real-time network traffic monitoring
- Machine learning-based intrusion detection
- Interactive dashboard with visualizations
- Historical data analysis
- Alert system for suspicious activities
- User-friendly interface for security monitoring

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- React Three Fiber (3D visualizations)
- Shadcn UI components

### Backend
- Python
- Machine Learning models
- KDD Cup 99 dataset
- FastAPI (for API endpoints)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python 3.8+
- pnpm (package manager)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd intrusiondetection
```

2. Install frontend dependencies:
```bash
cd intrusion-detection
pnpm install
```

3. Install backend dependencies:
```bash
cd ../intrusion-backend
pip install -r requirements.txt
```

### Running the Application

1. Start the backend server:
```bash
cd intrusion-backend
python app.py
```

2. Start the frontend development server:
```bash
cd intrusion-detection
pnpm dev
```

The application will be available at `http://localhost:3000`

## Dataset

The system uses the KDD Cup 99 dataset for training and testing:
- Training data: `KDDTrain+_2.csv`
- Testing data: `KDDTest+_2.csv`

## Project Structure Details

### Frontend Structure
```
intrusion-detection/
├── app/              # Next.js app directory
├── components/       # React components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── public/          # Static assets
└── styles/          # Global styles
```

### Backend Structure
```
intrusion-backend/
├── app.py           # Main backend application
├── KDDTrain+_2.csv  # Training dataset
└── KDDTest+_2.csv   # Testing dataset
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- KDD Cup 99 dataset
- Next.js team
- Tailwind CSS team
- All contributors and maintainers 
