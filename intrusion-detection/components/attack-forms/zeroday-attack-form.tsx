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
import { Zap } from "lucide-react"

export function ZerodayAttackForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    src_bytes: "",
    dst_bytes: "",
    hot: "",
    num_failed_logins: "",
    is_guest_login: "",
    dst_host_srv_count: "",
    dst_host_same_src_port_rate: "",
    dst_host_srv_diff_host_rate: "",
    service_ftp: "",
    service_ftp_data: "",
    service_http: "",
    service_imap4: "",
    flag_RSTO: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/analyze/zeroday", {
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
        <Card className="bg-gradient-to-br from-warning/20 to-warning/5 text-foreground card-hover">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-warning" />
              <CardTitle>Zero Day Attack Detection</CardTitle>
            </div>
            <CardDescription>
              Zero-day attacks exploit previously unknown vulnerabilities in software or hardware.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="mb-2 font-semibold">Preventive Measures:</h3>
            <ul className="space-y-1">
              {[
                "Robust Authentication",
                "Patch Management",
                "Access Controls",
                "Network Security",
                "User Training and Awareness",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <span className="mr-2 text-warning">•</span>
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
            <CardTitle>Zero Day Attack Detection Form</CardTitle>
            <CardDescription>Enter network parameters to detect Zero Day attacks</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="src_bytes">Source Bytes</Label>
                  <Input
                    id="src_bytes"
                    name="src_bytes"
                    value={formData.src_bytes}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dst_bytes">Destination Bytes</Label>
                  <Input
                    id="dst_bytes"
                    name="dst_bytes"
                    value={formData.dst_bytes}
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
                  <Label htmlFor="num_failed_logins">Failed Logins</Label>
                  <Input
                    id="num_failed_logins"
                    name="num_failed_logins"
                    value={formData.num_failed_logins}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="is_guest_login">Guest Login</Label>
                  <Input
                    id="is_guest_login"
                    name="is_guest_login"
                    value={formData.is_guest_login}
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
                  <Label htmlFor="service_ftp">Service FTP</Label>
                  <Input
                    id="service_ftp"
                    name="service_ftp"
                    value={formData.service_ftp}
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
                  <Label htmlFor="service_imap4">Service IMAP4</Label>
                  <Input
                    id="service_imap4"
                    name="service_imap4"
                    value={formData.service_imap4}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="flag_RSTO">Flag RSTO</Label>
                  <Input
                    id="flag_RSTO"
                    name="flag_RSTO"
                    value={formData.flag_RSTO}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full form-submit-btn bg-warning hover:bg-warning/90"
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

