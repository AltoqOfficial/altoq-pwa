import { NextRequest, NextResponse } from "next/server";
import { sendWhatsAppMessage } from "@/lib/whatsapp/twilio-adapter";
import { askOracle } from "@/lib/ai/rag-engine";

export async function POST(req: NextRequest) {
  try {
    // Parse form data (Twilio sends application/x-www-form-urlencoded usually, but let's handle JSON too for testing)
    const contentType = req.headers.get("content-type") || "";
    let body: any;

    if (contentType.includes("application/json")) {
      body = await req.json();
    } else {
      const formData = await req.formData();
      body = Object.fromEntries(formData.entries());
    }

    const { Body, From } = body;

    console.log(`📩 Received message from ${From}: ${Body}`);

    // Call The Oracle (RAG Logic)
    const oracleResponse = await askOracle(Body);
    console.log(`🤖 Oracle Response: ${oracleResponse}`);

    await sendWhatsAppMessage(From, oracleResponse);

    return new NextResponse("<Response></Response>", {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  } catch (error) {
    console.error("Error sending reply:", error);
    return NextResponse.json({ error: "Failed to reply" }, { status: 500 });
  }
}
