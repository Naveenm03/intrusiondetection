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
import { Shield } from "lucide-react"

export function DosAttackForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    logged_in: "",
    rerror_rate: "",
    srv_rerror_rate: "",
    dst_host_srv_count: "",
    dst_host_diff_srv_rate: "",
    dst_host_same_src_port_rate: "",
    dst_host_srv_diff_host_rate: "",
    dst_host_rerror_rate: "",
    dst_host_srv_rerror_rate: "",
    Protocol_type_icmp: "",
    service_eco_i: "",
    service_private: "",
    flag_SF: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/analyze/dos", {
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
        <Card className="bg-gradient-to-br from-success/20 to-success/5 text-foreground card-hover">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-success" />
              <CardTitle>DoS Attack Detection</CardTitle>
            </div>
            <CardDescription>
              Denial of Service attacks attempt to make a machine or network resource unavailable to its intended users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="mb-2 font-semibold">Preventive Measures:</h3>
            <ul className="space-y-1">
              {[
                "Network Segmentation",
                "Load balancing",
                "IP blocking",
                "Rate limiting",
                "Content Delivery Networks (CDNs)",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <span className="mr-2 text-success">•</span>
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
            <CardTitle>DoS Attack Detection Form</CardTitle>
            <CardDescription>Enter network parameters to detect DoS attacks</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logged_in">Logged In</Label>
                  <Input
                    id="logged_in"
                    name="logged_in"
                    value={formData.logged_in}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rerror_rate">Error Rate</Label>
                  <Input
                    id="rerror_rate"
                    name="rerror_rate"
                    value={formData.rerror_rate}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="srv_rerror_rate">Server Error Rate</Label>
                  <Input
                    id="srv_rerror_rate"
                    name="srv_rerror_rate"
                    value={formData.srv_rerror_rate}
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
                  <Label htmlFor="dst_host_diff_srv_rate">Host Diff Service Rate</Label>
                  <Input
                    id="dst_host_diff_srv_rate"
                    name="dst_host_diff_srv_rate"
                    value={formData.dst_host_diff_srv_rate}
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
                  <Label htmlFor="dst_host_rerror_rate">Host Error Rate</Label>
                  <Input
                    id="dst_host_rerror_rate"
                    name="dst_host_rerror_rate"
                    value={formData.dst_host_rerror_rate}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dst_host_srv_rerror_rate">Host Srv Error Rate</Label>
                  <Input
                    id="dst_host_srv_rerror_rate"
                    name="dst_host_srv_rerror_rate"
                    value={formData.dst_host_srv_rerror_rate}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="Protocol_type_icmp">Protocol Type ICMP</Label>
                  <Input
                    id="Protocol_type_icmp"
                    name="Protocol_type_icmp"
                    value={formData.Protocol_type_icmp}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service_eco_i">Service ECO</Label>
                  <Input
                    id="service_eco_i"
                    name="service_eco_i"
                    value={formData.service_eco_i}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service_private">Service Private</Label>
                  <Input
                    id="service_private"
                    name="service_private"
                    value={formData.service_private}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="flag_SF">Flag SF</Label>
                  <Input
                    id="flag_SF"
                    name="flag_SF"
                    value={formData.flag_SF}
                    onChange={handleChange}
                    placeholder="Enter value"
                    className="form-control"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full form-submit-btn bg-success hover:bg-success/90"
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

