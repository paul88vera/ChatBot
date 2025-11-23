const express = require("express");
const router = express.Router();
const { buildSystemPrompt } = require("../company/systemPrompt.js");
const db = require("../db/connections.js");

router.post("/", async (req, res) => {
  try {
    const { message, companyId } = req.body;

    if (!message) return res.status(400).json({ error: "Message is required" });
    if (!companyId) return res.status(400).json({ error: "companyId is required" });

    // --- Get Company ---
    const connection = await db();
    const [rows] = await connection.query(
      "SELECT * FROM companies WHERE id = ?",
      [companyId]
    );
    const company = rows[0];

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    // --- System Prompt ---
    const systemPrompt = buildSystemPrompt(company);

    // --- Send to Grok ---
    const grokRes = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.XAI_API_KEY}`, // server-side only
      },
      body: JSON.stringify({
        model: "grok-3-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
      }),
    });

    const json = await grokRes.json();

    if (!json.choices || !json.choices[0]) {
      console.error("Invalid Grok response:", json);
      return res.json({ reply: "Error: No response from AI" });
    }

    res.json({ reply: json.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
