"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence } from "framer-motion"

interface AttackData {
  id: string
  sourceIP: string
  destinationIP: string
  attackType: 'dos' | 'ddos' | 'apt' | 'zeroday'
  timestamp: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  latitude: number
  longitude: number
  country: string
  city: string
  count: number
}

interface AttackLogProps {
  timeRange: string
}

export function AttackLog({ timeRange }: AttackLogProps) {
  const [attacks, setAttacks] = useState<AttackData[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Build query parameters
        const params = new URLSearchParams()
        if (timeRange) params.append('timeRange', timeRange)
        
        const response = await fetch(`/api/attack-data?${params.toString()}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch attack data')
        }
        
        const result = await response.json()
        
        // Sort by timestamp (newest first)
        const sortedAttacks = result.data.sort((a: AttackData, b: AttackData) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
        
        // Take only the most recent 10 attacks
        setAttacks(sortedAttacks.slice(0, 10))
      } catch (error) {
        console.error('Error fetching attack data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
    
    // Set up interval to refresh data every 15 seconds
    const intervalId = setInterval(fetchData, 15000)
    
    return () => clearInterval(intervalId)
  }, [timeRange])
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'destructive'
      case 'high':
        return 'warning'
      case 'medium':
        return 'secondary'
      case 'low':
        return 'default'
      default:
        return 'default'
    }
  }
  
  const getAttackTypeLabel = (type: string) => {
    switch (type) {
      case 'dos':
        return 'DoS'
      case 'ddos':
        return 'DDoS'
      case 'apt':
        return 'APT'
      case 'zeroday':
        return 'Zero-Day'
      default:
        return type.toUpperCase()
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Attack Log</CardTitle>
        <CardDescription>Latest detected intrusion attempts</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {attacks.map((attack) => (
                <motion.div
                  key={attack.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col md:flex-row md:items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <Badge variant={getSeverityColor(attack.severity) as any}>
                      {attack.severity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{getAttackTypeLabel(attack.attackType)}</Badge>
                    <div className="text-sm">
                      <span className="font-medium">{attack.sourceIP}</span>
                      <span className="text-muted-foreground"> → {attack.destinationIP}</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2 md:mt-0">
                    <div className="text-sm text-muted-foreground">
                      {attack.city}, {attack.country}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(attack.timestamp).toLocaleString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
