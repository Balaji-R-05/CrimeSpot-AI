import React, { useState, useEffect } from 'react';
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
    dateTime: '',
    images: [],
    audioDescription: '',
    isAnonymous: false,
    reportTemplate: {}
  });

  const [template, setTemplate] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (formData.crimeType) {
      fetchTemplate(formData.crimeType);
    }
  }, [formData.crimeType]);

  const fetchTemplate = async (crimeType) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/report-templates/${crimeType}`);
      setTemplate(response.data);
      setFormData(prev => ({
        ...prev,
        reportTemplate: Object.keys(response.data).reduce((acc, key) => {
          acc[key] = '';
          return acc;
        }, {})
      }));
    } catch (error) {
      console.error('Error fetching template:', error);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, reader.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks = [];

      recorder.ondataavailable = (e) => audioChunks.push(e.data);
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks);
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            audioDescription: reader.result
          }));
        };
        reader.readAsDataURL(audioBlob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setIsRecording(false);
  };

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
          setSubmitStatus(null);
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
    try {
      const response = await axios.post('http://127.0.0.1:8000/report-crime', formData);
      alert(`Report submitted successfully! Report ID: ${response.data.reportId}`);
      // Reset form
      setFormData({
        crimeType: '',
        location: { latitude: '', longitude: '' },
        description: '',
        dateTime: '',
        images: [],
        audioDescription: '',
        isAnonymous: false,
        reportTemplate: {}
      });
    } catch (error) {
      alert('Error submitting report: ' + error.message);
    }
  };

  return (
    <div className="crime-report-container">
      {submitStatus && (
        <div className={`status-message ${submitStatus.isError ? 'error' : 'success'}`}>
          {submitStatus.message}
        </div>
      )}
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

        {/* Anonymous Reporting Option */}
        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.isAnonymous}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                isAnonymous: e.target.checked
              }))}
            />
            Report Anonymously
          </label>
        </div>

        {/* Dynamic Template Fields */}
        {Object.entries(template).map(([field, type]) => (
          <div className="form-group" key={field}>
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            {type.startsWith('select:') ? (
              <select
                id={field}
                value={formData.reportTemplate[field]}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  reportTemplate: {
                    ...prev.reportTemplate,
                    [field]: e.target.value
                  }
                }))}
              >
                <option value="">Select {field}</option>
                {type.split(':')[1].split(',').map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={type === 'number' ? 'number' : 'text'}
                id={field}
                value={formData.reportTemplate[field]}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  reportTemplate: {
                    ...prev.reportTemplate,
                    [field]: e.target.value
                  }
                }))}
              />
            )}
          </div>
        ))}

        {/* Image Upload */}
        <div className="form-group">
          <label>Upload Images/Evidence</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
          {formData.images.length > 0 && (
            <div className="image-previews">
              {formData.images.map((img, index) => (
                <img key={index} src={img} alt={`Evidence ${index + 1}`} />
              ))}
            </div>
          )}
        </div>

        {/* Audio Recording */}
        <div className="form-group">
          <label>Audio Description</label>
          <div className="audio-controls">
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className={isRecording ? 'recording' : ''}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            {formData.audioDescription && (
              <audio controls src={formData.audioDescription} />
            )}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default CrimeReportForm;


