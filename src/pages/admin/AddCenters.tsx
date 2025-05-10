import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { BloodCenter } from '../../Models/Center';

const CentersMap = () => {
  const [hospitalMarkers, setHospitalMarkers] = useState<BloodCenter[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    // Fetch hospitals from the backend
    fetchHospitals();

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      L.control.locate().addTo(map); // Location button
      L.control.scale().addTo(map);  // Scale control
    }
  }, [mapRef]);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/centers');
      if (response.data) {
        setHospitalMarkers(response.data);
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      setError("Failed to load hospitals. Please try again later.");
    }
  };

  return (
    <div className="map-container">
      {error && <div className="error-message">{error}</div>}

      <MapContainer
        center={currentLocation ? [currentLocation.lat, currentLocation.lng] : [31.7917, -7.0926]}
        zoom={currentLocation ? 12 : 6}
        style={{ height: '100vh', width: '100%' }}
        whenReady={() => {}}
        ref={mapRef}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Display user's current location */}
        {currentLocation && (
          <Marker position={currentLocation}>
            <Popup>Your Location</Popup>
          </Marker>
        )}

        {/* Display hospital markers */}
        {hospitalMarkers.map((hospital) => (
          <Marker key={hospital.id} position={[hospital.latitude, hospital.longitude]}>
            <Popup>{hospital.nameCenter}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CentersMap;
