const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
// const { getCompanyByToken } = require("../testData.js");
const { buildSystemPrompt } = require("../testData.js");

router.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  // const userToken = req.headers.authorization?.replace("Bearer ", "");

  // 1. Find company data via token
  const company = process.env.VIT_TEMP_ORGID;

  // 2. Build dynamic system prompt
  const systemPrompt = buildSystemPrompt(company);

  // 3. Call Grok API
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
  const reply = json.choices[0].message.content;

  // 4. Return reply to frontend
  res.json({ reply });
});

module.exports = router;
