# 🌾 KisanSetu (కిసాన్ సేతు / किसान सेतु)
### Smart Farmer Procurement Schedule & Status Information System

An end-to-end, multilingual (English, Telugu, Hindi), real-time web & mobile application developed to eliminate farmer distress at government procurement centres (Mandis, PACS, PPCs, FCI Godowns, CCI, and Markfed).

---

## 🎯 Problem Statement Addressed
Farmers frequently face huge uncertainties regarding nearby procurement centres:
- **Lack of real-time operational status**: Travelling long distances only to find the center closed, on a lunch break, or quota full.
- **Unclear crop acceptance & pricing**: Not knowing which crops (Paddy, Cotton, Maize, Chilli, etc.) are being accepted on a given day or the exact MSP + government incentive rates.
- **Extreme waiting times & distress**: Queues stretching for days without visibility into token progress, storage capacity, gunny bag availability, or weather advisories.

## 💡 Solution Overview
**KisanSetu** connects farmers directly to procurement centres with:
1. **Real-time Centre Finder & Map View**: Instant GPS radius filter, live Open/Closed/Break status badges, operating hours, accepted crops with MSP rates, gunny bag availability, and storage capacity meters.
2. **Digital Token & Queue Management System**: 3-step slot booking generating an official **Digital Delivery E-Pass with QR Code**, accompanied by a live 5-stage queue tracker (Booked ➔ Gate Entry ➔ Moisture Testing ➔ Weighment ➔ Payment Disbursed) and audio bell alerts.
3. **Multilingual & Voice Assistance**: Native support for **Telugu (తెలుగు)**, **Hindi (हिंदी)**, and **English**, complete with speech synthesis and voice search for illiterate/rural farmers.
4. **Centre Officer Terminal (Admin Portal)**: Single-click status toggles (*Open, Break, Quota Full, Closed*), token caller with audio chime, moisture and quality grading entry, automated gross/tare weighment slip generation, and instant emergency broadcast alerts (SMS/Push simulation).
5. **MSP Price Board & Incentive Calculator**: Live MSP vs open market price comparison, YoY trends, moisture standards, and instant payout estimator including state government bonuses.
6. **Downloadable & Printable QR Passes**: Export official delivery passes with QR codes via jsPDF and share directly on WhatsApp.

---

## 🏗️ Architecture & Tech Stack

```
sih_hackthon/
├── server/
│   ├── server.js              # Express REST API & SPA Static Server
│   ├── db.js                  # In-Memory DB with geo-distance & queue engine
│   └── seedData.js            # Pre-seeded Mandis, MSP catalog, tokens & alerts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── types.ts               # Complete TypeScript interfaces
│   ├── translations.ts        # Comprehensive Telugu, English, Hindi dictionaries
│   ├── context/
│   │   ├── LanguageContext.tsx# Multilingual state & switchers
│   │   └── AppContext.tsx     # Global store & active token sync
│   ├── components/
│   │   ├── Navbar.tsx         # Navigation with language & portal switchers
│   │   ├── AlertBanner.tsx    # Weather & urgent procurement alerts + audio
│   │   ├── CentreCard.tsx     # Rich procurement centre cards
│   │   ├── CentreDetailModal.tsx # Storage capacity, quotas & moisture tester
│   │   ├── MandiMapView.tsx   # Interactive Leaflet map with radius circle
│   │   ├── TokenBookingModal.tsx # 3-step slot & token booking flow
│   │   ├── LiveQueueTracker.tsx # Real-time queue tracker & 5-stage progress
│   │   ├── TokenPassModal.tsx # Official QR pass with PDF export & WhatsApp share
│   │   ├── PriceBoard.tsx     # Live MSP vs Market Price & Bonus Calculator
│   │   ├── VoiceAssistant.tsx # Speech Recognition & Text-To-Speech engine
│   │   ├── AdminDashboard.tsx # Officer terminal (toggle status, call next, test quality)
│   │   └── AnalyticsModal.tsx # Statewide procurement transparency metrics
│   └── utils/
│       ├── distance.ts        # Haversine distance calculator
│       ├── sound.ts           # Web Audio chime synthesizer & TTS
│       └── pdfExport.ts       # Official PDF Delivery Pass generator
```

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Leaflet / React-Leaflet, jsPDF, QRCode, Canvas-Confetti.
- **Backend**: Node.js, Express.js REST API with full CRUD and real-time state manipulation.

---

## 🚀 How to Run the Project

### 1. Installation
```bash
npm install
```

### 2. Build the Application
```bash
npm run build
```

### 3. Run the Server
```bash
npm run server
```
Access the application at: **`http://localhost:5001`** (or `http://localhost:5173` if running `npm run dev`).

---

## 🌟 Hackathon Demo Walkthrough (For Judges)

1. **Farmer Experience**:
   - Open `http://localhost:5001`.
   - Toggle language to **తెలుగు (Telugu)** or **हिंदी (Hindi)** to see instant full-UI translation.
   - Click **"Use My Location"** or filter by District (Warangal, Suryapet, Nizamabad, Guntur, Khammam, Karimnagar, Jangaon) or Crop (Paddy, Cotton, Chilli, Turmeric).
   - Click **"View Details"** on *Enumamula Agricultural Market Yard* to inspect godown capacity, gunny bags stock, and try the **Smart Moisture Self-Checker**.
   - Click **"Book Digital Token"**: Enter name, phone, select crop quantity (e.g. 50 Quintals), choose a time slot, and confirm.
   - Observe the **Confetti explosion**, instant generation of **Token KST-046**, and download the **Official QR Delivery Pass (PDF)**.
   - Click **"My Token / Live Queue"** to view live queue position, countdown timer, and 5-stage progress.

2. **Officer Experience (Admin Portal)**:
   - Click **"Officer Portal"** in the top navigation.
   - Click **"Call Next Token (📢 Audio Bell)"** to trigger the Web Audio queue chime and advance the queue.
   - Mark tokens as **"Gate In"**, **"Test Moisture"** (e.g. 15.4% Grade-A), and **"Approve & Pay"**.
   - Switch centre status between **Open**, **Lunch Break**, and **Quota Full**.
   - Broadcast an emergency alert (e.g. "Rain warning - Covered shed priority").
   - Switch back to Farmer view to observe all updates synced in real-time!

3. **Interactive Map & Voice Assistant**:
   - Click **"Map View"** to inspect all procurement centers on OpenStreetMap with color-coded status markers.
   - Click the **"Voice"** button and speak or tap preset questions (*"వరి కేంద్రాలు ఎక్కడ ఉన్నాయి?"* / *"Show Paddy centres"*) to experience voice search and audio readout.

---

## 🏛️ Government & Social Impact
- Eliminates multi-day physical wait times for small and marginal farmers.
- Prevents post-harvest crop spoilage from unseasonal rains through covered shed warnings.
- Ensures 100% transparency in MSP payout calculations and Direct Benefit Transfer (DBT).
- Reduces traffic congestion and vehicle idling near major Mandi market yards.
