import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          const response = await axios.get('http://localhost:5000/api/Contact', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          setData(response.data);
        } catch (error) {
          console.error('Error fetching admin data:', error);
        }
      }
    };

    fetchData();
  }, [isAuthenticated, authToken]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/contact-form.users', {
        username,
        password,
      });
      setAuthToken(response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      alert('Invalid username or password');
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  };

  const labelStyle = {
    marginBottom: '10px',
    fontSize: '16px',
  };

  const inputStyle = {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '3px',
  };

  const buttonStyle = {
    padding: '10px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '3px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: '0',
    maxWidth: '600px',
    width: '100%',
  };

  const listItemStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  };

  return (
    <div style={containerStyle}>
      {!isAuthenticated ? (
        <div>
          <h1>Login</h1>
          <form onSubmit={handleLogin} style={formStyle}>
            <label style={labelStyle}>
              Username:
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
                style={inputStyle}
              />
            </label>
            <label style={labelStyle}>
              Password:
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                style={inputStyle}
              />
            </label>
            <button 
              type="submit" 
              style={buttonStyle}
              onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
              onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Admin Data</h1>
          {data.length === 0 ? (
            <p>No data available</p>
          ) : (
            <ul style={listStyle}>
              {data.map((item) => (
                <li key={item._id} style={listItemStyle}>
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Email:</strong> {item.email}</p>
                  <p><strong>Message:</strong> {item.message}</p>
                  <p><strong>Timestamp:</strong> {new Date(item.timestamp).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
