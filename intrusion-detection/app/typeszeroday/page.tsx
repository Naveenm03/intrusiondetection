"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FloatingIcons } from "@/components/3d/floating-icons"
import { Particles } from "@/components/3d/particles"

export default function ZeroDayTypesPage() {
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
                  <CardTitle className="text-2xl font-bold text-yellow-500">Types of Zero-Day Attacks</CardTitle>
                  <Button variant="outline" onClick={() => router.push("/dashboard")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Button>
                </div>
                <CardDescription>Understanding the Invisible Threats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-yellow-500">⚡ Types of Zero-Day Attacks</h2>
                  <p className="mb-4">Zero-day attacks are sophisticated cyber threats that exploit previously unknown vulnerabilities. Here are the main types:</p>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-yellow-500">1️⃣ Zero-Day Vulnerabilities in Software</h2>
                  <p className="mb-4">These attacks target flaws in operating systems, browsers, and enterprise applications.</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li><b>Target:</b> Operating systems, web browsers, applications</li>
                    <li><b>Method:</b> Exploiting unknown software flaws before patches are available</li>
                    <li><b>Example:</b> Remote code execution vulnerabilities in Windows or Chrome</li>
                  </ul>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">🛡️ Mitigation:</h3>
                    <ul className="list-disc pl-4 space-y-2">
                      <li>Regular software updates and patches</li>
                      <li>Endpoint protection and application whitelisting</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-yellow-500">2️⃣ Zero-Day Malware</h2>
                  <p className="mb-4">New malware strains designed to evade traditional security measures.</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li><b>Target:</b> Computers, mobile devices, enterprise networks</li>
                    <li><b>Method:</b> Using unknown malware signatures to bypass antivirus</li>
                    <li><b>Example:</b> Advanced ransomware or spyware variants</li>
                  </ul>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">🛡️ Mitigation:</h3>
                    <ul className="list-disc pl-4 space-y-2">
                      <li>Behavior-based malware detection</li>
                      <li>Sandboxing suspicious files</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-yellow-500">3️⃣ Zero-Day Web Application Exploits</h2>
                  <p className="mb-4">Attacks targeting vulnerabilities in web-based services and platforms.</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li><b>Target:</b> Websites, online services, cloud platforms</li>
                    <li><b>Method:</b> Exploiting unknown web application vulnerabilities</li>
                    <li><b>Example:</b> SQL injection, XSS attacks on e-commerce sites</li>
                  </ul>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">🛡️ Mitigation:</h3>
                    <ul className="list-disc pl-4 space-y-2">
                      <li>Web Application Firewalls (WAFs)</li>
                      <li>Regular security audits</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-yellow-500">4️⃣ Hardware & Firmware Zero-Days</h2>
                  <p className="mb-4">Exploits targeting physical device vulnerabilities.</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li><b>Target:</b> IoT devices, routers, embedded systems</li>
                    <li><b>Method:</b> Exploiting firmware or hardware component flaws</li>
                    <li><b>Example:</b> Router backdoors enabling traffic interception</li>
                  </ul>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">🛡️ Mitigation:</h3>
                    <ul className="list-disc pl-4 space-y-2">
                      <li>Regular firmware updates</li>
                      <li>Disabling unnecessary services</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-yellow-500">5️⃣ Zero-Day Network Attacks</h2>
                  <p className="mb-4">Attacks exploiting unknown network protocol vulnerabilities.</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li><b>Target:</b> Corporate networks, cloud infrastructure</li>
                    <li><b>Method:</b> Exploiting network protocol weaknesses</li>
                    <li><b>Example:</b> VPN authentication bypass exploits</li>
                  </ul>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">🛡️ Mitigation:</h3>
                    <ul className="list-disc pl-4 space-y-2">
                      <li>Zero Trust architecture</li>
                      <li>Continuous network monitoring</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-yellow-500">6️⃣ Mobile Zero-Day Attacks</h2>
                  <p className="mb-4">Exploits targeting mobile device vulnerabilities.</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li><b>Target:</b> Android and iOS devices, mobile apps</li>
                    <li><b>Method:</b> Exploiting mobile OS and app vulnerabilities</li>
                    <li><b>Example:</b> Pegasus spyware targeting iPhones</li>
                  </ul>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">🛡️ Mitigation:</h3>
                    <ul className="list-disc pl-4 space-y-2">
                      <li>Regular OS and app updates</li>
                      <li>Installing apps from trusted sources only</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <p>Zero-day attacks represent some of the most sophisticated cyber threats. Organizations must implement comprehensive security measures including AI-driven detection, continuous monitoring, and strict access controls to protect against these evolving threats.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  )
}
