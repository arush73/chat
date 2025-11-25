# Live Chat Backend API 🚀

The robust and scalable backend infrastructure for the **Live Chat Application**, designed to power real-time messaging, secure authentication, and efficient user management.

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (with [Mongoose](https://mongoosejs.com/))
- **Authentication**: 
  - JWT (JSON Web Tokens) for stateless auth
  - [Passport.js](https://www.passportjs.org/) for OAuth (Google & GitHub)
  - Express Session for session management
- **Real-time**: [Socket.io](https://socket.io/) for instant messaging
- **File Storage**: [Cloudinary](https://cloudinary.com/) (via Multer)
- **Security**: [Helmet](https://helmetjs.github.io/), CORS configuration, Rate Limiting
- **Validation**: [Zod](https://zod.dev/) for schema validation

## 🌟 Key Features

- **Secure Authentication**: Complete flow including Register, Login, OAuth (Google/GitHub), Password Reset, and Email Verification.
- **Real-time Messaging**: 
  - 1-on-1 private chats
  - Group chats with admin controls
  - Typing indicators
  - Real-time online status
- **Message Persistence**: All messages are stored securely in MongoDB.
- **File Sharing**: Support for sending images and attachments via Cloudinary.
- **Robust Error Handling**: Centralized error handling and standardized API responses.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB Instance (Local or Atlas)
- Cloudinary Account (for file uploads)

### Installation

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the `backend` root. You can copy the sample file:
    ```bash
    cp .env.sample .env
    ```
    
    Update the following key variables in `.env`:
    ```env
    PORT=8080
    MONGODB_URI=mongodb://localhost:27017/live-chat
    CORS_ORIGIN=http://localhost:5173
    
    # Security Secrets (Generate strong random strings)
    ACCESS_TOKEN_SECRET=...
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_SECRET=...
    REFRESH_TOKEN_EXPIRY=10d
    EXPRESS_SESSION_SECRET=...
    
    # Cloudinary (Optional for basic chat, required for file uploads)
    CLOUDINARY_CLOUD_NAME=...
    CLOUDINARY_API_KEY=...
    CLOUDINARY_API_SECRET=...
    ```

4.  **Start the Server:**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:8080`.

## 📡 API Endpoints Overview

### Authentication (`/api/v1/auth`)
- `POST /register`: Register a new user
- `POST /login`: Login user
- `POST /logout`: Logout user
- `POST /refresh-token`: Refresh access token
- `GET /current-user`: Get current user details
- `GET /google` & `/github`: OAuth login endpoints

### Chat Management (`/api/v1/chat-app/chats`)
- `GET /`: Get all chats for the logged-in user
- `GET /users`: Search for users to chat with
- `POST /c/:receiverId`: Create or access a 1-on-1 chat
- `POST /group`: Create a new group chat
- `GET /group/:chatId`: Get group details
- `PATCH /group/:chatId`: Rename group
- `DELETE /group/:chatId`: Delete group
- `POST /group/:chatId/:participantId`: Add participant to group
- `DELETE /group/:chatId/:participantId`: Remove participant from group

### Messages (`/api/v1/chat-app/messages`)
- `GET /:chatId`: Get all messages for a specific chat
- `POST /:chatId`: Send a new message (supports attachments)
- `DELETE /:chatId/:messageId`: Delete a message

## 📂 Project Structure

```
backend/
├── src/
│   ├── config/          # DB connection & external service configs
│   ├── controllers/     # Request handlers (Auth, Chat, Message)
│   ├── middlewares/     # Auth, Error handling, Multer, Rate Limit
│   ├── models/          # Mongoose Schemas (User, Chat, Message)
│   ├── routes/          # API Route definitions
│   ├── socket/          # Socket.io event handlers
│   ├── utils/           # Helper functions (ApiResponse, ApiError)
│   ├── validators/      # Zod schemas for input validation
│   ├── app.js           # Express app setup
│   └── index.js         # Entry point
└── ...
```

## 🤝 Contributing

1. Fork the repo.
2. Create a feature branch.
3. Commit your changes.
4. Push to the branch.
5. Create a Pull Request.

---

Built for the Live Chat Project.
