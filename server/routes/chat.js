const express = require("express");
const router = express.Router();
const { getAuth } = require("@clerk/express");
const { buildSystemPrompt } = require("../company/systemPrompt.js");

// Basic health check endpoint
// router.post("/", (req, res) => {
//   res.json({ ok: true });
// });

const db = require("../db/connections.js");

router.post("/", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    const orgId = getAuth(req).orgId;

    if (!orgId) {
      return res.status(500).json({ error: "Company orgId missing" });
    }

    if (orgId !== company.ownerId) {
      return res.status(403).json({ error: "Unauthorized company" });
    }

    const connection = await db();

    const query = "SELECT * FROM companies WHERE ownerId = ?";

    const company = await connection
      .query(query, [orgId])
      .then(([rows]) => rows[0]);

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

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
