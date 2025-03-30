"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FloatingIcons } from "@/components/3d/floating-icons"
import { Particles } from "@/components/3d/particles"

export default function DDoSTypesPage() {
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
                  <CardTitle className="text-2xl font-bold text-primary">Types of DDoS Attacks</CardTitle>
                  <Button variant="outline" onClick={() => router.push("/dashboard")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Button>
                </div>
                <CardDescription>Understanding the Threat</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">Types of DDoS Attacks: Understanding the Threat</h2>
                  <p>DDoS attacks come in various forms, each exploiting different vulnerabilities in networks, servers, or applications. Below are the three main categories:</p>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">Volume-Based DDoS Attacks</h2>
                  <p className="mb-4">These attacks aim to flood the target with an overwhelming amount of traffic to consume all available bandwidth and make the system unreachable.</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>UDP Flood</b>
                      <p className="ml-6 mt-1">Attackers send massive amounts of UDP (User Datagram Protocol) packets to random ports, forcing the target to respond with "Destination Unreachable" messages, consuming resources.</p>
                    </li>
                    <li>
                      <b>ICMP (Ping) Flood</b>
                      <p className="ml-6 mt-1">Attackers send continuous ICMP Echo Request (ping) packets to overload the system's bandwidth and prevent it from responding to legitimate requests.</p>
                    </li>
                    <li>
                      <b>DNS Amplification</b>
                      <p className="ml-6 mt-1">Attackers spoof the target's IP address and send small DNS requests to open DNS resolvers, which then send back large responses to the victim, amplifying the attack.</p>
                    </li>
                    <li>
                      <b>NTP Amplification</b>
                      <p className="ml-6 mt-1">Similar to DNS amplification, this attack exploits Network Time Protocol (NTP) servers, causing them to flood the target with large responses.</p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">Protocol-Based DDoS Attacks</h2>
                  <p className="mb-4">These attacks target weaknesses in network protocols and exploit vulnerabilities in how systems process network traffic.</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>SYN Flood</b>
                      <p className="ml-6 mt-1">Attackers exploit the TCP handshake process by sending a flood of SYN (synchronize) requests but never completing the connection, leaving the server overwhelmed with half-open connections.</p>
                    </li>
                    <li>
                      <b>ACK Flood</b>
                      <p className="ml-6 mt-1">The attacker sends a massive number of TCP ACK (acknowledgment) packets, forcing the target to process each request and exhaust its resources.</p>
                    </li>
                    <li>
                      <b>Smurf Attack</b>
                      <p className="ml-6 mt-1">Attackers send ICMP requests to multiple devices using a spoofed IP address (the victim's address), causing all devices to flood the target with ICMP replies.</p>
                    </li>
                    <li>
                      <b>Fraggle Attack</b>
                      <p className="ml-6 mt-1">Similar to a Smurf Attack, but instead of ICMP, it floods the victim with UDP Echo requests, consuming bandwidth.</p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">Application-Layer DDoS Attacks</h2>
                  <p className="mb-4">These attacks target specific applications rather than network bandwidth, making them harder to detect because they mimic normal user behavior.</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>HTTP Flood</b>
                      <p className="ml-6 mt-1">Attackers send a large number of HTTP GET/POST requests to a website, overloading the web server and causing it to crash.</p>
                    </li>
                    <li>
                      <b>Slowloris Attack</b>
                      <p className="ml-6 mt-1">The attacker keeps multiple connections open by sending partial HTTP requests and delaying completion, exhausting the target's available connections.</p>
                    </li>
                    <li>
                      <b>DNS Query Flood</b>
                      <p className="ml-6 mt-1">Attackers send massive amounts of DNS requests to a DNS server, overloading its processing capabilities and making it unresponsive.</p>
                    </li>
                    <li>
                      <b>Botnet-Based DDoS Attacks</b>
                      <p className="ml-6 mt-1">A large-scale attack where hackers use infected devices (botnets) worldwide to launch simultaneous DDoS attacks, making them difficult to stop.</p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <p>DDoS attacks continue to evolve, becoming more sophisticated and damaging over time. A strong security framework, real-time traffic monitoring, and advanced mitigation techniques are crucial to protecting against these cyber threats.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  )
}
