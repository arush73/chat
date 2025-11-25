import { useState, useEffect } from 'react';
import apiClient from '../api/client';
import { FaTimes, FaSearch, FaUserPlus } from 'react-icons/fa';

const UserSearchModal = ({ onClose, onChatCreated }) => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        searchUsers();
      } else {
        setUsers([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const searchUsers = async () => {
    setLoading(true);
    try {
      // Assuming backend accepts query param 'search' or similar. 
      // context.md says "Query params likely used". 
      // Usually it's ?query= or ?search=
      // Let's try ?search= first.
      const { data } = await apiClient.get(`/chat-app/chats/users?search=${query}`); // Adjust param name if needed
      setUsers(data.data || []);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const startChat = async (userId) => {
    try {
      const { data } = await apiClient.post(`/chat-app/chats/c/${userId}`);
      onChatCreated(data.data);
      onClose();
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="glass" style={{ width: '90%', maxWidth: '500px', padding: '1.5rem', borderRadius: '1rem', backgroundColor: 'var(--surface-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0 }}>New Chat</h3>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }}>
            <FaTimes />
          </button>
        </div>

        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '1rem' }}>Searching...</div>
          ) : users.length > 0 ? (
            users.map(user => (
              <div 
                key={user._id} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '0.75rem', 
                  borderBottom: '1px solid var(--border-color)' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                    {user.username[0].toUpperCase()}
                  </div>
                  <span>{user.username}</span>
                </div>
                <button onClick={() => startChat(user._id)} className="btn btn-primary" style={{ padding: '0.5rem' }}>
                  <FaUserPlus />
                </button>
              </div>
            ))
          ) : query ? (
            <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-secondary)' }}>No users found</div>
          ) : (
            <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-secondary)' }}>Type to search users</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSearchModal;
