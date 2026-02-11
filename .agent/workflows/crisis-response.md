---
description: Emergency Crisis Protocol. Use this IMMEDIATELY if the site is down, under attack, or generating harmful content.
---

# Crisis Response Protocol

**Participants:** ALL HANDS (CIPO, Lead Eng, CISO, Growth).
**Trigger:** Server 500s, Hack attempt, or "Racist/False" AI output.

## Scenarios

### A. The "Hallucination" Crisis (AI says something bad)

1. **Kill Switch (AI Engineer):** Disable the Chat Feature Flag immediately.
2. **Apology (Head of Growth):** Draft a honest statement. "Our AI made a mistake. We are fixing it."
3. **Audit (CIPO):** Find the bad vector/chunk. Delete it.
4. **Restoration:** Only re-enable after 50 test queries pass.

### B. The "Cyber Effect" (DDoS or Hack)

1. **Shields Up (CISO):** Enable "Under Attack" mode in Vercel/Cloudflare.
2. **Lockdown (Lead Eng):** Rotate all API Keys.
3. **Comms (Head of Growth):** Inform users via WhatsApp/Twitter.

## Post-Mortem

- Write a report analysis: Why did it happen? How do we prevent it?
