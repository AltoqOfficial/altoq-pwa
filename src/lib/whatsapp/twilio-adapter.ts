import twilio from "twilio";
const { Twilio } = twilio;

// Initialize Twilio Client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);
const fromNumber = process.env.TWILIO_PHONE_NUMBER || "whatsapp:+14155238886"; // Default sandbox number

export const sendWhatsAppMessage = async (to: string, body: string) => {
  try {
    const MAX_LENGTH = 1500; // Safe limit below 1600
    const chunks = [];

    // Split message into chunks if it exceeds MAX_LENGTH
    let remainingBody = body;
    while (remainingBody.length > 0) {
      if (remainingBody.length <= MAX_LENGTH) {
        chunks.push(remainingBody);
        break;
      }

      // Find a safe break point (newline or space) near the limit
      let breakPoint = remainingBody.lastIndexOf("\n", MAX_LENGTH);
      if (breakPoint === -1)
        breakPoint = remainingBody.lastIndexOf(" ", MAX_LENGTH);

      if (breakPoint === -1) {
        // Hard break if no spaces found
        breakPoint = MAX_LENGTH;
      }

      chunks.push(remainingBody.slice(0, breakPoint));
      // IMPORTANT: Don't just trim, or we lose spacing between chunks if not careful.
      // But usually trimStart() is safe for the next chunk.
      remainingBody = remainingBody.slice(breakPoint).trimStart();
    }

    // Send chunks sequentially
    for (const [index, chunk] of chunks.entries()) {
      const messageBody =
        chunk + (chunks.length > 1 ? ` (${index + 1}/${chunks.length})` : "");

      if (!accountSid || !authToken) {
        console.warn(
          `⚠️ Mock sending to ${to} (No Credentials): ${messageBody.substring(0, 50)}...`
        );
        continue;
      }

      const message = await client.messages.create({
        body: messageBody,
        from: fromNumber,
        to,
      });
      console.log(
        `✅ Message chunk ${index + 1} sent to ${to}: ${message.sid}`
      );
    }

    return { success: true, chunks: chunks.length };
  } catch (error) {
    console.error("❌ Error sending WhatsApp message:", error);
    throw error;
  }
};
