# 📝 Keeper App

A full-stack note-taking application with an AI-powered chatbot assistant, built as a portfolio project. Keeper lets users create, manage, and get AI-driven suggestions on their notes — all in a clean, responsive interface.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-yellow)

---

## ✨ Features

- **Authentication** — register and log in with JWT-based session management (4h expiry)
- **Notes CRUD** — create, edit, delete, and view personal notes
- **AI Chatbot (Keeper Bot)** — ask the chatbot for suggestions based on your note's title and content, powered by [Groq AI](https://groq.com) (LLaMA 3.1)
- **GDPR compliance** — right to erasure (Art. 17) and data portability (Art. 20) built in
- **Responsive design** — works across desktop, tablet, and mobile screens
- **Privacy-first** — chat messages are never stored in the database; they exist only in browser memory for the session

---

## 📸 Screenshots

| Notes View                                   | Chatbot                                      | Mobile                                          |
| -------------------------------------------- | -------------------------------------------- | ----------------------------------------------- |
| ![Notes](client/public/img/keeper-dash.webp) | ![Chatbot](client/public/img/keeper-ai.webp) | ![Mobile](client/public/img/keeper-mobile.webp) |

---

## 🖥️ Tech Stack

### Frontend

| Technology          | Purpose                 |
| ------------------- | ----------------------- |
| React 19            | UI framework            |
| Vite 7              | Build tool & dev server |
| React Router 7      | Client-side routing     |
| MUI (Material UI) 7 | UI components & icons   |
| Emotion             | CSS-in-JS styling       |

### Backend

| Technology            | Purpose                     |
| --------------------- | --------------------------- |
| Node.js + Express 5   | REST API server             |
| PostgreSQL (via `pg`) | Relational database         |
| JWT (`jsonwebtoken`)  | Authentication              |
| bcrypt                | Password hashing            |
| Groq API              | AI inference (LLaMA 3.1 8B) |

---

## 📁 Project Structure

```
keeper-app/
├── client/                  # React frontend (Vite)
│   ├── public/
│   └── src/
│       ├── api/             # Fetch helpers (notes, auth, users)
│       ├── components/      # UI components
│       │   ├── notes/       # Note, NoteList
│       │   └── legal/       # PrivacyPolicy, TermsOfService
│       ├── context/         # AuthContext (JWT state)
│       └── routes/          # AppRoutes
│
└── server/                  # Node.js backend (Express)
    ├── controllers/         # notesController, usersController
    ├── middleware/          # verifyToken (JWT guard)
    ├── routes/              # notesRoutes, usersRouter
    ├── db.js                # PostgreSQL pool
    ├── schema.sql           # Database schema
    └── index.js             # Entry point + Groq proxy
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL database

### 1. Clone the repository

```bash
git clone https://github.com/your-username/keeper-app.git
cd keeper-app
```

### 2. Set up the database

```bash
psql -U postgres -f server/schema.sql
```

### 3. Configure environment variables

**`server/.env`**

```env
PORT=5050
DATABASE_URL=postgresql://user:password@localhost:5432/keeperapp
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

**`client/.env`**

```env
VITE_AUTH_URL=http://localhost:5050/api
VITE_NOTE_URL=http://localhost:5050/api/notes
VITE_API_URL=http://localhost:5050/api/gemini
```

### 4. Install dependencies

```bash
# Backend
cd server && npm install

# Frontend
cd ../client && npm install
```

### 5. Run the app

```bash
# Start the backend (from /server)
npm run dev

# Start the frontend (from /client)
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔐 API Endpoints

### Auth

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| `POST` | `/api/register` | Register a new user |
| `POST` | `/api/login`    | Log in, receive JWT |

### Notes _(requires Bearer token)_

| Method   | Endpoint         | Description                |
| -------- | ---------------- | -------------------------- |
| `GET`    | `/api/notes`     | Get all notes for the user |
| `POST`   | `/api/notes`     | Create a new note          |
| `PUT`    | `/api/notes/:id` | Edit a note                |
| `DELETE` | `/api/notes/:id` | Delete a note              |

### Account (GDPR) _(requires Bearer token)_

| Method   | Endpoint              | Description                            |
| -------- | --------------------- | -------------------------------------- |
| `DELETE` | `/api/account`        | Delete account and all data (Art. 17)  |
| `GET`    | `/api/account/export` | Export all user data as JSON (Art. 20) |

### AI Chatbot

| Method | Endpoint      | Description                            |
| ------ | ------------- | -------------------------------------- |
| `POST` | `/api/gemini` | Proxy to Groq AI for chatbot responses |

---

## 🤖 How Keeper Bot Works

When you click **Ask Keeper Bot** on a note, the app:

1. Injects your note's title and content into a coaching prompt
2. Sends the conversation history to the Groq API (LLaMA 3.1 8B Instant model) via the backend proxy
3. Displays the AI's response in the chat window

The chatbot is bilingual — it detects the language of your note and responds accordingly.

> ⚠️ Chat messages are **never stored** in the database. They live only in browser memory and are lost on page refresh.

---

## 🛡️ GDPR Compliance

| Right                        | Implementation                                                                |
| ---------------------------- | ----------------------------------------------------------------------------- |
| Art. 17 — Right to erasure   | `DELETE /api/account` permanently removes the user and all notes (CASCADE)    |
| Art. 20 — Data portability   | `GET /api/account/export` returns account + notes as a downloadable JSON file |
| Chatbot data transfer notice | Groq notice modal must be accepted before the chatbot can be used             |
| Password security            | All passwords hashed with bcrypt (cost factor 10)                             |

---

## 👩‍💻 Author

Built by **Ania-Sk** — [anavers.pl](anavers.pl)

> This is a portfolio project. It is provided as-is, without guarantees of uptime or long-term availability.
