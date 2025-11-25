import { useState } from 'react';
import { FaSignOutAlt, FaUserCircle, FaPlus } from 'react-icons/fa';
import UserSearchModal from './UserSearchModal';

const ChatSidebar = ({ chats, selectedChat, onSelectChat, onChatCreated, user, logout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChatCreated = (chat) => {
    onChatCreated(chat);
  };

  return (
    <div style={{ 
      width: '300px', 
      borderRight: '1px solid var(--border-color)', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: 'var(--surface-color)'
    }}>
      <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {user?.avatar?.url ? (
            <img src={user.avatar.url} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <FaUserCircle size={40} color="var(--text-secondary)" />
          )}
          <span style={{ fontWeight: 'bold' }}>{user?.username}</span>
        </div>
        <button onClick={logout} className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }} title="Logout">
          <FaSignOutAlt />
        </button>
      </div>
      
      <div style={{ padding: '1rem' }}>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary" style={{ width: '100%', gap: '0.5rem' }}>
          <FaPlus /> New Chat
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {chats.map(chat => (
          <div 
            key={chat._id} 
            onClick={() => onSelectChat(chat)}
            style={{ 
              padding: '1rem', 
              cursor: 'pointer',
              backgroundColor: selectedChat?._id === chat._id ? 'var(--surface-hover)' : 'transparent',
              borderBottom: '1px solid var(--border-color)',
              transition: 'background-color 0.2s'
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
              {chat.isGroupChat ? chat.name : chat.participants.find(p => p._id !== user?._id)?.username || 'Chat'}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {chat.latestMessage?.content || 'No messages yet'}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <UserSearchModal 
          onClose={() => setIsModalOpen(false)} 
          onChatCreated={handleChatCreated} 
        />
      )}
    </div>
  );
};

export default ChatSidebar;
