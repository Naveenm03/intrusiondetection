"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, AlertTriangle, Zap, Wifi } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FloatingIcons } from "@/components/3d/floating-icons"

interface AttackResult {
  type: string
  isAttack: boolean
  timestamp: string
  rawResult?: string
}

export default function PreventiveMeasuresPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dos")
  const [result, setResult] = useState<AttackResult | null>(null)

  useEffect(() => {
    const storedResult = localStorage.getItem("attackResult")
    if (storedResult) {
      const parsedResult = JSON.parse(storedResult)
      setResult(parsedResult)
      setActiveTab(parsedResult.type || "dos")
    }

    // Also fetch preventive measures from the Flask backend
    fetch("/api/preventive-measures").catch((error) => console.error("Error fetching preventive measures:", error))
  }, [])

  if (!result) {
    return (
      <>
        <Navbar />
        <div className="flex h-[80vh] items-center justify-center">
          <Card className="w-full max-w-md card-hover">
            <CardHeader>
              <CardTitle>No Attack Type Selected</CardTitle>
              <CardDescription>Please analyze traffic for attacks first.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push("/dashboard")} className="w-full bg-primary hover:bg-primary/90">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    )
  }

  const preventiveMeasures = {
    dos: [
      "Implement rate limiting on your servers and applications",
      "Use DDoS protection services", 
      "Configure firewalls to filter suspicious traffic",
      "Implement traffic scrubbing services",
      "Set up monitoring and alerting for unusual traffic patterns",
      "Distribute traffic across multiple servers with load balancing",
      "Use Content Delivery Networks (CDNs) to absorb traffic",
      "Implement IP reputation filtering",
    ],
    apt: [
      "Implement strong authentication mechanisms",
      "Use encrypted connections (SSH, SSL/TLS)",
      "Limit remote access to specific IP addresses", 
      "Regularly audit user accounts and permissions",
      "Implement session timeout and connection limits",
      "Use intrusion detection/prevention systems",
      "Regularly scan for vulnerabilities",
      "Implement proper network segmentation",
    ],
    zeroday: [
      "Keep all systems and software up to date with security patches",
      "Implement application whitelisting",
      "Use behavior-based security solutions",
      "Implement the principle of least privilege",
      "Regularly backup important data",
      "Use virtual patching when possible",
      "Implement strong network segmentation",
      "Deploy sandboxing technologies",
    ],
    ddos: [
      "Implement principle of least privilege",
      "Regularly audit system logs and user activities",
      "Use sudo for privileged operations",
      "Implement file system permissions properly", 
      "Monitor for suspicious privilege escalation attempts",
      "Use application-level firewalls",
      "Implement network traffic analysis",
      "Deploy anti-DDoS hardware or services",
    ],
  }

  const icons = {
    dos: <Shield className="h-6 w-6 text-success" />,
    apt: <AlertTriangle className="h-6 w-6 text-destructive" />,
    zeroday: <Zap className="h-6 w-6 text-warning" />,
    ddos: <Wifi className="h-6 w-6 text-primary" />,
  }

  const titles = {
    dos: "Denial of Service (DoS) Attack Prevention",
    apt: "Advanced Persistent Threat (APT) Prevention", 
    zeroday: "Zero Day Attack Prevention",
    ddos: "Distributed Denial of Service (DDoS) Prevention",
  }

  const descriptions = {
    dos: "Protect your systems from attacks that aim to make a machine or network resource unavailable.",
    apt: "Defend against prolonged and targeted cyberattacks where an attacker establishes an undetected presence.",
    zeroday: "Safeguard against attacks that exploit previously unknown vulnerabilities in software or hardware.",
    ddos: "Prevent attacks from multiple sources that aim to overwhelm a target with traffic.",
  }

  const getTabColor = (type: string): string => {
    switch (type) {
      case "dos":
        return "data-[state=active]:bg-success data-[state=active]:text-success-foreground"
      case "apt":
        return "data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground"
      case "zeroday":
        return "data-[state=active]:bg-warning data-[state=active]:text-warning-foreground"
      case "ddos":
        return "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
      default:
        return ""
    }
  }

  return (
    <>
      <Navbar />
      <div className="relative container mx-auto max-w-4xl px-4 py-8">
        <FloatingIcons />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="card-hover">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle>Preventive Measures</CardTitle>
              </div>
              <CardDescription>Learn how to protect your systems from various types of attacks</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="dos" className={getTabColor("dos")}>DoS</TabsTrigger>
                  <TabsTrigger value="apt" className={getTabColor("apt")}>APT</TabsTrigger>
                  <TabsTrigger value="zeroday" className={getTabColor("zeroday")}>Zero Day</TabsTrigger>
                  <TabsTrigger value="ddos" className={getTabColor("ddos")}>DDoS</TabsTrigger>
                </TabsList>

                {Object.keys(preventiveMeasures).map((type) => (
                  <TabsContent key={type} value={type} className="space-y-4">
                    <div className="flex items-center space-x-2">
                      {icons[type as keyof typeof icons]}
                      <h2 className="text-xl font-bold">{titles[type as keyof typeof titles]}</h2>
                    </div>

                    <p className="text-muted-foreground">{descriptions[type as keyof typeof descriptions]}</p>

                    <div className="rounded-lg bg-secondary p-6">
                      <h3 className="mb-4 text-lg font-semibold">Recommended Measures:</h3>
                      <ul className="space-y-2">
                        {preventiveMeasures[type as keyof typeof preventiveMeasures].map((measure, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <span className={`mr-2 ${type === 'dos' ? 'text-success' : type === 'apt' ? 'text-destructive' : type === 'zeroday' ? 'text-warning' : 'text-primary'}`}>•</span>
                            <span>{measure}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              <Button onClick={() => router.push("/dashboard")} variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  )
}
