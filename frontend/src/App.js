import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import SignupPage from './pages/SignupPage';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import AdminLoginPage from './pages/AdminLoginPage';
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        

<Route path="/admin-login" element={<AdminLoginPage />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly>
            <AdminPage />
          </ProtectedRoute>
        } />

        {/* Create Post (Admin only) */}
        <Route path="/create" element={
          <ProtectedRoute adminOnly>
            <CreatePost />
          </ProtectedRoute>
        } />

        {/* Edit Post (Admin only) */}
        <Route path="/edit/:id" element={
          <ProtectedRoute adminOnly>
            <EditPost />
          </ProtectedRoute>
        } />

        {/* View individual post (open to all authenticated users) */}
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
