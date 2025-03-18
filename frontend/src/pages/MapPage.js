import React from 'react';
import { Link } from 'react-router-dom';
import CrimeHeatmap from '../components/CrimeHeatmap';

function MapPage() {
  return (
    <div className="map-page">
      <nav className="page-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/report" className="nav-link">Report Crime</Link>
      </nav>
      <h1>Crime Heatmap</h1>
      <CrimeHeatmap />
    </div>
  );
}

export default MapPage;