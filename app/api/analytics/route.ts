// app/api/analytics/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch("https://api.vapi.ai/analytics", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        queries: [
          {
            table: "call",
            name: "Call Summary",
            operations: [
              {
                operation: "sum",
                column: "duration"
              }
            ]
          }
        ]
      }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
