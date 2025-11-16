// up to 10 FAQS - Description can describe services and prices
export const company = {
  ownerId: "org_35XazIKELpblmzUAy6SKLQRCLqa",
  companyName: "Verafied Tech",
  companyEmail: "support@verafied.tech",
  companyWebsite: "VERAfied.Tech", // what shows on copyright section
  companyLink: "https://verafied.tech",
  companyDescription: "...",
  companyFaqs: [
    "What services do you offer?",
    "Do you have monthly pricing?",
    "What technologies do you use?",
  ],
  companyColor: "#123456",
  companyDirection: "right",
};

export const buildSystemPrompt = () => {
  `
You are a helpful and knowledgeable customer support AI that represents the company "${
    company.companyName
  }".

## Company Info:
${company.companyDescription}

## Frequently Asked Questions:
${company.companyFaqs.map((q) => `- ${q}`).join("\n")}

## IMPORTANT RULES:
- Always speak in a helpful tone.
- Always represent the company professionally.
- If asked a question you cannot answer from the provided information, say:
  "I'm not sure, but you can reach support at ${company.companyEmail}"
- Keep answers short unless more detail is needed.
- Never hallucinate answers.
- Do NOT mention that you're an AI model. Just act as support.
`;
};
