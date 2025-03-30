"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FloatingIcons } from "@/components/3d/floating-icons"
import { Particles } from "@/components/3d/particles"

export default function ZeroDayIntroductionPage() {
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
                  <CardTitle className="text-2xl font-bold text-yellow-500">Introduction to Zero-Day Attacks</CardTitle>
                  <Button variant="outline" onClick={() => router.push("/dashboard")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Button>
                </div>
                <CardDescription>Understanding Zero-Day vulnerabilities and attacks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-yellow-500">🔍 What is a Zero-Day Attack?</h2>
                  <p>A Zero-Day Attack is a cyberattack that exploits a software vulnerability before developers have had a chance to patch it. The term "zero-day" refers to the fact that security teams have zero days to fix the flaw before it is actively exploited by attackers. These vulnerabilities are often unknown to the software vendor, making them extremely dangerous as there are no immediate defenses available.</p>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-yellow-500">⚠️ Why Are Zero-Day Attacks So Dangerous?</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li><b>No Available Fix</b> – Since the vulnerability is unknown, there is no official patch at the time of exploitation.</li>
                    <li><b>Highly Targeted</b> – Attackers often use zero-day exploits in espionage, ransomware, and APTs to target governments, corporations, and individuals.</li>
                    <li><b>Difficult to Detect</b> – Traditional security solutions may not recognize these attacks because they don't match known threat signatures.</li>
                    <li><b>Exploited by Hackers & Nation-States</b> – Cybercriminals, hacktivists, and state-sponsored groups actively seek and exploit zero-day vulnerabilities.</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-yellow-500">⚡ How Do Zero-Day Attacks Work?</h2>
                  <ol className="list-decimal pl-4 space-y-2">
                    <li>A hacker discovers a previously unknown vulnerability in a software, operating system, or hardware.</li>
                    <li>They create a zero-day exploit, which is a tool or method used to take advantage of the flaw.</li>
                    <li>The exploit is deployed through malicious emails, infected websites, or compromised software updates.</li>
                    <li>Attackers use the exploit to steal data, install malware, or take control of systems.</li>
                    <li>The attack continues until the vulnerability is discovered and patched by developers.</li>
                  </ol>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-yellow-500">🛡️ Mitigation Strategies for Zero-Day Attacks</h2>
                  <p className="mb-4">Since zero-day exploits do not have immediate fixes, organizations must rely on proactive security measures:</p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>✔ Behavior-Based Intrusion Detection – Use AI-driven security tools that identify unusual activity</li>
                    <li>✔ Network Segmentation – Limit attack spread by separating sensitive systems</li>
                    <li>✔ Regular Patching & Updates – Keep all software and hardware up to date</li>
                    <li>✔ Zero Trust Security Model – Require strict authentication and limit user access</li>
                    <li>✔ Threat Intelligence & Monitoring – Stay informed about emerging threats</li>
                    <li>✔ Use Virtual Patching – Deploy WAFs and endpoint security solutions</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <p>Zero-day attacks are among the most dangerous and unpredictable cybersecurity threats. Because no immediate fixes exist, proactive security, constant monitoring, and adaptive defense strategies are crucial to minimizing the risk. Organizations must stay vigilant, use advanced security tools, and implement layered defenses to protect against these stealthy, high-impact cyberattacks.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  )
}
