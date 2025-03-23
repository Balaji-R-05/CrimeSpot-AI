import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapPicker = ({ onLocationSelect }) => {
  const [marker, setMarker] = useState(null);
  
  const defaultCenter = {
    lat: 13.0827, // Chennai coordinates
    lng: 80.2707
  };

  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarker({ lat, lng });
    onLocationSelect({ lat, lng });
    
    // Get address from coordinates using Geocoding service
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        onLocationSelect({
          lat,
          lng,
          address: results[0].formatted_address
        });
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
        onClick={handleMapClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapPicker;