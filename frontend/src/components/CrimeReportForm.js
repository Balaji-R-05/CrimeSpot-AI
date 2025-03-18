import React, { useState } from 'react';
import axios from 'axios';
import './CrimeReportForm.css';

const CrimeReportForm = () => {
  const [formData, setFormData] = useState({
    crimeType: '',
    location: {
      latitude: '',
      longitude: ''
    },
    description: '',
    dateTime: ''
  });

  const [submitStatus, setSubmitStatus] = useState({
    message: '',
    isError: false
  });

  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'latitude' || name === 'longitude') {
      setFormData(prevState => ({
        ...prevState,
        location: {
          ...prevState.location,
          [name]: value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prevState => ({
            ...prevState,
            location: {
              latitude: position.coords.latitude.toString(),
              longitude: position.coords.longitude.toString()
            }
          }));
          setIsGettingLocation(false);
        },
        (error) => {
          setSubmitStatus({
            message: 'Failed to get location. Please enter manually.',
            isError: true
          });
          setIsGettingLocation(false);
        }
      );
    } else {
      setSubmitStatus({
        message: 'Geolocation is not supported by your browser',
        isError: true
      });
      setIsGettingLocation(false);
    }
  };

  const validateForm = () => {
    if (!formData.crimeType) return 'Please select a crime type';
    if (!formData.location.latitude || !formData.location.longitude) return 'Please provide location';
    if (!formData.description) return 'Please provide a description';
    if (!formData.dateTime) return 'Please provide date and time';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setSubmitStatus({
        message: validationError,
        isError: true
      });
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/report-crime', formData);
      setSubmitStatus({
        message: 'Crime reported successfully!',
        isError: false
      });
      setFormData({
        crimeType: '',
        location: {
          latitude: '',
          longitude: ''
        },
        description: '',
        dateTime: ''
      });
    } catch (error) {
      setSubmitStatus({
        message: error.response?.data?.detail || 'Failed to submit report. Please try again.',
        isError: true
      });
    }
  };

  return (
    <div className="crime-report-container">
      <form className="crime-report-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="crimeType">Type of Crime</label>
          <select
            id="crimeType"
            name="crimeType"
            value={formData.crimeType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select crime type</option>
            <option value="theft">Theft</option>
            <option value="assault">Assault</option>
            <option value="vandalism">Vandalism</option>
            <option value="burglary">Burglary</option>
            <option value="harassment">Harassment</option>
            <option value="fraud">Fraud</option>
            <option value="accident">Accident</option>
          </select>
        </div>

        <div className="form-group">
          <label>Location</label>
          <div className="location-fields">
            <div className="location-inputs">
              <div>
                <input
                  type="text"
                  name="latitude"
                  placeholder="Latitude"
                  value={formData.location.latitude}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="longitude"
                  placeholder="Longitude"
                  value={formData.location.longitude}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <button 
              type="button" 
              className="get-location-btn"
              onClick={getCurrentLocation}
              disabled={isGettingLocation}
            >
              {isGettingLocation ? 'Getting Location...' : 'Get Current Location'}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Provide details about the incident"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateTime">Date and Time</label>
          <input
            type="datetime-local"
            id="dateTime"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleInputChange}
            required
          />
        </div>

        {submitStatus.message && (
          <div className={`status-message ${submitStatus.isError ? 'error' : 'success'}`}>
            {submitStatus.message}
          </div>
        )}

        <button type="submit" className="submit-btn">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default CrimeReportForm;