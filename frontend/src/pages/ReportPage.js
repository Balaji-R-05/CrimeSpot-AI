import React from 'react';
import { Link } from 'react-router-dom';
import CrimeReportForm from '../components/CrimeReportForm';
import './ReportPage.css';

function ReportPage() {
  return (
    <div className="report-page">
      <nav className="page-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/map" className="nav-link">View Map</Link>
        <Link to="/community" className="nav-link">Community</Link>
      </nav>
      <h1>Report a Crime</h1>
      <CrimeReportForm />
    </div>
  );
}

export default ReportPage;