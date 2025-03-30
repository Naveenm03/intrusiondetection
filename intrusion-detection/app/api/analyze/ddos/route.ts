import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Forward the request to the Flask backend
    const flaskResponse = await fetch("http://127.0.0.1:5000/DDOS", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(body),
    })

    if (flaskResponse.ok) {
      // Parse the HTML response to extract the prediction result
      const htmlText = await flaskResponse.text()

      // Simple parsing to extract the result
      const isAttack = htmlText.includes("DDOS ATTACK")

      // Store the result
      const result = {
        type: "ddos",
        isAttack,
        timestamp: new Date().toISOString(),
        rawResult: isAttack ? "DDOS ATTACK" : "Normal Attack",
      }

      return NextResponse.json({ success: true, result })
    } else {
      return NextResponse.json({ success: false }, { status: 500 })
    }
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

