const price =[
  {
    id: 0,
    name: "Starter",
    color: "violet",
    range: "$39",
    who: "Small businesses starting with AI support.",
    list : [
      "Embedded chatbot widget",
      "1k - 3k messages/month",
      "Basic customization",
      "Email Support"
    ],
    featured: false,
  },
  {
    id: 1,
    name: "Pro",
    color: "yellow",
    range: "$149",
    who: "Businesses looking to reduce support workload.",
    list : [
      "Everything in Starter",
      "10k - 20k messages/month",
      "3 custom API connections",
      "Custom behavior flows",
      "Remove ChatBox branding",
      "Priority support",
    ],
    featured: true,
  },
  {
    id: 2,
    name: "Business",
    color: "cyan",
    range: "$499",
    who: "Companies needing full branding + deep customization.",
    list : [
      "Full white label + custom domain",
      "Unlimited customization",
      "50k+ messages/month",
      "Multi-agent workflows",
      "Personal onboarding + training call",
    ],
    featured: false,
  },
  {
    id: 3,
    name: "Enterprise",
    color: "lime",
    range: "$1,000 - $5,000+",
    who: "Large organizations with advanced or regulated needs.",
    list: [
      "Dedicated infrastructure",
      "SLA guarantee",
      "Custom features + integrations",
      "Multi-location support",
      "Multi-agent reasoning",
      "Model fine-tuning + private embeddings",
      "Compliance options (HIPAA, SOC2, etc.)",
    ],
    featured: false,
  },
]

export default price;