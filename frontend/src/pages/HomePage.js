import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';
function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const { user } = useAuth(); // Reserved for future improvements

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Post deleted.");
      fetchPosts();
    } catch (error) {
      alert("Failed to delete post.");
    }
  };

  if (loading) return <div className="page-container">Loading...</div>;

  return (
    <div className="page-container">
      <h1>Latest Stories</h1>
      {posts.length === 0 && <div>No posts found.</div>}
      {posts.map(post => (
        <div key={post._id} className="card">
          <div className="post-meta">
            By <b>{post.author?.name || 'Unknown'}</b> &middot; {new Date(post.createdAt).toLocaleDateString()}
          </div>
          <h3>{post.title}</h3>
          <p style={{ fontSize: '1.15em', lineHeight: '1.7', marginBottom: '0.7em' }}>
            {post.content.length > 200 ? post.content.slice(0, 200) + '...' : post.content}
          </p>
          <Link to={`/post/${post._id}`} className="read-more-link">Read more &rarr;</Link>

          {role === 'admin' && (
            <div className="admin-buttons">
              <Link to={`/edit/${post._id}`} className="edit-btn">Edit</Link>
              <button onClick={() => handleDelete(post._id)} className="delete-btn">Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default HomePage;
