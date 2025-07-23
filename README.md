# 🎙️ AI Mock Interview Platform

An AI-powered web application that simulates real-life interview scenarios, offering real-time question prompts, voice-based answers, and AI-generated feedback to help candidates prepare for technical, behavioral, and general interviews.

---

## 🚀 Features

- ✨ **AI-Powered Questions & Feedback** — Uses OpenAI's LLMs to dynamically generate questions and analyze user responses.  
- 🎤 **Speech Recognition & Dictation** — Records user answers using real-time speech-to-text with `react-hook-speech-to-text`.  
- 🧠 **Interview Types** — Choose between Technical, Behavioral, or General interviews.  
- 🧪 **Performance Summary** — End of interview feedback with clarity, confidence, and relevance scores.  
- 🔐 **Authentication System** — Secure login and registration using JWT, bcrypt, and MongoDB Atlas.  
- 💡 **Tech Stack Selection** — Users personalize interviews by selecting roles, experience level, and tech stacks.  
- 📊 **Progress Tracker** — See question progress in real-time with timers and indicators.  
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
- OpenAI API for question generation and feedback  

---

## 📁 Project Structure

```bash
/client          # React frontend (Vite)
/server          # Express backend (API, DB logic)

```
## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/ai-mock-interview.git
cd ai-mock-interview
```

### 2. Setup Environment Variables

Create a `.env` file inside the `/server` directory with the following:

```ini
PORT=port_number
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
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
<img width="1920" height="1080" alt="Screenshot (21)" src="https://github.com/user-attachments/assets/565a8a05-4e8a-4d2d-9653-73806d8b39cb" />

<img width="1920" height="1080" alt="Screenshot (20)" src="https://github.com/user-attachments/assets/6052387a-17ff-4889-9ec5-61c662d5a608" />

<img width="1920" height="1080" alt="Screenshot (22)" src="https://github.com/user-attachments/assets/d18e9159-3751-4b50-802a-40fa76697bb0" />


---

## 👨‍💻 Author

**Abhinav Singh**  
_Aspiring Full-Stack Developer | AI Product Builder_  

- [LinkedIn](https://www.linkedin.com/in/your-profile)  
- [GitHub](https://github.com/your-username)

---

## 📃 License

This project is open-source and available under the **MIT License**.

