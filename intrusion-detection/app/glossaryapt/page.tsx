"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FloatingIcons } from "@/components/3d/floating-icons"
import { Particles } from "@/components/3d/particles"

export default function APTGlossaryPage() {
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
                  <CardTitle className="text-2xl font-bold text-red-500">APT Detection Parameters Glossary</CardTitle>
                  <Button variant="outline" onClick={() => router.push("/dashboard")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Button>
                </div>
                <CardDescription>Understanding the parameters used in APT attack detection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-red-500">🔍 Glossary: Understanding APT Detection Parameters</h2>
                  <p className="mb-4">
                    APT attacks are sophisticated reconnaissance techniques where attackers scan and infiltrate networks to gather sensitive information. By analyzing specific network parameters, our system detects these intrusion attempts and helps prevent data breaches.
                  </p>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-red-500">📌 Authentication Parameters</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>logged_in</b> (0 or 1):
                      <p className="ml-6 mt-1">
                        Indicates successful user login status. Large numbers of requests from non-logged-in users may indicate APT infiltration attempts.
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-red-500">📌 Error Rate Parameters</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>rerror_rate</b> (0 to 1):
                      <p className="ml-6 mt-1">Measures failed connection rates. High values suggest probing of multiple services or closed ports.</p>
                    </li>
                    <li>
                      <b>srv_rerror_rate</b> (0 to 1):
                      <p className="ml-6 mt-1">Tracks server-side connection errors. Indicates repeated targeting of specific services.</p>
                    </li>
                    <li>
                      <b>dst_host_rerror_rate</b> (0 to 1):
                      <p className="ml-6 mt-1">Shows failed connection attempts to hosts. Common during scans for closed/protected services.</p>
                    </li>
                    <li>
                      <b>dst_host_srv_rerror_rate</b> (0 to 1):
                      <p className="ml-6 mt-1">Measures service-specific errors at destination hosts. Indicates targeted service probing.</p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-red-500">📌 Connection Pattern Parameters</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>dst_host_srv_count</b> (Numerical):
                      <p className="ml-6 mt-1">Tracks connections to the same service. High counts suggest repeated probing of specific services.</p>
                    </li>
                    <li>
                      <b>dst_host_diff_srv_rate</b> (0 to 1):
                      <p className="ml-6 mt-1">Shows connection spread across services. High values indicate network-wide scanning.</p>
                    </li>
                    <li>
                      <b>dst_host_same_src_port_rate</b> (0 to 1):
                      <p className="ml-6 mt-1">Measures repeated use of source ports. May indicate systematic scanning activity.</p>
                    </li>
                    <li>
                      <b>dst_host_srv_diff_host_rate</b> (0 to 1):
                      <p className="ml-6 mt-1">Tracks connections to multiple hosts. High values suggest horizontal scanning patterns.</p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-red-500">📌 Protocol and Service Parameters</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>Protocol_type_icmp</b> (0 or 1):
                      <p className="ml-6 mt-1">Identifies ICMP protocol usage. High ICMP traffic suggests network mapping attempts.</p>
                    </li>
                    <li>
                      <b>service_eco_i</b> (0 or 1):
                      <p className="ml-6 mt-1">Tracks access to eco_i service. Repeated access may indicate service-specific probing.</p>
                    </li>
                    <li>
                      <b>service_private</b> (0 or 1):
                      <p className="ml-6 mt-1">Monitors private service access. May indicate attempts to discover hidden network resources.</p>
                    </li>
                    <li>
                      <b>flag_SF</b> (0 or 1):
                      <p className="ml-6 mt-1">Indicates connection success status. Multiple failures suggest scanning activity.</p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-red-500">🛡️ How This Helps in Intrusion Detection</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Detects reconnaissance activities before an actual attack occurs</li>
                    <li>Identifies unusual connection patterns that indicate APT presence</li>
                    <li>Prevents further exploitation by blocking or flagging suspicious IPs</li>
                  </ul>
                  <p className="mt-4">
                    APT reconnaissance is often the first step in a sophisticated cyberattack—detecting them early helps prevent serious breaches. Keep your network safe by monitoring these parameters and implementing strict access controls! 🚀
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
