import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, pass } = body

    console.log("Attempting login with:", { id, pass })

    // Forward the request to the Flask backend
    const flaskResponse = await fetch("http://127.0.0.1:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        id,
        pass,
      }),
    })

    console.log("Flask response status:", flaskResponse.status)
    console.log("Flask response headers:", Object.fromEntries(flaskResponse.headers.entries()))

    // Get the response text for debugging
    const responseText = await flaskResponse.text()
    console.log("Flask response text:", responseText)

    // If the Flask backend returns a redirect to /main, we consider it a successful login
    if (flaskResponse.redirected && flaskResponse.url.includes("/main")) {
      return NextResponse.json({ success: true })
    } else if (responseText.includes("Invalid credentials")) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    } else {
      return NextResponse.json({ success: false, message: "Login failed" }, { status: 401 })
    }
  } catch (error) {
    console.error("Login error details:", error)
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

