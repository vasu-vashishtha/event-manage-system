# 🗓️ Event Management System (MERN Stack)

A full-stack event management web application with features for event listing, admin event creation, Excel import, user registration, and protected admin dashboard.

---

## 🔧 Project Setup Instructions

This project is divided into two main parts:

- **Frontend (client)** – built with React + Tailwind CSS
- **Backend (server)** – built with Node.js, Express, MongoDB

---

### 📁 Folder Structure

/root
├── client → React Frontend (Vite + Tailwind)
└── server → Node.js Backend (Express + MongoDB)

## 🚀 Getting Started (Local Development)
1. Clone the Repository
git clone https://github.com/yourusername/event-management.git
cd event-management

2. Setup Backend (server)
cd server
npm install

3.  Create .env file in /server
PORT=5000
MONGO_URI="mongodb+srv://vashishthavasu2:LqvcyyWDflhaQBOj@cluster0.ivoqwp7.mongodb.net/eventDB"
JWT_SECRET=vasu123 

4.  Start Backend
npm run dev

5. Setup Frontend (client)
cd ../client
npm install

6. Find baseURL in api folder in api.js

6. Start Frontend
npm run dev

Now the frontend will run on: http://localhost:5173
And backend on: http://localhost:5000

