"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Wifi } from "lucide-react"

export function DdosAttackForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    urgent: "",
    hot: "",
    root_shell: "",
    num_file_creations: "",
    num_shells: "",
    srv_diff_host_rate: "",
    dst_host_count: "",
    dst_host_srv_count: "",
    dst_host_same_src_port_rate: "",
    dst_host_srv_diff_host_rate: "",
    service_ftp_data: "",
    service_http: "",
    service_telnet: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/analyze/ddos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        // Store the result in localStorage to access it on the results page
        localStorage.setItem("attackResult", JSON.stringify(data.result))
        router.push("/results")
      } else {
        toast({
          title: "Error",
          description: "Failed to analyze data",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during analysis",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-gradient-to-br from-primary/20 to-primary/5 text-foreground card-hover">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Wifi className="h-6 w-6 text-primary" />
              <CardTitle>DDoS Attack Detection</CardTitle>
            </div>
            <CardDescription>
              Distributed Denial of Service attacks come from multiple sources to overwhelm a target.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="mb-2 font-semibold">Preventive Measures:</h3>
            <ul className="space-y-1">
              {[
                "Regular Patching and Updates",
                "Network Segmentation",
                "Privileged Access Management",
                "Least Privilege Principle",
                "Intrusion Detection and Prevention Systems",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <span className="mr-2 text-primary">•</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>DDoS Attack Detection Form</CardTitle>
            <CardDescription>Enter network parameters to detect DDoS attacks</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="urgent">Urgent</Label>
                  <Input
                    id="urgent"
                    name="urgent"
                    value={formData.urgent}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hot">Hot</Label>
                  <Input
                    id="hot"
                    name="hot"
                    value={formData.hot}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="root_shell">Root Shell</Label>
                  <Input
                    id="root_shell"
                    name="root_shell"
                    value={formData.root_shell}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="num_file_creations">File Creations</Label>
                  <Input
                    id="num_file_creations"
                    name="num_file_creations"
                    value={formData.num_file_creations}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="num_shells">Shells</Label>
                  <Input
                    id="num_shells"
                    name="num_shells"
                    value={formData.num_shells}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="srv_diff_host_rate">Diff Host Rate</Label>
                  <Input
                    id="srv_diff_host_rate"
                    name="srv_diff_host_rate"
                    value={formData.srv_diff_host_rate}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dst_host_count">Host Count</Label>
                  <Input
                    id="dst_host_count"
                    name="dst_host_count"
                    value={formData.dst_host_count}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dst_host_srv_count">Host Service Count</Label>
                  <Input
                    id="dst_host_srv_count"
                    name="dst_host_srv_count"
                    value={formData.dst_host_srv_count}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dst_host_same_src_port_rate">Same Source Port Rate</Label>
                  <Input
                    id="dst_host_same_src_port_rate"
                    name="dst_host_same_src_port_rate"
                    value={formData.dst_host_same_src_port_rate}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dst_host_srv_diff_host_rate">Diff Host Rate</Label>
                  <Input
                    id="dst_host_srv_diff_host_rate"
                    name="dst_host_srv_diff_host_rate"
                    value={formData.dst_host_srv_diff_host_rate}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service_ftp_data">Service FTP Data</Label>
                  <Input
                    id="service_ftp_data"
                    name="service_ftp_data"
                    value={formData.service_ftp_data}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service_http">Service HTTP</Label>
                  <Input
                    id="service_http"
                    name="service_http"
                    value={formData.service_http}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service_telnet">Service Telnet</Label>
                  <Input
                    id="service_telnet"
                    name="service_telnet"
                    value={formData.service_telnet}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full form-submit-btn bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Analyzing..." : "Analyze"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

