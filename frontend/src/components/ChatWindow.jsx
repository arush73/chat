import { useState, useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import apiClient from '../api/client';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';

const ChatWindow = ({ chat, currentUser }) => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (chat) {
      fetchMessages();
      if (socket) {
        socket.emit('joinChat', chat._id);
      }
    }
  }, [chat, socket]);

  useEffect(() => {
    if (!socket) return;

    const handleMessageReceived = (message) => {
      if (message.chat === chat._id || message.chat._id === chat._id) {
        setMessages((prev) => [...prev, message]);
        scrollToBottom();
      }
    };

    const handleTyping = (chatId) => {
      if (chatId === chat._id) setIsTyping(true);
    };

    const handleStopTyping = (chatId) => {
      if (chatId === chat._id) setIsTyping(false);
    };

    socket.on('messageReceived', handleMessageReceived);
    socket.on('typing', handleTyping);
    socket.on('stopTyping', handleStopTyping);

    return () => {
      socket.off('messageReceived', handleMessageReceived);
      socket.off('typing', handleTyping);
      socket.off('stopTyping', handleStopTyping);
    };
  }, [socket, chat]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get(`/chat-app/messages/${chat._id}`);
      setMessages(data.data || []);
      scrollToBottom();
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const { data } = await apiClient.post(`/chat-app/messages/${chat._id}`, {
        content: newMessage,
      });
      setNewMessage('');
      setMessages((prev) => [...prev, data.data]);
      socket.emit('stopTyping', chat._id);
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    
    if (socket) {
      socket.emit('typing', chat._id);
      
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('stopTyping', chat._id);
      }, 3000);
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0 }}>
          {chat.isGroupChat ? chat.name : chat.participants.find(p => p._id !== currentUser?._id)?.username || 'Chat'}
        </h3>
        {isTyping && <span style={{ fontSize: '0.8rem', color: 'var(--primary-color)' }}>Typing...</span>}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {loading ? (
          <div className="flex-center" style={{ height: '100%' }}>
            <FaSpinner className="spin" size={24} />
          </div>
        ) : (
          messages.map((msg) => {
            const isMyMessage = msg.sender._id === currentUser?._id;
            return (
              <div 
                key={msg._id} 
                style={{ 
                  alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
                  maxWidth: '70%',
                }}
              >
                {!isMyMessage && <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{msg.sender.username}</div>}
                <div style={{ 
                  padding: '0.75rem 1rem', 
                  borderRadius: '1rem',
                  borderBottomRightRadius: isMyMessage ? '0' : '1rem',
                  borderBottomLeftRadius: !isMyMessage ? '0' : '1rem',
                  backgroundColor: isMyMessage ? 'var(--primary-color)' : 'var(--surface-hover)',
                  color: isMyMessage ? 'white' : 'var(--text-primary)'
                }}>
                  {msg.content}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.25rem', textAlign: isMyMessage ? 'right' : 'left' }}>
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          className="input-field"
          placeholder="Type a message..."
          value={newMessage}
          onChange={handleTyping}
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn btn-primary" disabled={!newMessage.trim()}>
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
