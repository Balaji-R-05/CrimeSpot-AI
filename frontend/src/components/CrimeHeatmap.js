import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import './CrimeHeatmap.css';

const CrimeHeatmap = () => {
  const [crimeData, setCrimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('week'); // 'day', 'week', 'month', 'year'

  const fetchCrimeData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://127.0.0.1:8000/crimes?timeRange=${timeRange}`);
      setCrimeData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch crime data');
      console.error('Error fetching crime data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrimeData();
  }, [timeRange]);

  const getCircleColor = (crimeType) => {
    const colors = {
      theft: '#FF0000',
      assault: '#FF4500',
      vandalism: '#FFA500',
      burglary: '#FF6347',
      harassment: '#FF69B4',
      fraud: '#9370DB',
      accident: '#4169E1',
      other: '#808080'
    };
    return colors[crimeType] || colors.other;
  };

  const getCircleRadius = (timeRange) => {
    const radiuses = {
      day: 100,
      week: 200,
      month: 300,
      year: 400
    };
    return radiuses[timeRange] || radiuses.week;
  };

  if (loading) {
    return <div className="loading">Loading crime data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  // Chennai coordinates
  const CHENNAI_COORDINATES = [13.0827, 80.2707];
  
  return (
    <div className="heatmap-container">
      <div className="heatmap-controls">
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
          className="time-range-select"
        >
          <option value="day">Last 24 Hours</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <MapContainer
        center={CHENNAI_COORDINATES}
        zoom={12}
        scrollWheelZoom={true}
        className="crime-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {crimeData.map((crime, index) => (
          <Circle
            key={index}
            center={[parseFloat(crime.location.latitude), parseFloat(crime.location.longitude)]}
            radius={getCircleRadius(timeRange)}
            pathOptions={{
              color: getCircleColor(crime.crimeType),
              fillColor: getCircleColor(crime.crimeType),
              fillOpacity: 0.4
            }}
          >
            <Popup>
              <div className="crime-popup">
                <h3>{crime.crimeType.charAt(0).toUpperCase() + crime.crimeType.slice(1)}</h3>
                <p>{crime.description}</p>
                <p className="crime-date">{new Date(crime.dateTime).toLocaleString()}</p>
              </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>

      <div className="legend">
        <h4>Crime Types</h4>
        {Object.entries({
          theft: 'Theft',
          assault: 'Assault',
          vandalism: 'Vandalism',
          burglary: 'Burglary',
          harassment: 'Harassment',
          fraud: 'Fraud',
          accident: 'Accident',
          other: 'Other'
        }).map(([type, label]) => (
          <div key={type} className="legend-item">
            <span 
              className="legend-color" 
              style={{ backgroundColor: getCircleColor(type) }}
            ></span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrimeHeatmap;