"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FloatingIcons } from "@/components/3d/floating-icons"

interface AttackResult {
  type: string
  isAttack: boolean
  timestamp: string
  rawResult?: string
}

export default function ResultsPage() {
  const router = useRouter()
  const [result, setResult] = useState<AttackResult | null>(null)

  useEffect(() => {
    const storedResult = localStorage.getItem("attackResult")
    if (storedResult) {
      setResult(JSON.parse(storedResult))
    }
  }, [])

  if (!result) {
    return (
      <>
        <Navbar />
        <div className="flex h-[80vh] items-center justify-center">
          <Card className="w-full max-w-md card-hover">
            <CardHeader>
              <CardTitle>No Results Found</CardTitle>
              <CardDescription>You haven't performed any attack detection yet.</CardDescription>
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

  const attackTypeMap = {
    dos: "Denial of Service",
    apt: "Advanced Persistent Threat", 
    zeroday: "Zero Day",
    ddos: "Distributed Denial of Service",
  }

  const attackType = attackTypeMap[result.type as keyof typeof attackTypeMap] || result.type

  const getStatusColor = () => {
    if (result.isAttack) {
      return "bg-destructive"
    } else {
      return "bg-success"
    }
  }

  const handlePreventiveMeasures = () => {
    // Store attack type in localStorage before navigation
    localStorage.setItem("selectedAttackType", result.type)
    router.push("/preventive-measures")
  }

  return (
    <>
      <Navbar />
      <div className="relative container mx-auto max-w-4xl px-4 py-8">
        <FloatingIcons />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="overflow-hidden card-hover">
            <div className={`h-2 w-full ${getStatusColor()}`} />
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">Detection Result</CardTitle>
                <div
                  className={`flex items-center rounded-full px-3 py-1 text-sm ${
                    result.isAttack ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"
                  }`}
                >
                  {result.isAttack ? (
                    <>
                      <AlertTriangle className="mr-1 h-4 w-4" />
                      Attack Detected
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Normal Traffic
                    </>
                  )}
                </div>
              </div>
              <CardDescription>Analysis completed on {new Date(result.timestamp).toLocaleString()}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 text-xl font-semibold">Analysis Summary</h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Attack Type</p>
                      <p className="font-medium">{attackType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className={`font-medium ${result.isAttack ? "text-destructive" : "text-success"}`}>
                        {result.rawResult || (result.isAttack ? "Malicious" : "Benign")}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="font-medium">
                      {result.isAttack
                        ? `A ${attackType} attack was detected in the network traffic. This type of attack attempts to disrupt normal traffic to a targeted server, service, or network.`
                        : "No malicious activity was detected in the analyzed network traffic."}
                    </p>
                  </div>
                </div>
              </div>

              {result.isAttack && (
                <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6">
                  <h3 className="mb-4 text-xl font-semibold text-destructive">Recommended Actions</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    View detailed preventive measures specific to {attackType} attacks by clicking the button below.
                  </p>
                </div>
              )}

              <div className="flex space-x-4">
                <Button onClick={() => router.push("/dashboard")} variant="outline" className="flex-1">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
                {result.isAttack && (
                  <Button
                    onClick={handlePreventiveMeasures}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    View Preventive Measures
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  )
}
