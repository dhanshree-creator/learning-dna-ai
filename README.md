# 🚀 CodeStory AI

### Story-Based Codebase Understanding using Generative AI

CodeStory AI is a Generative AI powered tool that converts complex source code into **simple story-based explanations**.
It helps developers, students, and beginners understand unfamiliar codebases quickly by transforming logic into **easy-to-understand narratives**.

This project was built for the **AWS AI for Bharat Hackathon**.

---

# 🌟 Problem Statement

Understanding large or unfamiliar codebases is one of the biggest challenges for beginner developers. Traditional documentation explains code line-by-line but does not provide **contextual understanding**.

Many developers struggle with:

* Understanding complex program logic
* Interpreting legacy codebases
* Learning new programming concepts quickly

CodeStory AI solves this by converting code into **human-like stories**, making programming easier to understand.

---

# 💡 Solution

CodeStory AI uses **Generative AI models from Amazon Bedrock** to analyze code and generate story-style explanations.

Instead of reading complicated syntax, users receive explanations like:

> "Imagine a library system where a function acts like a librarian organizing books..."

This approach improves comprehension and learning for beginners.

---

# 🧠 Key Features

✨ Convert code into story-based explanations
✨ Beginner-friendly learning approach
✨ Supports understanding of complex logic
✨ AI-powered natural language generation
✨ Simple and interactive user interface

---

# 🏗️ System Architecture

```
User
 ↓
Frontend (React) — Vercel
 ↓
Backend API (FastAPI) — Render
 ↓
Amazon Bedrock
 ↓
AI-generated story explanation
```

The frontend is deployed on **Vercel**, the backend API runs on **Render**, and the Generative AI capability is powered by **Amazon Bedrock on AWS**.

---

# ⚙️ Tech Stack

### Frontend

* React
* HTML/CSS
* JavaScript
* Vercel Deployment

### Backend

* FastAPI
* Python
* REST API
* Render Deployment

### AI & Cloud

* Amazon Bedrock (Generative AI)
* AWS SDK (Boto3)

---

# 🔄 How It Works

1. User enters a code snippet in the web interface
2. The frontend sends the request to the backend API
3. Backend processes the code and prepares a prompt
4. The prompt is sent to **Amazon Bedrock**
5. Bedrock generates a **story-based explanation**
6. The explanation is returned and displayed to the user

---

# 📦 Project Structure

```
codestory-ai
│
├── frontend
│   ├── React application
│
├── backend
│   ├── FastAPI server
│   ├── Bedrock integration
│
├── README.md
└── architecture.png
```

---

# 🚀 Live Demo

Frontend Application:
`https://learning-dna-ai.vercel.app/'

Backend API:
`https://ai-bharat-5q4q.onrender.com'

---

# 📹 Demo Video

Demo Video Link:
`https://your-demo-video-link`

---

# 👥 Team

Team Name: **Bit Wizards**

Team Leader: **Dhanshree Adhav**

---

# 🌍 Impact

CodeStory AI helps:

* Beginner developers understand code faster
* Students learn programming concepts intuitively
* Developers explore unfamiliar repositories efficiently

This solution aims to make programming **more accessible and inclusive for Bharat’s growing developer community.**

---

# 🔮 Future Improvements

* Multi-language support for explanations
* Repository-level codebase storytelling
* Interactive learning mode
* Voice-based explanations
* AI debugging assistant

---

# 📜 License

This project is created for educational and hackathon purposes.
