# Live Chat Application

A modern, real-time chat application featuring a robust backend and a sleek, glassmorphism-styled frontend. This project demonstrates a full-stack implementation of a chat system with authentication, real-time messaging, and user management.

## 🚀 Features

*   **Real-time Messaging**: Instant message delivery using Socket.io.
*   **Authentication**: Secure user registration and login (JWT & Session-based).
*   **User Search**: Find and start chats with other users.
*   **Typing Indicators**: See when other users are typing.
*   **Responsive Design**: A beautiful, mobile-friendly interface with a glassmorphism aesthetic.
*   **Group Chats**: Support for creating and managing group conversations.
*   **Dark Mode**: Native dark mode design.

## 🛠 Tech Stack

### Frontend
*   **Framework**: React (Vite)
*   **Styling**: Vanilla CSS (Glassmorphism, CSS Variables)
*   **State Management**: Context API (Auth & Socket)
*   **Real-time**: Socket.io Client
*   **Routing**: React Router DOM
*   **HTTP Client**: Axios
*   **Notifications**: React Toastify

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB (Mongoose)
*   **Real-time**: Socket.io
*   **Authentication**: Passport.js, JWT
*   **Validation**: Zod
*   **Logging**: Winston, Morgan

## 📋 Prerequisites

Before running the project, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v14+ recommended)
*   [MongoDB](https://www.mongodb.com/) (Local or Atlas)

## ⚙️ Installation & Setup

### clone the repo 

```bash
    git clone https://github.com/arush73/chat.git
```

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure environment variables:
    *   Create a `.env` file in the `backend` directory.
    *   Copy the contents from `.env.sample` and update the values (especially `MONGODB_URI`).
    *   Ensure `CORS_ORIGIN` allows your frontend (default: `http://localhost:5173` for Vite).

4.  Start the backend server:
    ```bash
    npm run dev
    ```
    The server will start on port `8080` (or as defined in `.env`).

### 2. Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## 🔧 Configuration

### Backend Environment Variables (`backend/.env`)

| Variable | Description |
| :--- | :--- |
| `PORT` | Server port (default: 8080) |
| `MONGODB_URI` | MongoDB connection string |
| `CORS_ORIGIN` | Allowed frontend origin(s) |
| `ACCESS_TOKEN_SECRET` | Secret for signing access tokens |
| `REFRESH_TOKEN_SECRET` | Secret for signing refresh tokens |
| `EXPRESS_SESSION_SECRET` | Secret for session management |

*(See `backend/.env.sample` for a full list of optional variables like OAuth and Cloudinary)*

## 📖 API Documentation

The backend API documentation is available in `backend/context.md`. It details all available endpoints for:
*   Authentication (`/api/v1/auth`)
*   Chat Management (`/api/v1/chat-app/chats`)
*   Messages (`/api/v1/chat-app/messages`)

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the ISC License.
