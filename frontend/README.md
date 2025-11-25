# Live Chat Frontend 💬

A modern, real-time chat application frontend built with React and Vite, featuring a stunning glassmorphism design and seamless real-time messaging capabilities.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) v19.2.0
- **Build Tool**: [Vite](https://vite.dev/) v7.2.4
- **Routing**: [React Router DOM](https://reactrouter.com/) v7.9.6
- **HTTP Client**: [Axios](https://axios-http.com/) v1.13.2
- **Real-time**: [Socket.io Client](https://socket.io/) v4.8.1
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) v5.5.0
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/) v11.0.5
- **Styling**: Vanilla CSS with CSS Variables

## 🌟 Key Features

- **Real-time Messaging**: Instant message delivery with Socket.io
- **Glassmorphism UI**: Modern, premium design with blur effects and gradients
- **Authentication**: Secure login and registration with JWT
- **User Search**: Find and start conversations with other users
- **Typing Indicators**: See when others are typing
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark Mode**: Native dark theme design
- **Toast Notifications**: User-friendly feedback for actions

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- Backend server running on `http://localhost:8080`

### Installation

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

## 📂 Project Structure

```
frontend/
├── src/
│   ├── api/              # Axios client configuration
│   │   └── client.js     # API client with interceptors
│   ├── components/       # Reusable UI components
│   │   ├── ChatSidebar.jsx
│   │   ├── ChatWindow.jsx
│   │   └── UserSearchModal.jsx
│   ├── context/          # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── SocketContext.jsx
│   ├── pages/            # Page components
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── ChatPage.jsx
│   ├── assets/           # Static assets
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles and design tokens
├── public/               # Public static files
├── vite.config.js        # Vite configuration
└── package.json
```

## 🎨 Design System

The application uses a custom CSS design system with variables for easy theming:

### Color Palette
- **Background**: Dark slate tones (`#0f172a`, `#1e293b`)
- **Primary**: Indigo (`#6366f1`)
- **Text**: Light slate (`#f8fafc`, `#94a3b8`)

### Key Features
- Glassmorphism effects with `backdrop-filter: blur(12px)`
- Smooth transitions and hover effects
- Custom scrollbar styling
- Responsive utilities

## 🔧 Configuration

### Vite Proxy Setup

The `vite.config.js` includes a proxy to the backend:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
    },
  },
}
```

This allows the frontend to make API calls to `/api/v1/...` without CORS issues during development.

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with ❤️ using React and Vite
