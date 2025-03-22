import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>CrimeSpot: AI-Powered Crime Detection</h1>
          <p className="hero-subtitle">Making Chennai safer through community reporting and AI-driven crime analysis</p>
          
          <div className="button-container">
            <Link to="/report" className="nav-button">
              Report a Crime
            </Link>
            <Link to="/map" className="nav-button">
              View Crime Map
            </Link>
            <Link to="/analytics" className="nav-button">
              Analytics Dashboard
            </Link>
            <Link to="/community" className="nav-button">
              Community Hub
            </Link>
          </div>
        </div>
      </header>

      <main className="home-content">
        <section className="about-section">
          <h2>About CrimeSpot</h2>
          <div className="features-grid">
            <div className="feature-card">
              <img src="https://placehold.co/600x400/1e40af/ffffff?text=Real-time+Reporting" alt="Real-time Reporting" />
              <h3>Real-time Reporting</h3>
              <p>Report incidents as they happen and contribute to community safety</p>
            </div>
            <div className="feature-card">
              <img src="https://placehold.co/600x400/1e40af/ffffff?text=AI+Analysis" alt="AI Analysis" />
              <h3>AI Analysis</h3>
              <p>Advanced AI algorithms analyze crime patterns to predict high-risk areas</p>
            </div>
            <div className="feature-card">
              <img src="https://placehold.co/600x400/1e40af/ffffff?text=Interactive+Map" alt="Interactive Map" />
              <h3>Interactive Map</h3>
              <p>Visual representation of crime hotspots across Chennai</p>
            </div>
            <div className="feature-card">
              <img src="https://placehold.co/600x400/1e40af/ffffff?text=Community+Safety" alt="Community Safety" />
              <h3>Community Safety</h3>
              <p>Make informed decisions about safe routes and areas</p>
            </div>
          </div>
        </section>

        <section className="statistics-section">
          <h2>Crime Statistics Dashboard</h2>
          <div className="statistics-grid">
            <div className="stat-card">
              <img src="https://placehold.co/300x200/1e40af/ffffff?text=Statistics" alt="Monthly Statistics" />
              <h3>Monthly Reports</h3>
              <p className="stat-number">250+</p>
              <p>Cases Reported</p>
            </div>
            <div className="stat-card">
              <img src="https://placehold.co/300x200/1e40af/ffffff?text=Response" alt="Response Time" />
              <h3>Average Response</h3>
              <p className="stat-number">15 min</p>
              <p>Response Time</p>
            </div>
            <div className="stat-card">
              <img src="https://placehold.co/300x200/1e40af/ffffff?text=Resolution" alt="Case Resolution" />
              <h3>Case Resolution</h3>
              <p className="stat-number">85%</p>
              <p>Success Rate</p>
            </div>
          </div>
        </section>

        <section className="emergency-section">
          <h2>Emergency Contact Numbers</h2>
          <div className="emergency-grid">
            <div className="emergency-card">
              <img src="https://placehold.co/200x200/1e40af/ffffff?text=Police" alt="Police" />
              <h3>Police Control Room</h3>
              <p className="phone-number">100</p>
              <p>24/7 Emergency Response</p>
            </div>
            <div className="emergency-card">
              <img src="https://placehold.co/200x200/1e40af/ffffff?text=Chennai+Police" alt="Chennai Police" />
              <h3>Chennai Police</h3>
              <p className="phone-number">044-2345-2345</p>
              <p>Greater Chennai Police HQ</p>
            </div>
            <div className="emergency-card">
              <img src="https://placehold.co/200x200/1e40af/ffffff?text=Women+Helpline" alt="Women Helpline" />
              <h3>Women Helpline</h3>
              <p className="phone-number">1091</p>
              <p>Women's Safety & Assistance</p>
            </div>
            <div className="emergency-card">
              <img src="https://placehold.co/200x200/1e40af/ffffff?text=Ambulance" alt="Ambulance" />
              <h3>Ambulance</h3>
              <p className="phone-number">108</p>
              <p>Medical Emergency</p>
            </div>
          </div>
        </section>

        <section className="safety-tips">
          <h2>Safety Tips</h2>
          <div className="tips-container">
            <div className="tip">
              <img src="https://placehold.co/400x300/1e40af/ffffff?text=Stay+Aware" alt="Stay Aware" />
              <h3>Stay Aware</h3>
              <p>Always be aware of your surroundings, especially at night</p>
            </div>
            <div className="tip">
              <img src="https://placehold.co/400x300/1e40af/ffffff?text=Document" alt="Document Everything" />
              <h3>Document Everything</h3>
              <p>Keep records of incidents with dates, times, and locations</p>
            </div>
            <div className="tip">
              <img src="https://placehold.co/400x300/1e40af/ffffff?text=Travel+Safe" alt="Travel Safe" />
              <h3>Travel Safe</h3>
              <p>Use well-lit and populated routes, especially during night time</p>
            </div>
          </div>
        </section>

        <section className="police-stations">
          <h2>Major Police Stations in Chennai</h2>
          <div className="stations-grid">
            <div className="station-card">
              <img src="https://placehold.co/400x300/1e40af/ffffff?text=Anna+Nagar" alt="Anna Nagar Police Station" />
              <h3>Anna Nagar</h3>
              <p>2nd Avenue, Anna Nagar</p>
              <p>044-2626-1488</p>
            </div>
            <div className="station-card">
              <img src="https://placehold.co/400x300/1e40af/ffffff?text=T+Nagar" alt="T Nagar Police Station" />
              <h3>T Nagar</h3>
              <p>Pondy Bazaar, T Nagar</p>
              <p>044-2434-0000</p>
            </div>
            <div className="station-card">
              <img src="https://placehold.co/400x300/1e40af/ffffff?text=Mylapore" alt="Mylapore Police Station" />
              <h3>Mylapore</h3>
              <p>PS Sivaswamy Salai</p>
              <p>044-2345-2345</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>© 2024 CrimeSpot. For emergencies, always dial 100</p>
        <p>A community safety initiative for Chennai</p>
      </footer>
    </div>
  );
}

export default Home;
