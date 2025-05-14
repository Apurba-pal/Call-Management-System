import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.vapi.dev/analytics", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
      },
    });

    const text = await res.text();
    console.log("Vapi response:", text);

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch analytics", details: text }, { status: 500 });
    }

    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching analytics from Vapi:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
