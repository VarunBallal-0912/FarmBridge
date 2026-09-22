// Mock AI data for Kisan AI chat
// Replace with real Gemini/Vertex AI integration later

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export const SUGGESTED_QUESTIONS: string[] = [
  'What crop should I grow this season?',
  'Why are my tomato leaves turning yellow?',
  "What is today's onion price?",
  'What government schemes am I eligible for?',
  'How to prevent pest attack on wheat?',
  'Best time to sell onion this year?',
];

export const MOCK_RESPONSES: Record<string, string> = {
  default: 'I am Kisan AI, your farming assistant. I can help you with crop prices, disease identification, government schemes, and general farming advice. What would you like to know?',
  season: `Based on current weather patterns and market trends in Maharashtra:

🌱 **Rabi Season (Oct–Nov sowing):**
• Wheat — MSP ₹2,275/qtl, stable demand
• Chickpea (Chana) — good prices expected
• Onion — high demand, prices expected to remain strong

📊 **Market Outlook:**
Onion and tomato prices are currently strong. Consider planting onion if your soil and water conditions support it.

Would you like more details about any specific crop?`,
  tomato_leaves: `Yellow leaves on tomato plants can be caused by:

🔍 **Most Likely Causes:**
1. **Nitrogen deficiency** — Older leaves yellowing first
   → Apply urea (46-0-0) @ 100 kg/hectare
2. **Early Blight** — Yellow with brown spots
   → Spray Mancozeb 75 WP @ 2g/litre
3. **Root rot / overwatering** — Wilting + yellowing
   → Improve drainage, reduce irrigation

💊 **Immediate Action:**
• Check soil moisture — avoid waterlogging
• Spray Copper Oxychloride as preventive

Want me to help identify the disease from a photo?`,
  onion_price: `📊 **Today's Onion Prices (22 Sep 2026):**

| Mandi | Price |
|-------|-------|
| Pune | ₹2,400/qtl |
| Nashik | ₹2,550/qtl |
| Mumbai APMC | ₹2,700/qtl |
| Ahmednagar | ₹2,320/qtl |

📈 Prices are **up 8.4%** from last week.

💡 **Tip:** Mumbai APMC is offering the highest price. Transport cost to Mumbai is approximately ₹150–200/qtl.

Go to the **Prices** tab for live updates and comparison.`,
  schemes: `Here are the top government schemes for farmers:

🏛️ **Top 3 Schemes for You:**

1. **PM-Kisan** — ₹6,000/year direct transfer
   → Check eligibility in Schemes section

2. **PMFBY Crop Insurance** — Protect your harvest
   → Premium as low as 2% for Kharif crops

3. **Kisan Credit Card** — Low interest loans @ 4%
   → For crop, equipment & personal needs

Go to the **Schemes** section for full details and how to apply.`,
};

// Initial greeting messages
export const INITIAL_MESSAGES: Omit<AIMessage, 'id'>[] = [
  {
    role: 'assistant',
    text: 'Namaskar! 🙏 I am Kisan AI, your smart farming assistant.\n\nI can help you with:\n• Crop prices & mandi comparison\n• Crop disease identification\n• Government schemes & subsidies\n• Farming advice & best practices\n\nWhat would you like to know today?',
    timestamp: new Date(),
  },
];
