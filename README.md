# Roommate Finder 🏠🤝

A full-stack modern MERN (MongoDB, Express, React, Node.js) application designed to help people find compatible roommates, discover shared living spaces, and connect in real time.

---

## 🚀 Features

- **User Authentication**: Secure JWT-based registration and login with encrypted passwords.
- **Roommate & Listing Search**: Filter and search for potential roommates and accommodations based on preferences, location, budget, and lifestyle habits.
- **Detailed Profiles**: Rich user profiles showcasing preferences, lifestyle habits, and accommodation details.
- **Real-Time Communication**: Instant messaging and updates powered by Socket.io.
- **Media Uploads**: Image upload handling using Multer.
- **Seed Data**: Pre-configured database seeder for testing and development.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Routing**: React Router v7
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Real-Time**: Socket.io Client

### Backend
- **Runtime**: Node.js & Express 5
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **Real-Time**: Socket.io
- **File Uploads**: Multer
- **Dev Tools**: Nodemon, Morgan

---

## 📁 Project Structure

```
Roommate-Finder/
├── backend/
│   ├── config/         # Database and server configurations
│   ├── controllers/    # API request handlers
│   ├── middleware/     # Auth, error handling, upload middleware
│   ├── models/         # Mongoose data schemas
│   ├── routes/         # Express API endpoints
│   ├── uploads/        # Uploaded images
│   ├── .env.example    # Example environment variables
│   ├── package.json
│   ├── seeder.js       # Database seeder script
│   └── server.js       # Server entry point
├── frontend/
│   ├── public/
│   ├── src/            # React components, pages, hooks, context
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (running locally or MongoDB Atlas URI)

### 1. Clone the repository
```bash
git clone https://github.com/Vishnu2330-code/Roommate-Finder.git
cd Roommate-Finder
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory (refer to `.env.example`):
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/roommate_finder
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:5173
```

*(Optional)* Seed initial sample data:
```bash
npm run seed
```

Start backend development server:
```bash
npm run dev
```
The backend server runs on `http://localhost:5000`.

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
The frontend application runs on `http://localhost:5173`.

---

## 📜 License

This project is licensed under the ISC License.
