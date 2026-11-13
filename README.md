# ARAN — Autonomous Rescue & Assistance Network (அரண்)

> **"When Chaos Rises, ARAN Responds."**  
> *Every Signal Matters. Every Life Counts.*  
> **Team:** NaalvarX | **Event:** K! Hacks 4.0 — Anna University, Chennai

---

## 🛡️ Project Overview

**ARAN** (Tamil: **அரண்** — meaning *Fortress / Impregnable Defense*) is an autonomous multi-agent disaster response coordination grid. During catastrophic climate disasters—such as flash floods, cyclonic surges, or building collapses—standard communication infrastructure collapses, leading to fragmented, duplicated, and uncoordinated emergency signals.

ARAN bridges this gap by deploying an autonomous **Seven-Agent Intelligence Grid** that intercepts multi-modal distress signals (LoRa mesh packets, satellite uplinks, emergency SMS, voice transcripts), performs real-time causal reasoning, calculates life-critical triage scores, and provides explainable, human-in-the-loop dispatch recommendations for emergency commanders.

---

## 🧠 Seven-Agent Autonomous Architecture

| # | Agent Name | Tamil Identity | Operational Mandate |
|---|---|---|---|
| **01** | **Signal Intelligence Agent** | அழைப்பு புலனாய்வு முகவர் | Distress signal interception across LoRa mesh (868MHz), Tamil/English NLP keyword extraction, noise filtering, and signal confidence scoring. |
| **02** | **Geo Intelligence Agent** | புவிசார் நுண்ணறிவு முகவர் | Spatial GIS elevation analysis, flood inundation polygon intersection, digital terrain modeling, and impassable road hazard flagging. |
| **03** | **Distress Fusion Agent** | துயர் ஒருங்கிணைப்பு முகவர் | Spatio-temporal deduplication (DBSCAN), cross-modal signal clustering (SMS + Social + Sensor), and false-alarm suppression. |
| **04** | **Criticality Assessment Agent** | நெருக்கடி மதிப்பீட்டு முகவர் | Dynamic medical triage scoring ($0 - 100$), life-threat vulnerability weighting (infants, elderly, patients), and emergency prioritization. |
| **05** | **Resource Orchestration Agent** | வள ஒதுக்கீட்டு முகவர் | Optimal rescue unit matching (Hungarian algorithm) balancing vessel capacity, crew readiness, travel time, and equipment compatibility. |
| **06** | **Route Intelligence Agent** | பாதை நுண்ணறிவு முகவர் | Risk-aware routing avoiding submerged bridges, high-current bottlenecks, and downed power lines with real-time turn-by-turn waypoints. |
| **07** | **Resilience & Sync Agent** | மீள்திறன் & ஒத்திசைவு முகவர் | Offline-first CRDT state replication, peer-to-peer LoRa gossip sync, Merkle DAG conflict resolution, and automatic satellite uplink fallback. |

---

## ✨ Key Features

- **Full-Screen Tactical Command Centre (`/command`):**
  - **Interactive Tactical Map:** High-contrast dark basemap with real-time incident pins, triage urgency rings, dispatched rescue craft tracking (NDRF boats, SDRF ambulances, fire rescue, medevac helicopters, drone squads), and animated route vectors.
  - **Emergency Incident Feed:** Searchable real-time feed with severity filters (`CRITICAL`, `HIGH`, `MODERATE`).
  - **Human-in-the-Loop Approval Queue (HITL):** Explainable AI dispatch recommendations requiring one-click commander authorization or override.
  - **Active Rescue Fleet Tracker:** Real-time monitoring of crew status, vehicle capacity, and battery/fuel reserves.
  - **Audit Trail & Event Timeline:** Chronological logging of all automated inferences, telemetry receptions, and human decisions.
  - **Emergency SOS Ingestion Modal:** Interactive distress reporting with voice note transcription, geographic presets for Tamil Nadu hotspots (Adyar, Velachery, Mudichur, Perumbakkam, Ennore, Cuddalore), and live triage scoring.
  - **Crisis Wave Simulator:** Stream live disaster surges to test multi-agent stress response.
- **7-Agent Reasoning Pipeline Page (`/intelligence`):**
  - Interactive step-by-step pipeline visualizer showing real-time latencies, accuracy benchmarks, and data throughput.
  - Deep-dive into each agent's causal explainability, input payloads, and decision outputs.
  - "Run Live Pipeline Simulation" button to demonstrate the full end-to-end signal processing flow.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite 5
- **Styling:** Tailwind CSS, Custom ARAN Cyberpunk/Tactical Dark Palette
- **Animation:** Framer Motion
- **Mapping & GIS:** Leaflet, React-Leaflet, OpenStreetMap Cartography
- **Icons:** Lucide React
- **Routing:** React Router v6 (SPA)

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/mohul-inventions/aran.git
cd aran

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 📦 Production Build & Deployment

### Build for Production
```bash
npm run build
```
The compiled production bundle will be generated in the `dist/` directory.

### Deploying to Vercel
1. Import the repository in [Vercel](https://vercel.com).
2. The included `vercel.json` automatically configures single-page application (SPA) rewrites and build settings.
3. Click **Deploy**.

### Deploying to Netlify
1. Connect the repository on [Netlify](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. The included `frontend/public/_redirects` file handles client-side routing.

---

## 👥 Team NaalvarX

Developed with pride for **K! Hacks 4.0** by **Team NaalvarX**.

> *"When Chaos Rises, ARAN Responds."*
