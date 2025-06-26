import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/SignupForm';
import { useAuth } from '../context/AuthContext';

function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async ({ name, email, password }) => {
    const res = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
    login(res.data.user, res.data.token);
    if (res.data.user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="page-container">
      <SignupForm onSignup={handleSignup} />
    </div>
  );
}

export default SignupPage; 