import React, { useState } from 'react';
import './SafetyTips.css';

function SafetyTips() {
  const [tips, setTips] = useState([
    {
      id: 1,
      title: "Street Safety at Night",
      content: "Always stay in well-lit areas and avoid walking alone at night. Keep emergency contacts readily available.",
      author: "Safety Officer",
      likes: 15
    },
    {
      id: 2,
      title: "Home Security Basics",
      content: "Ensure all doors and windows are properly locked. Install security cameras if possible.",
      author: "Security Expert",
      likes: 23
    }
  ]);

  const [newTip, setNewTip] = useState({
    title: '',
    content: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const tip = {
      id: tips.length + 1,
      ...newTip,
      author: 'User',
      likes: 0
    };
    setTips([tip, ...tips]);
    setNewTip({ title: '', content: '' });
  };

  return (
    <div className="safety-tips">
      <div className="create-tip">
        <h3>Share a Safety Tip</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tip Title"
            value={newTip.title}
            onChange={(e) => setNewTip({...newTip, title: e.target.value})}
            required
          />
          <textarea
            placeholder="Tip Content"
            value={newTip.content}
            onChange={(e) => setNewTip({...newTip, content: e.target.value})}
            required
          />
          <button type="submit">Share Tip</button>
        </form>
      </div>

      <div className="tips-list">
        {tips.map(tip => (
          <div key={tip.id} className="tip-card">
            <h3>{tip.title}</h3>
            <p>{tip.content}</p>
            <div className="tip-meta">
              <span>By {tip.author}</span>
              <button className="like-button">
                👍 {tip.likes} Likes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SafetyTips;