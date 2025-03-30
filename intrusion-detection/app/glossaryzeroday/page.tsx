"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FloatingIcons } from "@/components/3d/floating-icons"
import { Particles } from "@/components/3d/particles"

export default function ZeroDayGlossaryPage() {
  const router = useRouter()

  return (
    <>
      <Navbar />
      <div className="container relative min-h-screen">
        <div className="absolute inset-0 -z-10">
          <Particles />
          <FloatingIcons />
        </div>
        <div className="mx-auto max-w-4xl px-4 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-none shadow-xl bg-gradient-to-br from-background to-background/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-yellow-500">Zero-Day Attack Detection Parameters Glossary</CardTitle>
                  <Button variant="outline" onClick={() => router.push("/dashboard")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Button>
                </div>
                <CardDescription>Understanding parameters used in zero-day attack detection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-yellow-500">🔍 Glossary: Understanding Zero-Day Attack Detection Parameters</h2>
                  <p className="mb-4">Zero-day attacks exploit unknown vulnerabilities before they can be patched, making them one of the most dangerous cyber threats. The following parameters help detect potential zero-day attacks by analyzing unusual network behavior and system interactions.</p>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-yellow-500">📌 Traffic Volume Parameters</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>src_bytes</b> (Numerical):
                      <p className="ml-6 mt-1">Represents the total bytes sent from the attacker to the target system. A sudden increase may indicate an attempt to exploit an unknown vulnerability by injecting malicious code.</p>
                    </li>
                    <li>
                      <b>dst_bytes</b> (Numerical):
                      <p className="ml-6 mt-1">The number of bytes sent from the target system back to the attacker. If a compromised system sends an unexpected amount of data, it could indicate data exfiltration following a zero-day exploit.</p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-yellow-500">📌 System Access Parameters</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>hot</b> (Numerical):
                      <p className="ml-6 mt-1">Counts the number of sensitive system features accessed. A high value may indicate an attacker is attempting to escalate privileges using a newly exploited vulnerability.</p>
                    </li>
                    <li>
                      <b>num_failed_logins</b> (Numerical):
                      <p className="ml-6 mt-1">Tracks failed login attempts. Repeated failures may suggest brute-force attempts or an attacker probing authentication mechanisms for weaknesses.</p>
                    </li>
                    <li>
                      <b>is_guest_login</b> (0 or 1):
                      <p className="ml-6 mt-1">Identifies whether the login is from a guest account. Zero-day attacks often use low-privilege accounts to infiltrate a system before escalating privileges.</p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-yellow-500">📌 Connection Pattern Parameters</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>dst_host_srv_count</b> (Numerical):
                      <p className="ml-6 mt-1">Indicates how many connections have been made to the same service. A sharp rise may suggest an attacker repeatedly targeting a vulnerable service to exploit an unknown flaw.</p>
                    </li>
                    <li>
                      <b>dst_host_same_src_port_rate</b> (0 to 1):
                      <p className="ml-6 mt-1">Measures the proportion of connections from the same source port. Attackers may use a consistent port to maintain persistence in a zero-day attack.</p>
                    </li>
                    <li>
                      <b>dst_host_srv_diff_host_rate</b> (0 to 1):
                      <p className="ml-6 mt-1">The rate of connections to different hosts. A high value could suggest an attacker is probing multiple systems for the same unknown vulnerability.</p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-yellow-500">📌 Service-Specific Parameters</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>service_ftp</b> (0 or 1):
                      <p className="ml-6 mt-1">Identifies whether the attack targets an FTP service. Zero-day exploits in FTP servers can be used to upload malicious files or gain unauthorized access.</p>
                    </li>
                    <li>
                      <b>service_ftp_data</b> (0 or 1):
                      <p className="ml-6 mt-1">Indicates if the attack involves FTP data transfer. Large amounts of unexpected FTP data may signal an attacker exfiltrating stolen information.</p>
                    </li>
                    <li>
                      <b>service_http</b> (0 or 1):
                      <p className="ml-6 mt-1">Determines if the attack targets an HTTP service. Web-based zero-day vulnerabilities are commonly exploited via specially crafted requests.</p>
                    </li>
                    <li>
                      <b>service_imap4</b> (0 or 1):
                      <p className="ml-6 mt-1">Checks if the attack is related to the IMAP4 email service. Zero-day attacks targeting IMAP may involve phishing campaigns or unauthorized email access.</p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-yellow-500">📌 Connection Flags</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>flag_RSTO</b> (0 or 1):
                      <p className="ml-6 mt-1">Represents connection reset attempts. Attackers may use this tactic to evade detection while exploiting an unknown vulnerability.</p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-yellow-500">🛡️ Why These Parameters Matter</h2>
                  <p className="mb-4">Zero-day attacks are unpredictable and highly damaging since there are no known patches at the time of exploitation. Detecting anomalies in network traffic, authentication failures, and service interactions can help security systems recognize and mitigate potential zero-day threats before significant harm is done.</p>
                  <p>🔹 Stay vigilant, monitor traffic, and implement proactive security measures to protect against zero-day threats!</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  )
}
