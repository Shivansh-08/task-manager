


          
# Task Assignment App

A fullstack task management application with user authentication, task assignment, categories, and notifications. Built with Node.js, Express, MongoDB (backend) and React, Vite, Tailwind CSS (frontend).

## Features
- User authentication (JWT-based)
- Create, update, assign, and delete tasks
- Task categories
- Real-time notifications for assignments
- Responsive UI with Tailwind CSS

## Project Structure
```
├── client/   # React frontend (Vite)
└── server/   # Node.js/Express backend
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB Atlas account or local MongoDB instance

### 1. Clone the repository
```bash
git clone https://github.com/your-username/task-assignment.git
cd task-assignment
```

### 2. Backend Setup
```bash
cd server
npm install
```

- Create a `.env` file in `server/`:
  ```env
  MONGO_URI=your_mongodb_connection_string
  PORT=5000
  JWT_SECRET=your_jwt_secret
  ```
- Start the backend:
  ```bash
  npm start
  ```

### 3. Frontend Setup
```bash
cd ../client
npm install
```
- Start the frontend:
  ```bash
  npm run dev
  ```
- The app will be available at [http://localhost:5173](http://localhost:5173)

## API Endpoints
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login
- `GET /api/tasks` — Get all tasks (auth required)
- `POST /api/tasks` — Create a task (auth required)
- `PUT /api/tasks/:id` — Update a task (auth required)
- `PUT /api/tasks/:id/assign` — Assign a task (auth required)
- `PUT /api/tasks/:id/status` — Update task status (auth required)
- `DELETE /api/tasks/:id` — Delete a task (auth required)
- `GET /api/categories` — Get categories (auth required)
- `POST /api/categories` — Create category (auth required)
- `GET /api/notifications` — Get notifications (auth required)

## Technologies Used
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
- **Frontend:** React, Vite, Tailwind CSS, Axios

## Folder Structure
```
client/
  ├── src/
  │   ├── components/
  │   ├── context/
  │   ├── services/
  │   ├── App.jsx
  │   └── main.jsx
server/
  ├── controllers/
  ├── middleware/
  ├── models/
  ├── routes/
  ├── app.js
  └── server.js
```

