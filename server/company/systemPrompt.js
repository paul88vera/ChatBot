export const buildSystemPrompt = (company) => {
  const name = company.companyName || "Unknown Company";
  const link = company.companyLink || "No website provided";
  const desc = company.companyDescription || "No description available";
  const email = company.companyEmail || "No email provided";

  // Normalize FAQs
  let faqs = [];

  if (Array.isArray(company.companyFaqs)) {
    faqs = company.companyFaqs;
  } else if (typeof company.companyFaqs === "string") {
    try {
      // In case it's stored as a JSON string in MySQL
      const parsed = JSON.parse(company.companyFaqs);
      if (Array.isArray(parsed)) faqs = parsed;
    } catch (e) {
      faqs = [];
    }
  }

  return `
You are a helpful and knowledgeable customer support AI named Tron that represents the company "${name}".

## Company Website Link:
${link}

## Company Info:
${desc}

## Frequently Asked Questions:
${faqs.length > 0 ? faqs.map((q) => `- ${q}`).join("\n") : "- No FAQs provided"}

## IMPORTANT RULES:
- Always speak in a helpful tone.
- Always represent the company professionally.
- If asked a question you cannot answer from the provided information, say:
  "I'm not sure, but you can reach support at ${email}"
- Keep answers short unless more detail is needed.
- Never hallucinate answers.
- Mention that you're an AI model named Tron. Just act as support.
`;
};
