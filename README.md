# 🎙️ AI Mock Interview Platform

An AI-powered web application that simulates real-life interview scenarios, offering real-time question prompts, voice-based answers, and AI-generated feedback to help candidates prepare for technical, behavioral, and general interviews.

---

## 🚀 Features

- ✨ **AI-Powered Questions & Feedback** — Uses OpenAI's LLMs to dynamically generate questions and analyze user responses.  
- 🎤 **Speech Recognition & Dictation** — Records user answers using real-time speech-to-text with `react-hook-speech-to-text`.  
- 🧪 **Performance Summary** — End of interview feedback with clarity, confidence, and relevance scores.  
- 🔐 **Authentication System** — Secure login and registration using JWT, bcrypt, and MongoDB Atlas.  
- 💡 **Tech Stack Selection** — Users personalize interviews by selecting roles, experience level, and tech stacks.  
- 🌐 **Deployed with Render** — Unified full-stack deployment with both frontend and backend in a single repo.  

---

## 🧱 Tech Stack

### **Frontend**
- React + Vite  
- Tailwind CSS  
- React Router  
- `react-hook-speech-to-text`  
- `lucide-react`  

### **Backend**
- Node.js + Express.js  
- MongoDB Atlas  
- JWT + Bcrypt  
- dotenv  

### **AI Integration**
- Gemini API for question generation and feedback  

---

## 📁 Project Structure

```bash
/client          # React frontend (Vite)
/server          # Express backend (API, DB logic)

```
## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/AbhinavSingh100/PrepEarlAI---AI-Mock-Interview-Platform.git
cd ai-mock-interview
```

### 2. Setup Environment Variables

1. Create a `.env` file inside the `/server` directory with the following:

```ini
PORT=port_number
CLIENT_URL=your_client_url
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

2. Create a `.env` file inside the `/client` directory with the following:

```ini
VITE_SERVER_URL=your_server_url
```

### 3. Install Dependencies

```bash
# From project root
cd client
npm install

cd ../server
npm install
```

### 4. Run Locally

Open two terminals and run:

```bash
# Terminal 1 - Start backend
cd server
node server.js
```

```bash
# Terminal 2 - Start frontend
cd client
npm run dev
```

- Frontend runs at: [http://localhost:5173](http://localhost:5173)  
- Backend runs at: [http://localhost:5000](http://localhost:5000)

---

## 🚢 Deployment (Render)

- Deploy backend as a **Web Service** (Node.js environment).
- Deploy frontend as a **Static Site** (Vite build).
- Set environment variables in the Render dashboard for the backend.

---

## 📸 Screenshots

<!-- Add screenshots or demo GIFs here -->
<img width="1896" height="951" alt="Screenshot (22)" src="https://github.com/user-attachments/assets/dcc2710f-ae5a-4d43-907c-50c651464ac2" />

<img width="1920" height="948" alt="Screenshot (20)" src="https://github.com/user-attachments/assets/9167ca0b-78b9-4c9a-b80a-65166495c1a0" />

<img width="1893" height="944" alt="Screenshot (21)" src="https://github.com/user-attachments/assets/3b930b05-8992-4735-b271-eb649aa59ed9" />


---

## 👨‍💻 Author

**Abhinav Singh**  
_Aspiring Full-Stack Developer | AI Product Builder_  

- [LinkedIn](https://www.linkedin.com/in/abhinav-singh-529935223/)  
- [GitHub](https://github.com/AbhinavSingh100)

---

## 📃 License

This project is open-source and available under the **MIT License**.

