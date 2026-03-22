# 🌍 StudentAtlas
> A community-driven relocation platform for international students and expats, powered by AI.

[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![OpenAI](https://img.shields.io/badge/AI-OpenAI-412991?style=for-the-badge&logo=openai)](https://openai.com/)

---

<!-- ![Dashboard Mockup](file:///Users/basantkhatri/.gemini/antigravity/brain/533c7321-e3ef-4e06-812b-ad6440b34002/student_atlas_mockup_1774198989972.png) -->

## 📌 Table of Contents
* [🚀 Vision](#-vision)
* [🧠 Core Concept](#-core-concept)
* [⚙️ Features](#️-features-mvp)
* [🧱 Tech Stack](#-tech-stack)
* [🚦 Roadmap](#-mvp-roadmap)
* [🛠️ Getting Started](#️-getting-started)
* [🤝 Contributing](#-contributing)

---

## 🚀 Vision
To help students make smarter relocation decisions using **real-time, verified community insights** combined with cutting-edge **AI**. Moving abroad shouldn't be a guessing game.

## 🧠 Core Concept
Users create a **Strong Profile** to unlock a collaborative ecosystem:
- **Personalized Feeds**: Content tailored to your university and target country.
- **Verified Insights**: Only users with completed profiles can influence the ranking.
- **AI Community Brain**: A RAG-based assistant that "reads" every post to give you instant, accurate help.

---

## ⚙️ Features (MVP)
| Feature | Description | Tech |
| :--- | :--- | :--- |
| **Auth System** | JWT & Google OAuth for effortless onboarding. | `Passport.js` |
| **Profile Scoring** | Gamified profile completion to ensure data quality. | `Zustand` |
| **Community Feed** | Dynamic questions and real-world experiences. | `React Query` |
| **AI Brain** | RAG-powered answers based on real community data. | `Vector Search` |
| **Live Pulse** | Real-time chat and updates via WebSockets. | `Socket.io` |

---

## 🧱 Tech Stack

### 💻 Frontend
- **React (Vite)**: Modern, blazing-fast bundling.
- **Tailwind CSS**: Premium design with utility-first styling.
- **Zustand & React Query**: State and data fetching at scale.

### ⚙️ Backend & AI
- **Node.js + Express**: Scalable API architecture.
- **MongoDB Atlas**: Cloud-native database with Vector Search.
- **OpenAI GPT-4o**: Powering the Community Brain.

---

## 🌱 MVP Roadmap

| Phase | Milestone | Focus |
| :--- | :--- | :--- |
| **Week 1** | Identity & Profile | Auth & Profile Scoring |
| **Week 2** | Social Foundation | Posts, Feeds & Discovery |
| **Week 3** | Intelligence | AI Integration & Vector Search |
| **Week 4** | Polishing | Socket.io & Production Deployment |

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account
- OpenAI API Key

### Installation
1. **Clone the Repo**
   ```bash
   git clone https://github.com/basantkhatri/StudentAtlas.git
   cd StudentAtlas
   ```
2. **Install Dependencies**
   ```bash
   # Frontend
   cd client && npm install
   # Backend
   cd ../server && npm install
   ```
3. **Set Environment Variables**
   Create a `.env` in the `/server` folder:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   OPENAI_API_KEY=your_key
   JWT_SECRET=super_secret
   ```

---

## 🧑‍💻 Author
**Basanta Khatri**  
*Full Stack Developer & AI Enthusiast*

---

### 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
