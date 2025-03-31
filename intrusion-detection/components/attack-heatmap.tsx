"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from 'lucide-react'
import type { Map as LeafletMap, LayerGroup, Layer } from "leaflet"
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface AttackData {
  id: string
  sourceIP: string
  destinationIP: string
  attackType: "dos" | "ddos" | "apt" | "zeroday"
  timestamp: string
  severity: "low" | "medium" | "high" | "critical"
  latitude: number
  longitude: number
  country: string
  city: string
  count: number
}

interface AttackHeatmapProps {
  attackType: string | null
  timeRange: string
  severity: string | null
}

export function AttackHeatmap({ attackType, timeRange, severity }: AttackHeatmapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<LeafletMap | null>(null)
  const heatLayerRef = useRef<Layer | null>(null)
  const markersLayerRef = useRef<LayerGroup | null>(null)
  const [loading, setLoading] = useState(true)
  const [attackData, setAttackData] = useState<AttackData[]>([])
  const [selectedAttack, setSelectedAttack] = useState<AttackData | null>(null)
  const [timelineData, setTimelineData] = useState<{ labels: string[], data: number[] }>({ labels: [], data: [] })
  const { toast } = useToast()

  // Load Leaflet dynamically on client side
  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        console.log('Loading Leaflet...')
        const L = (await import('leaflet')).default
        console.log('Leaflet loaded')
        
        // Import leaflet.heat after Leaflet is loaded
        await import('leaflet.heat')
        console.log('Leaflet.heat loaded')
        
        // Fix for Leaflet icon issues in webpack
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        })
        
        // Store L in window for later use
        ;(window as any).L = L
        console.log('Leaflet initialized')
      } catch (error) {
        console.error('Error loading Leaflet:', error)
        toast({
          title: 'Error',
          description: 'Failed to load map library',
          variant: 'destructive',
        })
      }
    }
    
    loadLeaflet()
  }, [toast])

  // Fetch attack data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        console.log('Fetching attack data...')

        // Build query parameters
        const params = new URLSearchParams()
        if (attackType) params.append("attackType", attackType)
        if (timeRange) params.append("timeRange", timeRange)
        if (severity) params.append("severity", severity)

        const response = await fetch(`/api/attack-data?${params.toString()}`)
        console.log('API response:', response.status)

        if (!response.ok) {
          throw new Error("Failed to fetch attack data")
        }

        const result = await response.json()
        console.log('Attack data:', result.data.length, 'attacks')
        console.log('Sample attack data:', result.data[0])
        setAttackData(result.data)

        // Process timeline data
        const timelineBuckets = new Map<string, number>()
        result.data.forEach((attack: AttackData) => {
          const hour = new Date(attack.timestamp).toISOString().slice(0, 13)
          timelineBuckets.set(hour, (timelineBuckets.get(hour) || 0) + 1)
        })

        // Convert timeline buckets to sorted arrays
        const sortedBuckets = Array.from(timelineBuckets.entries()).sort()
        setTimelineData({
          labels: sortedBuckets.map(([hour]) => 
            new Date(hour).toLocaleTimeString([], {hour: '2-digit', hour12: false})
          ),
          data: sortedBuckets.map(([_, count]) => count)
        })
      } catch (error) {
        console.error("Error fetching attack data:", error)
        toast({
          title: "Error",
          description: "Failed to fetch attack data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const intervalId = setInterval(fetchData, 30000)
    return () => clearInterval(intervalId)
  }, [attackType, timeRange, severity, toast])

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || !(window as any).L) {
      console.log('Map container or Leaflet not ready')
      return
    }
    
    console.log('Initializing map...')
    const L = (window as any).L

    // Only initialize the map once
    if (!leafletMapRef.current) {
      // Create map with explicit height and options
      leafletMapRef.current = L.map(mapRef.current, {
        center: [20, 0],
        zoom: 2,
        zoomControl: true,
        attributionControl: true,
        minZoom: 1,
        maxZoom: 18,
        maxBounds: [[-90, -180], [90, 180]]
      })
      console.log('Map created')

      // Add tile layer (map background)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        noWrap: true
      }).addTo(leafletMapRef.current)
      console.log('Tile layer added')
      
      // Create a layer group for markers
      markersLayerRef.current = L.layerGroup().addTo(leafletMapRef.current)
      console.log('Marker layer group created')

      // Force a map resize after a short delay
      setTimeout(() => {
        leafletMapRef.current?.invalidateSize()
      }, 100)
    }

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [])

  // Update heatmap when data changes
  useEffect(() => {
    if (!leafletMapRef.current || !attackData.length || !(window as any).L) {
      console.log('Cannot update heatmap:', {
        hasMap: !!leafletMapRef.current,
        hasData: attackData.length > 0,
        hasLeaflet: !!(window as any).L
      })
      return
    }
    
    console.log('Updating heatmap with', attackData.length, 'attacks')
    const L = (window as any).L

    // Remove existing heat layer if it exists
    if (heatLayerRef.current) {
      leafletMapRef.current.removeLayer(heatLayerRef.current)
    }
    
    // Clear existing markers
    if (markersLayerRef.current) {
      markersLayerRef.current.clearLayers()
    }

    // Prepare heat map data
    const heatData = attackData.map((attack) => {
      // Weight based on severity
      let weight = 0.5
      switch (attack.severity) {
        case "low":
          weight = 0.3
          break
        case "medium":
          weight = 0.5
          break
        case "high":
          weight = 0.7
          break
        case "critical":
          weight = 1.0
          break
      }

      // Multiply by count to represent multiple attacks from same location
      weight = weight * (attack.count / 10)

      return [attack.latitude, attack.longitude, weight]
    })

    console.log('Heat data prepared:', heatData.length, 'points')
    console.log('Sample heat point:', heatData[0])

    try {
      // Create and add heat layer with adjusted parameters
      // @ts-ignore - TS doesn't know about L.heatLayer
      heatLayerRef.current = L.heatLayer(heatData, {
        radius: 35, // Increased radius
        blur: 20,   // Increased blur
        maxZoom: 10,
        minOpacity: 0.3,
        maxOpacity: 0.8,
        gradient: {
          0.2: "blue",
          0.4: "lime",
          0.6: "yellow",
          0.8: "orange",
          1.0: "red",
        },
      }).addTo(leafletMapRef.current)
      console.log('Heat layer added successfully')

      // Force a map resize after adding the heat layer
      setTimeout(() => {
        leafletMapRef.current?.invalidateSize()
      }, 100)

      // Fit bounds to show all points
      const bounds = L.latLngBounds(heatData.map(point => [point[0], point[1]]))
      leafletMapRef.current.fitBounds(bounds, { padding: [50, 50] })
    } catch (error) {
      console.error('Error adding heat layer:', error)
    }
    
    // Add markers for each attack
    attackData.forEach(attack => {
      try {
        // Create a marker for each attack
        const marker = L.marker([attack.latitude, attack.longitude])
          .addTo(markersLayerRef.current)
          .bindPopup(`
            <div>
              <strong>Attack Type:</strong> ${attack.attackType.toUpperCase()}<br>
              <strong>Source IP:</strong> ${attack.sourceIP}<br>
              <strong>Location:</strong> ${attack.city}, ${attack.country}<br>
              <strong>Severity:</strong> ${attack.severity}<br>
              <strong>Time:</strong> ${new Date(attack.timestamp).toLocaleString()}<br>
            </div>
          `)
        
        // Add click event to marker
        marker.on('click', () => {
          setSelectedAttack(attack)
        })
      } catch (error) {
        console.error('Error adding marker:', error)
      }
    })
  }, [attackData])

  const chartData = {
    labels: timelineData.labels,
    datasets: [
      {
        label: 'Attacks per Hour',
        data: timelineData.data,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.4
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Attack Frequency Timeline'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="w-full h-[500px] rounded-lg overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Total Attacks: {attackData.length}</span>
          {attackData.some(a => a.severity === 'critical') && (
            <Badge variant="destructive" className="flex items-center space-x-1">
              <AlertTriangle className="h-3 w-3" />
              <span>Critical Attacks Detected</span>
            </Badge>
          )}
        </div>
        
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs">Low</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-lime-500"></div>
            <span className="text-xs">Medium</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs">High</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs">Critical</span>
          </div>
        </div>
      </div>

      
      
     
      
      {selectedAttack && (
        <Card className="mt-4">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Attack Type</h3>
                <p className="font-semibold">{selectedAttack.attackType.toUpperCase()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Source IP</h3>
                <p className="font-semibold">{selectedAttack.sourceIP}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                <p className="font-semibold">{selectedAttack.city}, {selectedAttack.country}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Severity</h3>
                <p className={`font-semibold ${
                  selectedAttack.severity === 'critical' ? 'text-destructive' : 
                  selectedAttack.severity === 'high' ? 'text-yellow-500' : 
                  selectedAttack.severity === 'medium' ? 'text-lime-500' : 
                  'text-blue-500'
                }`}>
                  {selectedAttack.severity.toUpperCase()}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Timestamp</h3>
                <p className="font-semibold">{new Date(selectedAttack.timestamp).toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Destination IP</h3>
                <p className="font-semibold">{selectedAttack.destinationIP}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Attack Count</h3>
                <p className="font-semibold">{selectedAttack.count}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
