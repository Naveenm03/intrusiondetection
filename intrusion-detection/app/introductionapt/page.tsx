"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FloatingIcons } from "@/components/3d/floating-icons"
import { Particles } from "@/components/3d/particles"

export default function APTIntroductionPage() {
  const router = useRouter()

  return (
    <>
      <Navbar />
      <div className="container relative min-h-screen">
        <div className="absolute inset-0 -z-10">
          <Particles/>
          <FloatingIcons />
        </div>
        <div className="mx-auto max-w-4xl px-4 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-none shadow-xl bg-gradient-to-br from-background to-background/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-red-500">Introduction to APT Attacks</CardTitle>
                  <Button variant="outline" onClick={() => router.push("/dashboard")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Button>
                </div>
                <CardDescription>Understanding Advanced Persistent Threat attacks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-red-500">🔍 What is an APT Attack?</h2>
                  <p className="mb-4">
                    An Advanced Persistent Threat (APT) is a sophisticated and prolonged cyberattack where attackers gain unauthorized network access and remain undetected for extended periods. Unlike traditional cyberattacks focused on immediate damage, APT attacks are stealthy, methodical, and persistent, typically carried out by nation-state actors, cybercriminal groups, or highly skilled hackers.
                  </p>
                  <p>
                    APT attackers aim to steal sensitive data, conduct espionage, disrupt critical infrastructure, or manipulate digital systems while avoiding detection. High-value targets include government agencies, multinational corporations, defense organizations, and financial institutions.
                  </p>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-red-500">📌 How APT Attacks Work</h2>
                  <h3 className="mb-2 font-semibold">APT attacks unfold in multiple phases:</h3>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Initial Intrusion – Access gained through phishing, zero-day exploits, or social engineering</li>
                    <li>Establishing Backdoor Access – Malware and Trojans create hidden entry points</li>
                    <li>Lateral Movement – Deeper network infiltration and privilege escalation</li>
                    <li>Data Exfiltration – Stealthy extraction of sensitive information</li>
                    <li>Maintaining Persistence – Implementation of rootkits and RATs for long-term access</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-red-500">💥 Impact of APT Attacks</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Massive Financial Losses – Through theft of intellectual property and trade secrets</li>
                    <li>Severe Reputation Damage – Loss of customer trust after data breaches</li>
                    <li>National Security Risks – Espionage and sabotage of critical systems</li>
                    <li>Long-Term Network Compromise – Persistent hidden access for future attacks</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-red-500">🔄 APT vs Traditional Cyberattacks</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Traditional Attacks – Quick, opportunistic, immediate damage (ransomware, DoS)</li>
                    <li>APT Attacks – Long-term, stealthy, focused on covert surveillance and data theft</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-red-500">🛡️ Essential APT Defense Strategies</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Advanced Network Monitoring & Anomaly Detection</li>
                    <li>Zero Trust Architecture & Endpoint Security</li>
                    <li>Multi-Factor Authentication & Access Control</li>
                    <li>Threat Intelligence & Active Threat Hunting</li>
                    <li>Data Encryption & Secure Backups</li>
                    <li>Comprehensive Incident Response Planning</li>
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