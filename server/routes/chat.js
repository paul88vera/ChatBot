const express = require("express");
const router = express.Router();
// const fetch = require("node-fetch");
const { buildSystemPrompt } = require("../company/systemPrompt.js");
const { company } = require("../company/companyDetails.js"); // served from website embedded code

// Basic health check endpoint
// router.post("/", (req, res) => {
//   res.json({ ok: true });
// });

router.post("/", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    // const token = process.env.VITE_TEMP_ORGID;

    // if (!token) {
    //   return res.status(500).json({ error: "Company token missing" });
    // }

    // if (token !== company.ownerId) {
    //   return res.status(403).json({ error: "Unauthorized company" });
    // }

    const systemPrompt = buildSystemPrompt(company);
    console.log("SYSTEM PROMPT SENT TO GROK:\n", systemPrompt);

    const grokRes = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "grok-3-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
      }),
    });

    const json = await grokRes.json();

    if (!json.choices) {
      console.error(json);
      return res.json({ reply: "Error: No response from AI" });
    }

    const reply = json.choices[0].message.content;

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
