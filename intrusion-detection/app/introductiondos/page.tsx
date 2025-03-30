"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FloatingIcons } from "@/components/3d/floating-icons"
import { Particles } from "@/components/3d/particles"

export default function DoSIntroductionPage() {
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
                  <CardTitle className="text-2xl font-bold text-primary">Introduction to DoS Attacks</CardTitle>
                  <Button variant="outline" onClick={() => router.push("/dashboard")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Button>
                </div>
                <CardDescription>Understanding the basics of Denial of Service attacks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">What is a DoS Attack?</h2>
                  <p className="mb-4">
                    A Denial of Service (DoS) attack is a malicious attempt to disrupt the normal functioning of a network, service, or website by overwhelming it with excessive traffic. The goal is to make the target system slow, unresponsive, or completely unavailable to legitimate users.
                  </p>
                  <p>
                    These attacks exploit network vulnerabilities, protocol weaknesses, and resource limitations to exhaust the system's processing power, bandwidth, or memory. Unlike other cyberattacks, which focus on stealing data, a DoS attack is purely disruptive—its main intent is to take down a target and render it useless.
                  </p>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">How DoS Attacks Work</h2>
                  <p className="mb-4">
                    DoS attacks typically involve sending a high volume of malicious requests to a server, consuming its resources such as CPU power, memory, and bandwidth. Since the server can only handle a limited number of requests at a time, it becomes overwhelmed and stops responding to legitimate users.
                  </p>
                  <h3 className="mb-2 font-semibold text-primary">Common Attack Methods:</h3>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Network Overload – Attackers send massive amounts of data packets to exhaust available bandwidth</li>
                    <li>Resource Starvation – Exploiting vulnerabilities in protocols to drain CPU and memory</li>
                    <li>Service Disruption – Targeting specific applications or services to crash them</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">Impact of DoS Attacks</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Financial Losses – Businesses can lose millions due to downtime</li>
                    <li>Reputation Damage – Customers lose trust if services are unreliable</li>
                    <li>Operational Disruptions – Essential services can be crippled</li>
                    <li>Security Breaches – Attackers may use DoS attacks as a smokescreen for data theft</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">DoS vs DDoS Attacks</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>DoS (Denial of Service) – Launched from a single system targeting one network or server</li>
                    <li>DDoS (Distributed Denial of Service) – Uses multiple compromised systems (botnets) to launch an attack from different locations</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">DoS Attack Mitigation Strategies</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Network Traffic Monitoring & Anomaly Detection using IDS/IPS</li>
                    <li>Rate Limiting & Traffic Filtering to restrict excessive requests</li>
                    <li>Load Balancers & CDNs for traffic distribution</li>
                    <li>Anti-DDoS Solutions from security providers</li>
                    <li>Strong Firewall Rules & Access Control policies</li>
                    <li>Redundancy & Backup Systems</li>
                    <li>IP Blacklisting & Geofencing</li>
                    <li>Multi-factor Authentication (MFA)</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">Stay Protected</h2>
                  <p>
                    DoS attacks remain one of the most common cybersecurity threats affecting industries worldwide. Understanding these attacks and implementing proper mitigation strategies is crucial for maintaining business continuity and protecting critical infrastructure.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  )
}