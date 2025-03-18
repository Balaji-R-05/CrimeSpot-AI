import React, { useState } from 'react';
import './CommunityForum.css';

function CommunityForum() {
  const [selectedArea, setSelectedArea] = useState('all');
  const [posts, setPosts] = useState([
    {
      id: 1,
      area: 'Anna Nagar',
      title: 'Monthly Neighborhood Watch Meeting',
      author: 'Community Leader',
      content: 'Join us for our monthly neighborhood watch meeting this Saturday...',
      date: '2024-02-15',
      comments: 5
    },
    {
      id: 2,
      area: 'T Nagar',
      title: 'Street Light Maintenance Update',
      author: 'Local Coordinator',
      content: 'The municipal corporation will be conducting maintenance...',
      date: '2024-02-14',
      comments: 3
    }
  ]);

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    area: 'Anna Nagar'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      id: posts.length + 1,
      ...newPost,
      date: new Date().toISOString().split('T')[0],
      author: 'User',
      comments: 0
    };
    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', area: 'Anna Nagar' });
  };

  return (
    <div className="community-forum">
      <div className="forum-filters">
        <select 
          value={selectedArea} 
          onChange={(e) => setSelectedArea(e.target.value)}
        >
          <option value="all">All Areas</option>
          <option value="Anna Nagar">Anna Nagar</option>
          <option value="T Nagar">T Nagar</option>
          <option value="Mylapore">Mylapore</option>
        </select>
      </div>

      <div className="create-post">
        <h3>Create New Post</h3>
        <form onSubmit={handleSubmit}>
          <select
            value={newPost.area}
            onChange={(e) => setNewPost({...newPost, area: e.target.value})}
          >
            <option value="Anna Nagar">Anna Nagar</option>
            <option value="T Nagar">T Nagar</option>
            <option value="Mylapore">Mylapore</option>
          </select>
          <input
            type="text"
            placeholder="Post Title"
            value={newPost.title}
            onChange={(e) => setNewPost({...newPost, title: e.target.value})}
            required
          />
          <textarea
            placeholder="Post Content"
            value={newPost.content}
            onChange={(e) => setNewPost({...newPost, content: e.target.value})}
            required
          />
          <button type="submit">Create Post</button>
        </form>
      </div>

      <div className="forum-posts">
        {posts
          .filter(post => selectedArea === 'all' || post.area === selectedArea)
          .map(post => (
            <div key={post.id} className="forum-post">
              <h3>{post.title}</h3>
              <div className="post-meta">
                <span>{post.area}</span>
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>
              <p>{post.content}</p>
              <div className="post-actions">
                <button>{post.comments} Comments</button>
                <button>Share</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CommunityForum;