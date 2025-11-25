import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import apiClient from '../api/client';
import ChatSidebar from '../components/ChatSidebar';
import ChatWindow from '../components/ChatWindow';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const { user, logout } = useAuth();
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchChats();
  }, [user, navigate]);

  const fetchChats = async () => {
    try {
      const { data } = await apiClient.get('/chat-app/chats');
      setChats(data.data || []); // Adjust based on actual response structure
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Listen for new messages to update chat list order or unread counts
  useEffect(() => {
    if (!socket) return;
    
    const handleNewMessage = (message) => {
      // Logic to update chats list (e.g. move chat to top)
      // For now, just refetch or update state manually
      // We'll implement this refinement later
    };

    socket.on('messageReceived', handleNewMessage); // Verify event name from backend
    return () => socket.off('messageReceived', handleNewMessage);
  }, [socket]);

  const handleChatCreated = (newChat) => {
    setChats(prev => {
      if (prev.find(c => c._id === newChat._id)) return prev;
      return [newChat, ...prev];
    });
    setSelectedChat(newChat);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <ChatSidebar 
        chats={chats} 
        selectedChat={selectedChat} 
        onSelectChat={setSelectedChat} 
        onChatCreated={handleChatCreated}
        user={user}
        logout={logout}
      />
      {selectedChat ? (
        <ChatWindow chat={selectedChat} currentUser={user} />
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Welcome, {user?.username}</h2>
            <p>Select a chat to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
