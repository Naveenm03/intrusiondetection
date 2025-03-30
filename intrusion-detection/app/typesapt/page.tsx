"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FloatingIcons } from "@/components/3d/floating-icons"
import { Particles } from "@/components/3d/particles"

export default function APTTypesPage() {
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
                  <CardTitle className="text-2xl font-bold text-red-500">Types of APT Attacks</CardTitle>
                  <Button variant="outline" onClick={() => router.push("/dashboard")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Button>
                </div>
                <CardDescription>Understanding different types of Advanced Persistent Threats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-red-500">🔥 Types of Advanced Persistent Threats (APT)</h2>
                  <p className="mb-4">APT attacks are highly organized, stealthy, and long-term cyber threats designed to infiltrate systems, steal sensitive data, and remain undetected for months or even years. Unlike traditional cyberattacks, APTs target specific organizations, industries, or even governments.</p>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-red-500">1️⃣ Nation-State APT Attacks 🏛️</h2>
                  <p className="mb-4">Orchestrated by governments to spy on rival nations, disrupt critical infrastructure, or steal confidential intelligence.</p>
                  <h3 className="mb-2 font-semibold">Notable Examples:</h3>
                  <ul className="list-disc pl-4 space-y-2">
                    <li><b>Stuxnet (2010):</b> A cyberweapon targeting Iran's nuclear program via USB drives</li>
                    <li><b>APT29 (Cozy Bear) & APT28 (Fancy Bear):</b> Russian-backed groups behind election interference</li>
                    <li><b>China's APT41:</b> Targeting healthcare, telecom, and tech companies</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-red-500">2️⃣ Corporate Espionage & IP Theft 🏢</h2>
                  <p className="mb-4">Targeting private companies and research institutions for trade secrets and patents.</p>
                  <h3 className="mb-2 font-semibold">Notable Examples:</h3>
                  <ul className="list-disc pl-4 space-y-2">
                    <li><b>Operation Aurora (2010):</b> Targeting Google, Adobe, and 30+ major companies</li>
                    <li><b>Titan Rain (2003):</b> Chinese APT attacking NASA and defense contractors</li>
                    <li><b>Night Dragon:</b> Targeting global oil and gas companies</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-red-500">3️⃣ Financially Motivated APT Attacks 💰</h2>
                  <p className="mb-4">Long-term attacks on financial institutions and cryptocurrency exchanges.</p>
                  <h3 className="mb-2 font-semibold">Notable Examples:</h3>
                  <ul className="list-disc pl-4 space-y-2">
                    <li><b>Carbanak Attack (2014-2020):</b> $1 billion stolen from 100+ banks</li>
                    <li><b>Lazarus Group:</b> North Korean attacks on Sony Pictures and crypto exchanges</li>
                    <li><b>SWIFT Banking Attacks:</b> Exploiting interbank network vulnerabilities</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-red-500">4️⃣ Critical Infrastructure & Industrial Espionage ⚡</h2>
                  <p className="mb-4">Targeting power grids, water supplies, and industrial control systems.</p>
                  <h3 className="mb-2 font-semibold">Notable Examples:</h3>
                  <ul className="list-disc pl-4 space-y-2">
                    <li><b>BlackEnergy (2015):</b> Ukraine power grid shutdown</li>
                    <li><b>Triton Malware (2017):</b> Industrial safety systems attack</li>
                    <li><b>Industroyer:</b> European power station targeting</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-red-500">5️⃣ Insider Threats & Supply Chain Attacks 🏭</h2>
                  <p className="mb-4">Compromising employees, contractors, or third-party vendors.</p>
                  <h3 className="mb-2 font-semibold">Notable Examples:</h3>
                  <ul className="list-disc pl-4 space-y-2">
                    <li><b>SolarWinds Attack (2020):</b> Massive supply chain compromise</li>
                    <li><b>Twitter Insider Attack (2020):</b> Employee-aided account hijacking</li>
                    <li><b>Operation Cloud Hopper:</b> IT service provider infiltration</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-red-500">6️⃣ Cyber Warfare & PsyOps 🛡️</h2>
                  <p className="mb-4">Spreading misinformation and manipulating public opinion.</p>
                  <h3 className="mb-2 font-semibold">Notable Examples:</h3>
                  <ul className="list-disc pl-4 space-y-2">
                    <li><b>Election Interference:</b> Social media manipulation and fake news</li>
                    <li><b>Operation Ghostwriter:</b> European disinformation campaigns</li>
                    <li><b>COVID-19 Misinformation:</b> Pandemic-related propaganda</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-red-500">🚨 Why Are APT Attacks Dangerous?</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>They Are Persistent: Months or years of undetected access</li>
                    <li>They Are Targeted: Customized for specific victims</li>
                    <li>They Cause Irreversible Damage: Severe financial and political impact</li>
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
