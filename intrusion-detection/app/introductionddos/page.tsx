"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FloatingIcons } from "@/components/3d/floating-icons"
import { Particles } from "@/components/3d/particles"

export default function DDoSIntroductionPage() {
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
                  <CardTitle className="text-2xl font-bold text-primary">Introduction to DDoS Attacks</CardTitle>
                  <Button variant="outline" onClick={() => router.push("/dashboard")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Button>
                </div>
                <CardDescription>Understanding Distributed Denial of Service Attacks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">What is a DDoS Attack?</h2>
                  <p className="mb-4">
                    A Distributed Denial of Service (DDoS) attack is a large-scale cyberattack that aims to disrupt the availability of a network, server, or online service by overwhelming it with a flood of malicious traffic from multiple sources. Unlike a Denial of Service (DoS) attack, which originates from a single system, DDoS attacks are launched from thousands or even millions of compromised devices (botnets), making them harder to detect and mitigate.
                  </p>
                  <p>
                    DDoS attacks exploit bandwidth limitations, server capacity, and application-layer vulnerabilities to exhaust system resources, leading to slow performance, downtime, and service outages. These attacks are commonly used to target businesses, financial institutions, gaming servers, and government entities, causing severe financial and reputational damage.
                  </p>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">DDoS Attack Mitigation Strategies</h2>
                  <p className="mb-4">Because DDoS attacks can be highly disruptive, organizations must implement robust defense strategies to detect, absorb, and neutralize attacks before they cause significant damage.</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>Traffic Monitoring & Anomaly Detection</b>
                      <p className="ml-6 mt-1">Use Intrusion Detection Systems (IDS), Intrusion Prevention Systems (IPS), and AI-driven monitoring tools to identify unusual traffic spikes and attack patterns.</p>
                    </li>
                    <li>
                      <b>Rate Limiting & Request Filtering</b>
                      <p className="ml-6 mt-1">Implement rate limiting to restrict the number of requests from a single IP address and filter out suspicious traffic using Web Application Firewalls (WAFs).</p>
                    </li>
                    <li>
                      <b>Load Balancers & CDNs</b>
                      <p className="ml-6 mt-1">Use Content Delivery Networks (CDNs) and load balancers to distribute incoming traffic across multiple servers, preventing a single point of failure.</p>
                    </li>
                    <li>
                      <b>DDoS Protection Services</b>
                      <p className="ml-6 mt-1">Leverage DDoS mitigation services from security providers like Cloudflare, Akamai, AWS Shield, and Imperva that detect and neutralize large-scale attacks in real-time.</p>
                    </li>
                    <li>
                      <b>Blacklisting & Geofencing</b>
                      <p className="ml-6 mt-1">Block malicious IP addresses, botnets, and traffic from high-risk geographic locations to prevent repeated attacks.</p>
                    </li>
                    <li>
                      <b>Network Redundancy</b>
                      <p className="ml-6 mt-1">Maintain backup servers and redundant network configurations to keep services running even if one server is compromised.</p>
                    </li>
                    <li>
                      <b>Strong Access Controls</b>
                      <p className="ml-6 mt-1">Use multi-factor authentication (MFA) and secure access policies to prevent attackers from exploiting weak authentication mechanisms.</p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">The Importance of DDoS Detection</h2>
                  <p className="mb-4">DDoS attacks remain one of the most persistent cyber threats, capable of causing massive financial losses and service disruptions. A multi-layered security approach is essential to detect, prevent, and minimize the impact of these attacks.</p>
                  <p className="mb-4">DDoS attacks disrupt services, overload networks, and can cause significant financial losses. By monitoring these key parameters, intrusion detection systems can identify abnormal patterns early, helping organizations mitigate and block attacks before they escalate.</p>
                  <p>Stay vigilant by monitoring traffic, applying rate-limiting, and using real-time DDoS mitigation solutions to protect your network infrastructure.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  )
}
