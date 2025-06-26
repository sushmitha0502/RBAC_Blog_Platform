import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '' });

  useEffect(() => {
    axios.get(`http://localhost:5001/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error('Failed to load post', err));
  }, [id]);

  const handleChange = e => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5001/api/posts/${id}`, post, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(() => navigate('/admin'));
  };

  return (
    <div className="form-container">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={post.title} onChange={handleChange} placeholder="Title" required />
        <textarea name="content" value={post.content} onChange={handleChange} placeholder="Content" required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditPost;
