# Converse AI – Next.js AI Chatbot Platform

Converse AI is a modern,  AI chatbot and business automation platform built with Next.js 15, Clerk authentication, Stripe payments, Prisma, and TypeScript. It features real-time chat, appointment booking, payment links, email marketing, and a beautiful dashboard UI.


![Screenshot 2025-06-22 135300](https://github.com/user-attachments/assets/4605ff58-7cab-40c9-82a2-bee28270966c)
![Screenshot 2025-06-22 135337](https://github.com/user-attachments/assets/1852a60f-cf5c-4ebf-abd2-a0dd44c4b286)
<h2></h2>
![Screenshot 2025-06-22 140617](https://github.com/user-attachments/assets/f6294a95-981b-4bbc-9909-3d750549d570)

![Screenshot 2025-06-22 140352](https://github.com/user-attachments/assets/5606fc6b-349b-470d-b492-905911bd24ff)

![Screenshot 2025-06-22 212423](https://github.com/user-attachments/assets/2c387129-285d-404b-8205-7d2c00a7440e)

![app-ui](https://github.com/user-attachments/assets/85fd6c56-6c75-4953-91d2-e0b28df5b398)



## Features

- **AI Chatbot**: Custom-built, real-time chatbot with payment/booking logic and robust error handling.
- **Authentication**: Secure user auth via Clerk.
- **Dashboard**: Modern, responsive UI for managing clients, appointments, products, and transactions.
- **Stripe Integration**: Payment links, subscription management, and booking logic.
- **Email Marketing**: Manage campaigns and customer lists.
- **Appointment Booking**: Schedule and manage appointments with real-time updates.
- **Realtime Chat**: Pusher-powered chat for instant communication.
- **TypeScript & ESLint**: Fully typed, linted, and follows best practices.
- **Production Ready**: Deployable to Vercel with environment variable support.

## Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd corinna-ai-main
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root with the following (see `.env.example` if available):
```
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

### 4. Set up the database
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Run the development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

**Converse AI** – Modern AI automation for your business.

