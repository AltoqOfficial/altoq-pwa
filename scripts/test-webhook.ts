// Basic test script - Native Node fetch (v18+)
async function testWebhook() {
  const url = "http://localhost:3000/api/webhook/twilio";

  const payload = {
    Body: "Hola Oráculo, ¿qué opina el Partido Morado sobre la educación?",
    From: "whatsapp:+51999999999",
    To: process.env.TWILIO_PHONE_NUMBER || "whatsapp:+14155238886",
  };

  console.log(`📤 Sending mock message to ${url}...`);
  console.log("📦 Payload:", payload);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log(`📥 Status: ${response.status} ${response.statusText}`);
    const text = await response.text();
    console.log(`📝 Response: ${text}`);

    if (response.ok) {
      console.log("✅ Webhook test passed!");
    } else {
      console.error("❌ Webhook test failed.");
    }
  } catch (error) {
    console.error("❌ Error testing webhook:", error);
    console.log(
      "💡 Hint: Is the Next.js server running on port 3000? (pnpm dev)"
    );
  }
}

testWebhook();
