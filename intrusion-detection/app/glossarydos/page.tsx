"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FloatingIcons } from "@/components/3d/floating-icons"
import { Particles } from "@/components/3d/particles"

export default function DoSGlossaryPage() {
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
                  <CardTitle className="text-2xl font-bold text-primary">DoS Detection Parameters Glossary</CardTitle>
                  <Button variant="outline" onClick={() => router.push("/dashboard")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Button>
                </div>
                <CardDescription>Understanding the parameters used in DoS attack detection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">Understanding DoS Detection Parameters</h2>
                  <p>To accurately detect Denial of Service (DoS) attacks, our system analyzes specific network parameters that indicate unusual traffic patterns. Below is a breakdown of these parameters:</p>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">Authentication Parameters</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>logged_in</b>
                      <p className="ml-6 mt-1">Indicates successful user login status. Spikes in failed logins may suggest brute-force or authentication-targeted DoS attacks.</p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">Error Rate Parameters</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>rerror_rate</b>
                      <p className="ml-6 mt-1">Measures rejected/failed connection rates. High values suggest flooding attacks or vulnerability scanning.</p>
                    </li>
                    <li>
                      <b>srv_rerror_rate</b>
                      <p className="ml-6 mt-1">Tracks server-side connection errors. Elevated rates indicate potential service overload attacks.</p>
                    </li>
                    <li>
                      <b>dst_host_rerror_rate</b>
                      <p className="ml-6 mt-1">Shows failed connection attempts to specific hosts. High values suggest targeted DoS attacks.</p>
                    </li>
                    <li>
                      <b>dst_host_srv_rerror_rate</b>
                      <p className="ml-6 mt-1">Measures server error rates at destination hosts. Spikes indicate potential fake request bombardment.</p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">Connection Pattern Parameters</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>dst_host_srv_count</b>
                      <p className="ml-6 mt-1">Tracks connections to the same service. Sudden increases suggest service-specific DoS attempts.</p>
                    </li>
                    <li>
                      <b>dst_host_diff_srv_rate</b>
                      <p className="ml-6 mt-1">Shows connection spread across services. High values indicate multi-service attacks.</p>
                    </li>
                    <li>
                      <b>dst_host_same_src_port_rate</b>
                      <p className="ml-6 mt-1">Measures repeated use of source ports. May indicate port-based exploitation attempts.</p>
                    </li>
                    <li>
                      <b>dst_host_srv_diff_host_rate</b>
                      <p className="ml-6 mt-1">Tracks connections to multiple hosts. Elevated values suggest distributed attacks.</p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <h2 className="mb-4 text-xl font-semibold text-primary">Protocol and Service Parameters</h2>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>
                      <b>Protocol_type_icmp</b>
                      <p className="ml-6 mt-1">Identifies ICMP protocol usage. Abnormal ICMP traffic may indicate Ping Floods or Smurf Attacks.</p>
                    </li>
                    <li>
                      <b>service_eco_i</b>
                      <p className="ml-6 mt-1">Monitors eco_i service access. Helps identify targeted service attacks.</p>
                    </li>
                    <li>
                      <b>service_private</b>
                      <p className="ml-6 mt-1">Tracks private service requests. Unusual activity may indicate intrusion attempts.</p>
                    </li>
                    <li>
                      <b>flag_SF</b>
                      <p className="ml-6 mt-1">Monitors connection success status. Multiple failures suggest brute-force or DoS attempts.</p>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-background/50 backdrop-blur-sm p-6">
                  <p>DoS attacks remain one of the biggest cybersecurity threats. Understanding these parameters is crucial for effective detection and prevention.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  )
}
