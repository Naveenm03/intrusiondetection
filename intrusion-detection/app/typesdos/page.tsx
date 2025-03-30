"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FloatingIcons } from "@/components/3d/floating-icons"
import { Particles } from "@/components/3d/particles"

export default function DoSTypesPage() {
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
                  <CardTitle className="text-2xl font-bold text-primary">Types of DoS Attacks</CardTitle>
                  <Button variant="outline" onClick={() => router.push("/dashboard")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Button>
                </div>
                <CardDescription>Understanding different types of Denial of Service attacks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">Types of DoS Attacks: How Hackers Overwhelm Systems</h2>
                  <p>There are several types of DoS attacks, each using different techniques to bring down a target. These methods can be broadly classified into six categories:</p>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">Volume-Based Attacks</h2>
                  <p className="mb-4">These attacks focus on consuming bandwidth, making it impossible for legitimate users to access the system.</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>UDP Flood</b>
                      <p className="ml-6 mt-1">Attackers send a flood of User Datagram Protocol (UDP) packets to random ports, causing the server to waste resources checking for nonexistent applications.</p>
                    </li>
                    <li>
                      <b>ICMP Flood (Ping Flood)</b>
                      <p className="ml-6 mt-1">Attackers overwhelm the target with continuous ICMP Echo Request (ping) packets, preventing it from responding to real requests.</p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">Protocol Attacks</h2>
                  <p className="mb-4">These attacks consume server resources by taking advantage of protocol vulnerabilities.</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>SYN Flood</b>
                      <p className="ml-6 mt-1">Attackers exploit the TCP handshake process by sending repeated SYN requests but never completing them, leaving the server waiting and eventually unable to handle new connections.</p>
                    </li>
                    <li>
                      <b>Ping of Death</b>
                      <p className="ml-6 mt-1">The attacker sends oversized packets that crash the system by exceeding its memory capacity.</p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">Application Layer Attacks</h2>
                  <p className="mb-4">These attacks target specific applications, making them slow or crash.</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>HTTP Flood</b>
                      <p className="ml-6 mt-1">Attackers send massive numbers of HTTP requests to overwhelm a web server.</p>
                    </li>
                    <li>
                      <b>Slowloris</b>
                      <p className="ml-6 mt-1">Attackers keep multiple connections open by sending partial HTTP requests, preventing the server from handling new connections.</p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">Distributed Denial of Service (DDoS) Attacks</h2>
                  <p className="mb-4">Unlike normal DoS attacks, DDoS attacks use multiple machines (botnets) to launch attacks from various locations, making them harder to block.</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>Amplification Attacks</b>
                      <p className="ml-6 mt-1">Attackers exploit open DNS, NTP, or other services to send small requests that generate large responses, amplifying attack power.</p>
                    </li>
                    <li>
                      <b>Botnet-Based Attacks</b>
                      <p className="ml-6 mt-1">Attackers use hijacked devices to coordinate and send attack traffic from multiple sources.</p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">Resource Exhaustion</h2>
                  <p>Hackers keep sending requests until the server's processing power or memory is fully consumed, causing it to crash.</p>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">Reflective Attacks</h2>
                  <p className="mb-4">Attackers manipulate legitimate servers to send large responses to the victim's system, overwhelming it.</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>DNS Reflection</b>
                      <p className="ml-6 mt-1">Attackers send fake DNS requests that trigger large responses directed at the victim.</p>
                    </li>
                    <li>
                      <b>NTP Reflection</b>
                      <p className="ml-6 mt-1">Similar to DNS reflection but using Network Time Protocol (NTP) servers to amplify the attack.</p>
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
