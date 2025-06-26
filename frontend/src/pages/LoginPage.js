import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async ({ email, password }) => {
    const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    login(res.data.user, res.data.token);
    if (res.data.user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="page-container">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}

export default LoginPage; 