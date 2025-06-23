<div align="center">

# 🤖 Converse AI

### AI-Powered Sales Chatbot & Business Automation Platform

Converse AI is an AI-powered web application designed to streamline business operations and enhance customer engagement through intelligent automation. Built using Next.js, TypeScript, Clerk (for authentication), Stripe (for payments), and Prisma (for database ORM), it offers a scalable architecture for SaaS platforms
</div>

---

## 🚀 Features

* 💬 **AI Chatbot** – Python-powered chatbot with real-time messaging, payment & booking logic
* 🔐 **Clerk Authentication** – Seamless, secure login system
* 📊 **Modern Dashboard** – Manage users, payments, and campaigns
* 💳 **Stripe Integration** – Subscriptions, checkout, and invoices
* 📅 **Appointment Booking** – Realtime scheduler built in
* ✉️ **Email Marketing** – Campaign creation + contact management
* ⚡ **Realtime Messaging** – Powered by Pusher
* 🐍 **Python Backend** – Handles AI inference & chatbot logic
* ☁️ **Deploy-Ready** – Easily launch on Vercel + any Python backend server

---

## 📸 Screenshots

<h3 align="center">Landing Page</h3>

<p align="center">
  <img src="https://github.com/user-attachments/assets/f6294a95-981b-4bbc-9909-3d750549d570" width="700"/>
</p>

<h3 align="center">Sign-In Page</h3>

<p align="center">
  <img src="https://github.com/user-attachments/assets/5606fc6b-349b-470d-b492-905911bd24ff" width="700"/>
</p>

<h3 align="center">Dashboard</h3>

<p align="center">
  <img src="https://github.com/user-attachments/assets/2c387129-285d-404b-8205-7d2c00a7440e" width="700"/>
</p>

<h3 align="center">AI Chatbot</h3>

<p align="center">
  <img src="https://github.com/user-attachments/assets/85fd6c56-6c75-4953-91d2-e0b28df5b398" width="700"/>
</p>

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd corinna-ai-main
```

---

### 2. Frontend Setup (Next.js)

```bash
npm install
```

#### Add `.env` file:

```env
CLERK_SECRET_KEY=...
CLERK_PUBLISHABLE_KEY=...
STRIPE_SECRET=...
STRIPE_PUBLISHABLE_KEY=...
PUSHER_APP_ID=...
PUSHER_KEY=...
PUSHER_SECRET=...
PUSHER_CLUSTER=...
UPLOADCARE_PUBLIC_KEY=...
EMAIL_SERVER_USER=...
EMAIL_SERVER_PASSWORD=...
EMAIL_SERVER_HOST=...
EMAIL_SERVER_PORT=...
EMAIL_FROM=...
```

---

### 3. Python Backend Setup

> The AI chatbot is served from a Python backend using FastAPI or Flask.


#### Install Python dependencies:

```bash
cd ai-backend
pip install -r requirements.txt
```

#### Run the backend:

```bash
uvicorn app:app --reload
# OR for Flask
# python app.py
```
---

### 4. Connect Frontend to Backend

In your frontend `.env`, add:

```env
CHATBOT_API_URL=http://localhost:8000/api/chat
```

Then in your Next.js app, connect using `fetch` or `axios`:

```ts
const response = await axios.post(`${process.env.CHATBOT_API_URL}`, {
  message: userMessage,
});
```

---

### 5. Set up the database

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

### 6. Run the frontend

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---


Example (FastAPI):

```python
@app.post("/api/chat")
def chat_endpoint(request: ChatRequest):
    user_input = request.message
    response = openai.Completion.create(...)  # or custom logic
    return {"response": response_text}
```

---

## 📦 Tech Stack

| Tech             | Purpose                |
| ---------------- | ---------------------- |
| Next.js 15       | Frontend framework     |
| TypeScript       | Type safety            |
| Clerk            | Auth & user management |
| Prisma           | ORM for PostgreSQL     |
| Stripe           | Payments               |
| Nojejs           | backend logic          |
| Tailwind CSS     | Styling                |
| Pusher           | Real-time messaging    |
| Python           | Chatbot                |  

---

<div align="center">

✨ Built for modern business automation
📈 Boost your client engagement with AI

**Converse AI – Your Smart Sales Assistant**

</div>


