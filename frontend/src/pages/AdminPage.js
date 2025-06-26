import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AdminPage.css';

function AdminPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const { token } = useAuth();

  const fetchPosts = () => {
    axios.get('http://localhost:5000/api/blogs')
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/blogs', { title, content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTitle('');
      setContent('');
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.message || 'Create failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPosts();
    } catch (err) {
      alert('Delete failed');
    }
  };

  // For simplicity, update will just prompt for new title/content
  const handleUpdate = async (id) => {
    const newTitle = prompt('New title:');
    const newContent = prompt('New content:');
    if (!newTitle || !newContent) return;
    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}`, { title: newTitle, content: newContent }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPosts();
    } catch (err) {
      alert('Update failed');
    }
  };

  if (loading) return <div className="page-container">Loading...</div>;

  return (
    <div className="page-container">
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleCreate}>
        <h3>Create New Post</h3>
        {error && <div className="error">{error}</div>}
        <div>
          <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required />
        </div>
        <button type="submit">Create</button>
      </form>
      <h3>All Posts</h3>
      {posts.length === 0 && <div>No posts found.</div>}
      {posts.map(post => (
        <div key={post._id} className="card">
          <h4>{post.title}</h4>
          <p>{post.content}</p>
          <small>By {post.author?.name || 'Unknown'}</small>
          <div style={{ marginTop: '1em' }}>
            <button onClick={() => handleUpdate(post._id)} style={{ marginRight: '0.5em' }}>Update</button>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminPage; 