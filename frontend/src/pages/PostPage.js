import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blogs/${id}`)
      .then(res => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="page-container">Loading...</div>;
  if (!post) return <div className="page-container">Post not found.</div>;

  return (
    <div className="page-container">
      <div className="card" style={{ maxWidth: 800 }}>
        <div className="post-meta">
          By <b>{post.author?.name || 'Unknown'}</b> &middot; {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <h1 style={{ fontSize: '2.2em', marginBottom: '0.5em' }}>{post.title}</h1>
        <div style={{ fontSize: '1.18em', lineHeight: '1.8', marginTop: '1.5em' }}>{post.content}</div>
      </div>
    </div>
  );
}

export default PostPage; 