
# 📰 RBAC Blog Platform

A secure blog application with **Role-Based Access Control (RBAC)** built using **MERN stack** (MongoDB, Express, React, Node.js). Admins can manage posts (Create, Read, Update, Delete), while users can view and read blog content.

---

## 🚀 Features

- 🔐 Authentication (JWT-based)
- 👥 Role-based authorization (Admin / User)
- 📝 Admin dashboard to manage blog posts
- 📚 Public Home page for users to read blogs
- 📦 MongoDB for storing posts and users
- 🎨 Modern and responsive UI

---

## 📂 Project Structure

```
rbac/
├── backend/             # Express + MongoDB API
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
├── frontend/            # React.js frontend
│   ├── pages/
│   ├── components/
│   ├── context/
│   └── App.js
├── .env
└── README.md
```

---

## ⚙️ Installation

### Prerequisites

- Node.js v18+ recommended
- MongoDB (Atlas or local)
- npm or yarn

---

### 📌 Backend Setup

```bash
cd backend
npm install
```

> Create a `.env` file in `/backend`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/rbac
JWT_SECRET=your_jwt_secret
PORT=5001
```

Start server:

```bash
nodemon server.js
```

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
```

Update the backend API base URL in `frontend/src/api.js` or wherever axios base URL is configured:

```js
axios.defaults.baseURL = 'http://localhost:5001';
```

Start frontend:

```bash
npm start
```

---

## 🔐 Roles & Permissions

| Role  | Access                                           |
|-------|--------------------------------------------------|
| User  | View posts only                                  |
| Admin | Create, Edit, Delete posts via admin dashboard   |

---

## 🛠 Tech Stack

- **Frontend**: React.js, Axios, React Router
- **Backend**: Node.js, Express.js, JWT
- **Database**: MongoDB (Mongoose)
- **Styling**: CSS (with professional UI)

---



## 📝 License

MIT License
