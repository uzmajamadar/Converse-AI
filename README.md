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

![Screenshot 2025-06-22 135300](https://github.com/user-attachments/assets/4605ff58-7cab-40c9-82a2-bee28270966c)
![Screenshot 2025-06-22 135337](https://github.com/user-attachments/assets/1852a60f-cf5c-4ebf-abd2-a0dd44c4b286)

<h2 align="center">Landing Page</h2>

![Screenshot 2025-06-22 140617](https://github.com/user-attachments/assets/f6294a95-981b-4bbc-9909-3d750549d570)

<h2 align="center">Sign Page</h2>

![Screenshot 2025-06-22 140352](https://github.com/user-attachments/assets/5606fc6b-349b-470d-b492-905911bd24ff)

<h2 align="center">Dashboard</h2>

![Screenshot 2025-06-22 212423](https://github.com/user-attachments/assets/2c387129-285d-404b-8205-7d2c00a7440e)

<h2 align="center"> AI Chatbot</h2>

![app-ui](https://github.com/user-attachments/assets/85fd6c56-6c75-4953-91d2-e0b28df5b398)

<h2 align="center">Dashboard</h2>


---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd converse-ai-main
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


