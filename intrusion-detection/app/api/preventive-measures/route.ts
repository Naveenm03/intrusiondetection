import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    // Get the attack type from the URL search params
    const { searchParams } = new URL(request.url)
    const attackType = searchParams.get('type') || 'dos'

    // Define preventive measures for each attack type
    const preventiveMeasures = {
      dos: [
        "Implement rate limiting on your servers and applications",
        "Use DDoS protection services",
        "Configure firewalls to filter suspicious traffic",
        "Implement traffic scrubbing services",
        "Set up monitoring and alerting for unusual traffic patterns",
        "Distribute traffic across multiple servers with load balancing",
        "Use Content Delivery Networks (CDNs) to absorb traffic",
        "Implement IP reputation filtering",
      ],
      apt: [
        "Implement strong authentication mechanisms",
        "Use encrypted connections (SSH, SSL/TLS)",
        "Limit remote access to specific IP addresses",
        "Regularly audit user accounts and permissions",
        "Implement session timeout and connection limits",
        "Use intrusion detection/prevention systems",
        "Regularly scan for vulnerabilities",
        "Implement proper network segmentation",
      ],
      zeroday: [
        "Keep all systems and software up to date with security patches",
        "Implement application whitelisting",
        "Use behavior-based security solutions",
        "Implement the principle of least privilege",
        "Regularly backup important data",
        "Use virtual patching when possible",
        "Implement strong network segmentation",
        "Deploy sandboxing technologies",
      ],
      ddos: [
        "Implement principle of least privilege",
        "Regularly audit system logs and user activities",
        "Use sudo for privileged operations",
        "Implement file system permissions properly",
        "Monitor for suspicious privilege escalation attempts",
        "Use application-level firewalls",
        "Implement network traffic analysis",
        "Deploy anti-DDoS hardware or services",
      ],
    }

    return NextResponse.json({ 
      success: true, 
      measures: preventiveMeasures[attackType as keyof typeof preventiveMeasures] || preventiveMeasures.dos 
    })
  } catch (error) {
    console.error("Error fetching preventive measures:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

