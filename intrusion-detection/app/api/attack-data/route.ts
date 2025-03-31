import { NextResponse } from "next/server"

// IPinfo API token
const IPINFO_TOKEN = "c431451e544381"

// Interface for attack data
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

// Interface for IPinfo response
interface IPinfoResponse {
  ip: string
  hostname?: string
  city?: string
  region?: string
  country?: string
  loc?: string
  org?: string
  postal?: string
  timezone?: string
}

// In-memory cache for attack data
let cachedData: AttackData[] | null = null
let lastFetch = 0

// In-memory cache for IP geolocation data to reduce API calls
const ipGeoCache: Record<string, { lat: number, lng: number, country: string, city: string }> = {}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const attackType = searchParams.get('attackType')
    const timeRange = searchParams.get('timeRange') || '24h'
    const severity = searchParams.get('severity')
    
    // Check if we need to fetch new data (every 30 seconds)
    const now = Date.now()
    if (!cachedData || now - lastFetch > 30000) {
      cachedData = await fetchAttackData()
      lastFetch = now
    }
    
    // Filter the data based on query parameters
    let filteredData = [...(cachedData || [])]
    
    if (attackType) {
      filteredData = filteredData.filter(attack => attack.attackType === attackType)
    }
    
    if (severity) {
      filteredData = filteredData.filter(attack => attack.severity === severity)
    }
    
    // Filter by time range
    const timeRangeMs = getTimeRangeMs(timeRange)
    if (timeRangeMs) {
      const cutoffTime = new Date(now - timeRangeMs)
      filteredData = filteredData.filter(attack => new Date(attack.timestamp) > cutoffTime)
    }
    
    return NextResponse.json({ success: true, data: filteredData })
  } catch (error) {
    console.error("Error fetching attack data:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// Function to get IP geolocation data from IPinfo
async function getIPGeolocation(ip: string): Promise<{ lat: number, lng: number, country: string, city: string }> {
  // Check cache first
  if (ipGeoCache[ip]) {
    return ipGeoCache[ip]
  }
  
  try {
    const response = await fetch(`https://ipinfo.io/${ip}?token=${IPINFO_TOKEN}`)
    
    if (!response.ok) {
      throw new Error(`IPinfo API error: ${response.status}`)
    }
    
    const data: IPinfoResponse = await response.json()
    
    // Extract latitude and longitude from the loc field (format: "lat,lng")
    let lat = 0
    let lng = 0
    
    if (data.loc) {
      const [latitude, longitude] = data.loc.split(',')
      lat = parseFloat(latitude)
      lng = parseFloat(longitude)
    }
    
    // Create result object
    const result = {
      lat,
      lng,
      country: data.country || 'Unknown',
      city: data.city || 'Unknown'
    }
    
    // Cache the result
    ipGeoCache[ip] = result
    
    return result
  } catch (error) {
    console.error(`Error fetching geolocation for IP ${ip}:`, error)
    // Return default values on error
    return { lat: 0, lng: 0, country: 'Unknown', city: 'Unknown' }
  }
}

// Function to fetch real attack data from logs or generate realistic data
async function fetchAttackData(): Promise<AttackData[]> {
  try {
    const sourceIPs = [
      '45.227.255.206',  // Brazil
      '185.220.101.33',  // Germany
      '89.248.165.64',   // Netherlands
      '134.209.24.42',   // US
      '103.102.153.86',  // India
      '91.240.118.140',  // Russia
      '222.186.30.112',  // China
      '5.188.206.18',    // Russia
      '185.156.73.54',   // Romania
      '193.56.29.123',   // Ukraine
      '51.89.138.55',    // UK
      '116.110.41.54',   // Vietnam
      '218.92.0.118',    // China
      '94.102.49.190',   // Netherlands
      '185.180.143.49',  // Russia
    ]
    
    // Generate destination IPs (your protected network)
    const destinationIPs = [
      '192.168.1.100',
      '192.168.1.101',
      '192.168.1.102',
      '10.0.0.15',
      '10.0.0.20',
    ]
    
    const attackTypes: ('dos' | 'ddos' | 'apt' | 'zeroday')[] = ['dos', 'ddos', 'apt', 'zeroday']
    const severityLevels: ('low' | 'medium' | 'high' | 'critical')[] = ['low', 'medium', 'high', 'critical']
    
    // Generate attack data with real geolocation
    const attacks: AttackData[] = []
    
    // Process each source IP
    for (const ip of sourceIPs) {
      // Get real geolocation data for this IP
      const geoData = await getIPGeolocation(ip)
      
      // Generate 1-3 attacks from this IP
      const attackCount = Math.floor(Math.random() * 3) + 1
      
      for (let i = 0; i < attackCount; i++) {
        const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)]
        const severity = severityLevels[Math.floor(Math.random() * severityLevels.length)]
        const destIP = destinationIPs[Math.floor(Math.random() * destinationIPs.length)]
        
        // Generate a timestamp within the last 24 hours
        const timestamp = new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)).toISOString()
        
        // Add slight variation to coordinates for multiple attacks from same location
        const latVariation = (Math.random() - 0.5) * 0.5
        const lngVariation = (Math.random() - 0.5) * 0.5
        
        attacks.push({
          id: `attack-${attacks.length + 1}`,
          sourceIP: ip,
          destinationIP: destIP,
          attackType,
          timestamp,
          severity,
          latitude: geoData.lat + latVariation,
          longitude: geoData.lng + lngVariation,
          country: geoData.country,
          city: geoData.city,
          count: Math.floor(Math.random() * 100) + 1
        })
      }
    }
    
    return attacks
  } catch (error) {
    console.error("Error generating attack data:", error)
    return []
  }
}

function getTimeRangeMs(timeRange: string): number | null {
  switch (timeRange) {
    case '1h':
      return 60 * 60 * 1000
    case '6h':
      return 6 * 60 * 60 * 1000
    case '12h':
      return 12 * 60 * 60 * 1000
    case '24h':
      return 24 * 60 * 60 * 1000
    case '7d':
      return 7 * 24 * 60 * 60 * 1000
    case '30d':
      return 30 * 24 * 60 * 60 * 1000
    default:
      return null
  }
}
