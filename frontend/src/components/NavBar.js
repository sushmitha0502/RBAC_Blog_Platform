import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './NavBar.css';

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">📝 RBAC Blog</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/signup">Signup</Link>}
        {user && user.role === 'admin' && <Link to="/admin">Admin</Link>}
        {user && <button className="logout-btn" onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
}

export default NavBar; 