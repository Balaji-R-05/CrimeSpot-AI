import React from 'react';
import { Link } from 'react-router-dom';
import CommunityForum from '../components/CommunityForum';
import SafetyTips from '../components/SafetyTips';
import EventCalendar from '../components/EventCalendar';
import './CommunityPage.css';

function CommunityPage() {
  return (
    <div className="community-page">
      <nav className="page-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/map" className="nav-link">View Map</Link>
        <Link to="/report" className="nav-link">Report Crime</Link>
      </nav>

      <div className="community-container">
        <h1>Community Hub</h1>
        
        <div className="community-sections">
          <section className="forum-section">
            <h2>Neighborhood Forums</h2>
            <CommunityForum />
          </section>

          <section className="safety-tips-section">
            <h2>Safety Tips & Discussions</h2>
            <SafetyTips />
          </section>

          <section className="events-section">
            <h2>Community Events</h2>
            <EventCalendar />
          </section>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;