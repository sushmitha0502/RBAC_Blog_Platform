import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Reuse existing styles

function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', { email, password });

      if (response.data.role !== 'admin') {
        setError('Access denied. Not an admin.');
        return;
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      navigate('/admin'); // redirect to admin dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="page-container">
      <div className="login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="login-button">Login as Admin</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage;
