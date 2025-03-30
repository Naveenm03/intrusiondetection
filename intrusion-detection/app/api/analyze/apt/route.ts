import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("Received APT analysis request:", body)

    // Convert all values to numbers and validate
    const formData = Object.entries(body).reduce((acc, [key, value]) => {
      const numValue = parseFloat(value as string)
      if (isNaN(numValue)) {
        throw new Error(`Invalid numeric value for ${key}: ${value}`)
      }
      acc[key] = numValue
      return acc
    }, {} as Record<string, number>)

    // Forward the request to the Flask backend
    const flaskResponse = await fetch("http://127.0.0.1:5000/APT", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData as any),
    })

    console.log("Flask response status:", flaskResponse.status)
    console.log("Flask response headers:", Object.fromEntries(flaskResponse.headers.entries()))

    // Get the response text for debugging
    const responseText = await flaskResponse.text()
    console.log("Flask response text:", responseText)

    // Parse the response text to extract the prediction
    const predictionMatch = responseText.match(/prediction['"]\s*:\s*(\d+)/)
    const resultMatch = responseText.match(/result['"]\s*:\s*['"]([^'"]+)['"]/)

    if (predictionMatch && resultMatch) {
      const prediction = parseInt(predictionMatch[1])
      const result = resultMatch[1]

      // Store the result
      const analysisResult = {
        type: "apt",
        isAttack: result === "APT ATTACK",  // Set isAttack based on the result text
        timestamp: new Date().toISOString(),
        rawResult: result,
      }

      return NextResponse.json({ success: true, result: analysisResult })
    } else {
      console.error("Could not parse Flask response:", responseText)
      return NextResponse.json({ 
        success: false, 
        error: "Failed to parse analysis result",
        details: responseText
      }, { status: 500 })
    }
  } catch (error) {
    console.error("Analysis error details:", error)
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

