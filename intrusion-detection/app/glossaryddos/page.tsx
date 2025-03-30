"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FloatingIcons } from "@/components/3d/floating-icons"
import { Particles } from "@/components/3d/particles"

export default function DDoSGlossaryPage() {
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
                  <CardTitle className="text-2xl font-bold text-primary">DDoS Detection Parameters Glossary</CardTitle>
                  <Button variant="outline" onClick={() => router.push("/dashboard")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Button>
                </div>
                <CardDescription>Understanding parameters used in DDoS attack detection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">Understanding DDoS Detection Parameters</h2>
                  <p>To effectively detect Distributed Denial of Service (DDoS) attacks, our system analyzes various network parameters. These indicators help identify unusual traffic patterns that may suggest an ongoing attack.</p>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">System Access Parameters</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>urgent</b>
                      <p className="ml-6 mt-1">Measures the number of urgent packets sent. Attackers may use urgent flag packets to overwhelm network resources or bypass normal traffic filtering mechanisms.</p>
                    </li>
                    <li>
                      <b>hot</b>
                      <p className="ml-6 mt-1">Indicates the number of hot indicators, such as sensitive data access attempts. A spike in this value may signal an attacker probing for vulnerabilities before launching a large-scale DDoS attack.</p>
                    </li>
                    <li>
                      <b>root_shell</b>
                      <p className="ml-6 mt-1">If set to 1, it means the attacker has gained root-level (administrator) access. This is an extremely dangerous condition, as attackers could deploy DDoS malware or botnets from within the system.</p>
                    </li>
                    <li>
                      <b>num_file_creations</b>
                      <p className="ml-6 mt-1">Tracks the number of new file creations during a session. Attackers may create scripts or executables to automate DDoS attacks from compromised machines.</p>
                    </li>
                    <li>
                      <b>num_shells</b>
                      <p className="ml-6 mt-1">Measures the number of shell prompts invoked. A high value could indicate that an attacker is using automated scripts to launch DDoS commands from multiple compromised endpoints.</p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">Connection Pattern Parameters</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>srv_diff_host_rate</b>
                      <p className="ml-6 mt-1">Tracks whether traffic is distributed across multiple servers. In a DDoS attack, this rate may be low, as the attack focuses on overwhelming a single target.</p>
                    </li>
                    <li>
                      <b>dst_host_count</b>
                      <p className="ml-6 mt-1">Represents the number of unique destination hosts contacted by a system. A sudden spike in connections could indicate an attacker distributing attack traffic or using a botnet.</p>
                    </li>
                    <li>
                      <b>dst_host_srv_count</b>
                      <p className="ml-6 mt-1">Tracks how many connections are made to the same service. A sharp increase might suggest a service-specific DDoS attack, such as an HTTP flood targeting a web server.</p>
                    </li>
                    <li>
                      <b>dst_host_same_src_port_rate</b>
                      <p className="ml-6 mt-1">Monitors whether a single port is being exploited repeatedly. DDoS attacks may use fixed port numbers to send floods of packets, so a high value could be an attack sign.</p>
                    </li>
                    <li>
                      <b>dst_host_srv_diff_host_rate</b>
                      <p className="ml-6 mt-1">If attackers are targeting multiple hosts simultaneously, this rate will be elevated. A low value suggests a single-target DDoS attack, while a high value indicates a distributed attack on multiple victims.</p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">Service-Specific Parameters</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>service_ftp_data</b>
                      <p className="ml-6 mt-1">Detects whether the FTP data service is being accessed. Attackers may exploit FTP to transfer DDoS tools or initiate attacks using compromised FTP servers.</p>
                    </li>
                    <li>
                      <b>service_http</b>
                      <p className="ml-6 mt-1">Checks if the attack is targeting an HTTP-based service. HTTP Flood attacks overwhelm web servers with excessive requests, causing downtime.</p>
                    </li>
                    <li>
                      <b>service_telnet</b>
                      <p className="ml-6 mt-1">Indicates whether the Telnet protocol is being used. Attackers may use Telnet for remote access, allowing them to execute DDoS scripts from compromised systems.</p>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  )
}
