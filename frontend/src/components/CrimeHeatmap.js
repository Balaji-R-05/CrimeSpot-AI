import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const CHENNAI_COORDINATES = [13.0827, 80.2707];

const CrimeHeatmap = () => {
  const [crimeData, setCrimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('week');
  const { token } = useAuth();

  const fetchCrimeData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/reports/nearby`,
        {
          params: {
            lat: CHENNAI_COORDINATES[0],
            lon: CHENNAI_COORDINATES[1],
            radius: 5000,
            timeRange
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setCrimeData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch crime data');
      console.error('Error fetching crime data:', err);
    } finally {
      setLoading(false);
    }
  }, [timeRange, token]);

  useEffect(() => {
    fetchCrimeData();
    const interval = setInterval(fetchCrimeData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [fetchCrimeData]);

  const getCircleColor = (crimeType) => {
    const colors = {
      theft: '#ff0000',
      assault: '#ff4500',
      vandalism: '#ffa500',
      default: '#ff8c00'
    };
    return colors[crimeType] || colors.default;
  };

  if (loading) return <div className="loading">Loading crime data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="crime-heatmap">
      <div className="map-controls">
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
          className="time-range-select"
        >
          <option value="day">Last 24 Hours</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
        </select>
      </div>

      <MapContainer
        center={CHENNAI_COORDINATES}
        zoom={12}
        style={{ height: '600px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {crimeData.map((crime, index) => (
          <Circle
            key={index}
            center={[crime.location.latitude, crime.location.longitude]}
            radius={100}
            pathOptions={{
              color: getCircleColor(crime.crime_type),
              fillColor: getCircleColor(crime.crime_type),
              fillOpacity: 0.6
            }}
          >
            <Popup>
              <div className="crime-popup">
                <h3>{crime.crime_type}</h3>
                <p>{crime.description}</p>
                <p>Status: {crime.status}</p>
                <p>Reported: {new Date(crime.date_time).toLocaleString()}</p>
              </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
};

export default CrimeHeatmap;

