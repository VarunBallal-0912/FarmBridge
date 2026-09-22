# Farmbridge 🌾

> **Empowering Indian Farmers with Real-Time Mandi Intelligence, AI Advisory & Direct Market Access.**  
> *"Simple enough to use instantly, polished enough to look like a real startup product."*

---

## 📌 Overview

**Farmbridge** is a modern, farmer-centric mobile application designed to bridge the gap between agricultural producers and profitable markets. Built with modern cross-platform mobile technologies, Farmbridge equips farmers with actionable market intelligence, instant AI agronomic advisory, crop disease diagnosis, and access to government financial schemes—all packaged in a warm, trustworthy, and distraction-free interface.

---

## ✨ Key Features

### 1. 📈 Live Mandi Market Prices
* Real-time commodity prices across major Indian APMC mandis (e.g., Pune, Nashik, Mumbai APMC, Ahmednagar).
* Categorized browsing: **Vegetables**, **Grains**, **Spices**, **Oilseeds**, and **Fruits**.
* Daily price tracking with percentage movement indicators (Trending Up / Down / Stable).
* Detailed price records including minimum, maximum, and average modal prices per quintal.

### 2. ⚖️ Multi-Mandi Price Comparison
* Side-by-side comparison across regional mandis for any crop.
* Instant computation of **Best Price**, **Lowest Price**, and **Net Price Difference**.
* Realized gain projections highlighting maximum revenue potential per quintal.

### 3. 🤖 Kisan AI — Smart Agricultural Advisory
* AI agronomic companion trained to assist with:
  * Crop selection and sowing advice based on seasonal patterns.
  * Best time to sell produce based on mandi price trajectories.
  * Pest and disease prevention guidance.
  * Government subsidy and financial eligibility queries.
* Pre-configured, high-frequency prompt chips with instant conversational responses.

### 4. 🛡️ Crop Disease Detection & Diagnosis
* Image upload and camera capture simulation for plant disease identification.
* Instant visual diagnosis card detailing:
  * Diagnostic confidence percentage.
  * Observable symptom breakdown.
  * Immediate chemical & organic treatments (dosage and application schedules).
  * Preventive cultural practices for future seasons.
* Direct hand-off to Kisan AI for extended follow-up questions.

### 5. 🏛️ Government Schemes & Subsidies Portal
* Curated repository of central and state agricultural schemes (PM-Kisan, PMFBY Crop Insurance, Kisan Credit Card, SMAM Equipment Subsidy, PMKSY Irrigation).
* Filterable by category: **Financial**, **Insurance**, **Equipment**, **Irrigation**, and **Farmer Support**.
* Expandable accordion cards with full eligibility criteria, key benefits, and administering ministries.

### 6. 👤 Farmer Profile & Verification
* Personalized farmer profile with **Verified Farmer** status badge.
* Crop watchlist and saved mandi tracking.
* Direct shortcuts to comparison, schemes, and disease diagnostics.

---

## 🎨 Design System & Visual Identity

Farmbridge adheres to a strict, cohesive visual language tailored specifically for farmers: natural, modern, accessible, and professional.

### Color Palette (Color Hunt Standard)
* **Primary Sage (`#778873`):** Primary branding, active navigation indicators, key action buttons.
* **Light Green (`#A1BC98`):** Subtle active borders, secondary badge highlights.
* **Warm Beige (`#DCCFC0`):** Component dividers, neutral outlines, secondary badges.
* **Cream / Screen Background (`#FDF6ED`):** Warm, glare-free background optimized for daylight viewing.
* **Border Light (`#E8E0D5`):** Restrained, structured card borders.

### Design Principles
* **NO Gradients:** Crisp solid colors create strong contrast and visual hierarchy.
* **NO Emojis in UI:** 100% replaced with professional, lightweight **Lucide Icons** (`lucide-react-native`).
* **Ergonomic Touch Targets:** Minimum 42px touch heights on category tabs and 48px on primary buttons.
* **Horizontal Navigation:** Tab labels remain horizontal and readable across all screen sizes with active pill styling.

---

## 🛠️ Technology Stack

### Frontend Mobile Application
* **Framework:** [React Native](https://reactnative.dev/) (0.86.3) / [Expo](https://expo.dev/) (v57.0.24)
* **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/) (v57.0.22) — File-based routing
* **Language:** [TypeScript](https://www.typescriptlang.org/) (~6.0.3) with strict type checking
* **Iconography:** [Lucide Icons for React Native](https://lucide.dev/) (`lucide-react-native`)
* **Vector Graphics:** [react-native-svg](https://github.com/software-mansion/react-native-svg)
* **Bundler:** [Metro](https://facebook.github.io/metro/) with customized `.mjs` ESM resolver

### Backend & AI Services (`requirements.txt`)
* **AI Engine:** Google Gemini API via `google-generativeai` & LangChain
* **Vision & Diagnostics:** Pillow & OpenCV for crop lesion image analysis
* **API Framework:** FastAPI + Uvicorn (Asynchronous REST API)

---

## 📂 Project Structure

```text
Farmbridge/
├── app/                            # Expo Router screen routes
│   ├── (tabs)/                     # Main bottom-tab navigation group
│   │   ├── _layout.tsx             # Custom polished tab bar with Lucide icons
│   │   ├── home.tsx                # Home dashboard & quick actions
│   │   ├── prices.tsx              # Market prices & category filters
│   │   ├── ai.tsx                  # Kisan AI chat interface
│   │   └── you.tsx                 # Farmer profile & saved items
│   ├── _layout.tsx                 # Root navigation stack
│   ├── compare.tsx                 # Mandi price comparison screen
│   ├── crop-details.tsx            # Historical price charts & mandi breakdown
│   ├── disease.tsx                 # Crop disease camera & diagnosis
│   └── schemes.tsx                 # Government schemes directory
├── src/
│   ├── components/
│   │   └── ui/                     # Reusable design system components
│   │       ├── CategoryTabs.tsx    # Universal horizontal tab selector
│   │       ├── CropBadge.tsx       # Earth-tinted crop icon badge
│   │       ├── PriceCard.tsx       # Mandi commodity price card
│   │       ├── MandiCards.tsx      # Comparison rows & price bars
│   │       ├── AIMessage.tsx       # AI chat bubbles
│   │       ├── SuggestionChip.tsx  # Quick question chips
│   │       ├── SchemeCard.tsx      # Expandable scheme accordion
│   │       ├── DiseaseResultCard.tsx # Disease diagnostic card
│   │       ├── SearchBar.tsx       # Input field with clear action
│   │       ├── StatCard.tsx        # Highlight metric tiles
│   │       └── States.tsx          # EmptyState, LoadingState & StatusBadge
│   ├── constants/
│   │   └── theme.ts                # Design tokens (Colors, Typography, Spacing, Radius, Shadow)
│   ├── mock/                       # Agricultural data feeds & mock state
│   │   ├── crops.ts                # Crop definitions & categories
│   │   ├── prices.ts               # Mandi price feeds & 7d/30d trends
│   │   ├── ai.ts                   # Kisan AI responses & suggested prompts
│   │   └── schemes.ts              # Central & state welfare schemes
│   └── declarations.d.ts           # Global TypeScript module declarations
├── metro.config.js                 # Metro bundler config with CJS & ESM support
├── requirements.txt                # Python backend & AI service requirements
├── package.json                    # Node.js dependencies & scripts
└── tsconfig.json                   # Strict TypeScript compiler options
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: `v18.x` or `v20.x` or higher
* **npm** or **yarn**
* **Expo Go** app on your iOS / Android physical device (optional, for on-device testing)

### 1. Clone the Repository
```bash
git clone https://github.com/VarunBallal-0912/FarmBridge.git
cd FarmBridge
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npx expo start
```

### 4. Run on Platform of Your Choice
* **Web Browser:** Press `w` in the terminal or visit `http://localhost:8081`
* **Android Device / Emulator:** Press `a` (requires Android Studio / device connected)
* **iOS Simulator:** Press `i` (macOS only, requires Xcode)
* **Expo Go (Physical Phone):** Scan the generated QR code using the Expo Go camera (Android) or default Camera app (iOS)

---

## 🐍 Backend AI Service Setup (Optional)

If running the auxiliary FastAPI AI service for live Gemini model querying:

```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

---

## 🧪 Quality & Verification

* **Type Safety:** Validated with strict TypeScript compilation:
  ```bash
  npx tsc --noEmit
  ```
  *(Exits with 0 errors)*
* **Visual Testing:** Mobile layout (390×844 and 360×740 viewports) verified across all 8 major views with zero layout clipping and zero emoji leaks.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
