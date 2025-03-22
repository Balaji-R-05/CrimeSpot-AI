import React from 'react';
import { Link } from 'react-router-dom';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

function AnalyticsPage() {
  return (
    <div className="analytics-page">
      <nav className="page-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/map" className="nav-link">View Map</Link>
        <Link to="/report" className="nav-link">Report Crime</Link>
      </nav>
      <AnalyticsDashboard />
    </div>
  );
}

export default AnalyticsPage;