"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { AttackHeatmap } from "@/components/attack-heatmap"
import { AttackLog } from "@/components/attack-log"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { Shield, AlertTriangle, Zap, Wifi, MapPin } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import { Bar } from "react-chartjs-2"
import { Particles } from "@/components/3d/particles"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface AttackStats {
  total: number
  byType: {
    dos: number
    ddos: number
    apt: number
    zeroday: number
  }
  byCountry: Record<string, number>
  bySeverity: {
    low: number
    medium: number
    high: number
    critical: number
  }
  timeline: {
    labels: string[]
    data: {
      low: number[]
      medium: number[]
      high: number[]
      critical: number[]
    }
  }
}

interface Attack {
  attackType: 'dos' | 'ddos' | 'apt' | 'zeroday'
  country: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  timestamp: string
}

const severityColors = {
  low: 'rgba(52, 211, 153, 0.8)',    // Green
  medium: 'rgba(251, 191, 36, 0.8)',  // Yellow
  high: 'rgba(251, 146, 60, 0.8)',    // Orange
  critical: 'rgba(239, 68, 68, 0.8)'  // Red
}

export default function HeatmapPage() {
  const [attackType, setAttackType] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState("24h")
  const [severity, setSeverity] = useState<string | null>(null)
  const [stats, setStats] = useState<AttackStats | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch attack statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        
        // Build query parameters
        const params = new URLSearchParams()
        if (timeRange) params.append('timeRange', timeRange)
        if (attackType) params.append('attackType', attackType)
        if (severity) params.append('severity', severity)
        
        const response = await fetch(`/api/attack-data?${params.toString()}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch attack data')
        }
        
        const result = await response.json()
        const attacks = result.data as Attack[]
        
        // Calculate statistics
        const newStats: AttackStats = {
          total: attacks.length,
          byType: {
            dos: 0,
            ddos: 0,
            apt: 0,
            zeroday: 0
          },
          byCountry: {},
          bySeverity: {
            low: 0,
            medium: 0,
            high: 0,
            critical: 0
          },
          timeline: {
            labels: [],
            data: {
              low: [],
              medium: [],
              high: [],
              critical: []
            }
          }
        }
        
        // Process each attack
        const timelineBuckets = new Map<string, { low: number, medium: number, high: number, critical: number }>()
        
        attacks.forEach((attack) => {
          // Count by type
          newStats.byType[attack.attackType]++
          
          // Count by country
          if (!newStats.byCountry[attack.country]) {
            newStats.byCountry[attack.country] = 0
          }
          newStats.byCountry[attack.country]++
          
          // Count by severity
          newStats.bySeverity[attack.severity]++
          
          // Group by hour and severity for timeline
          const date = new Date(attack.timestamp)
          const hour = date.getHours().toString().padStart(2, '0') + ':00'
          
          if (!timelineBuckets.has(hour)) {
            timelineBuckets.set(hour, { low: 0, medium: 0, high: 0, critical: 0 })
          }
          timelineBuckets.get(hour)![attack.severity]++
        })
        
        // Convert timeline buckets to sorted arrays
        const sortedHours = Array.from(timelineBuckets.keys()).sort()
        newStats.timeline.labels = sortedHours
        
        sortedHours.forEach(hour => {
          const bucket = timelineBuckets.get(hour)!
          newStats.timeline.data.low.push(bucket.low)
          newStats.timeline.data.medium.push(bucket.medium)
          newStats.timeline.data.high.push(bucket.high)
          newStats.timeline.data.critical.push(bucket.critical)
        })
        
        setStats(newStats)
      } catch (error) {
        console.error('Error fetching attack statistics:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchStats()
    
    const intervalId = setInterval(fetchStats, 30000)
    return () => clearInterval(intervalId)
  }, [timeRange, attackType, severity])

  // Calculate percentages for attack types
  const getTypePercentage = (type: 'dos' | 'ddos' | 'apt' | 'zeroday') => {
    if (!stats || stats.total === 0) return 0
    return Math.round((stats.byType[type] / stats.total) * 100)
  }

  // Get top 5 countries by attack count
  const getTopCountries = () => {
    if (!stats) return []
    
    return Object.entries(stats.byCountry)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([country, count]) => ({
        country,
        count,
        percentage: Math.round((count / stats.total) * 100)
      }))
  }

  const chartData = {
    labels: stats?.timeline.labels || [],
    datasets: [
      {
        label: 'Critical',
        data: stats?.timeline.data.critical || [],
        backgroundColor: severityColors.critical,
        stack: 'stack0',
        barThickness: 12
      },
      {
        label: 'High',
        data: stats?.timeline.data.high || [],
        backgroundColor: severityColors.high,
        stack: 'stack0',
        barThickness: 12
      },
      {
        label: 'Medium',
        data: stats?.timeline.data.medium || [],
        backgroundColor: severityColors.medium,
        stack: 'stack0',
        barThickness: 12
      },
      {
        label: 'Low',
        data: stats?.timeline.data.low || [],
        backgroundColor: severityColors.low,
        stack: 'stack0',
        barThickness: 12
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          font: {
            size: 10
          }
        }
      },
      title: {
        display: false
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 10
          }
        }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            size: 10
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  }

  // ... Rest of the component remains the same ...
  return (
    <>
      <Navbar />
      <div className="container relative mx-auto px-4 py-8">
        <div className="absolute inset-0 -z-10">
          <Particles />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <MapPin className="h-6 w-6 text-primary" />
                <CardTitle>Global Attack Heatmap</CardTitle>
              </div>
              <CardDescription>
                Real-time visualization of attack origins and affected regions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Attack Type</label>
                  <Select 
                    onValueChange={(value) => setAttackType(value === "all" ? null : value)}
                    defaultValue="all"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Attack Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Attack Types</SelectItem>
                      <SelectItem value="dos">DoS</SelectItem>
                      <SelectItem value="ddos">DDoS</SelectItem>
                      <SelectItem value="apt">APT</SelectItem>
                      <SelectItem value="zeroday">Zero-Day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Time Range</label>
                  <Select 
                    onValueChange={setTimeRange}
                    defaultValue="24h"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Last 24 Hours" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">Last Hour</SelectItem>
                      <SelectItem value="6h">Last 6 Hours</SelectItem>
                      <SelectItem value="12h">Last 12 Hours</SelectItem>
                      <SelectItem value="24h">Last 24 Hours</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Severity</label>
                  <Select 
                    onValueChange={(value) => setSeverity(value === "all" ? null : value)}
                    defaultValue="all"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Severity Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severity Levels</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mb-6 h-[200px]">
                {loading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <Bar data={chartData} options={chartOptions} />
                )}
              </div>
              
              <AttackHeatmap 
                attackType={attackType}
                timeRange={timeRange}
                severity={severity}
              />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Attack Type Distribution</CardTitle>
                <CardDescription>Breakdown of attacks by type</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 p-4 rounded-lg bg-success/10">
                      <Shield className="h-8 w-8 text-success" />
                      <div>
                        <div className="text-sm font-medium">DoS Attacks</div>
                        <div className="text-2xl font-bold">{getTypePercentage('dos')}%</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-4 rounded-lg bg-destructive/10">
                      <AlertTriangle className="h-8 w-8 text-destructive" />
                      <div>
                        <div className="text-sm font-medium">APT Attacks</div>
                        <div className="text-2xl font-bold">{getTypePercentage('apt')}%</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-4 rounded-lg bg-warning/10">
                      <Zap className="h-8 w-8 text-warning" />
                      <div>
                        <div className="text-sm font-medium">Zero-Day Attacks</div>
                        <div className="text-2xl font-bold">{getTypePercentage('zeroday')}%</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-4 rounded-lg bg-primary/10">
                      <Wifi className="h-8 w-8 text-primary" />
                      <div>
                        <div className="text-sm font-medium">DDoS Attacks</div>
                        <div className="text-2xl font-bold">{getTypePercentage('ddos')}%</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Attack Sources</CardTitle>
                <CardDescription>Countries with highest attack origins</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getTopCountries().map((item) => (
                      <div key={item.country} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="font-medium">{item.country}</div>
                        </div>
                        <div className="text-sm">{item.percentage}%</div>
                        <div className="w-full max-w-[60%] bg-secondary rounded-full h-2.5">
                          <div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <AttackLog timeRange={timeRange} />
        </motion.div>
      </div>
    </>
  )
}
