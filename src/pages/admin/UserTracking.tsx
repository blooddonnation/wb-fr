import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import L, { LeafletMouseEvent, Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { BloodCenter } from '../../Models/Center';
import '../../Style/leaflet.css'

// Add new interface for user position data
interface UserPosition {
  id: string;
  deviceId: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

const CentersMap = () => {
  const [hospitalMarkers, setHospitalMarkers] = useState<BloodCenter[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<BloodCenter | null>(null);
  const [newCenterLocation, setNewCenterLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [formData, setFormData] = useState<{ nameCenter: string; idadmin: number }>({ nameCenter: '', idadmin: 0 });
  const mapRef = useRef<any>(null);
  // New state for user positions
  const [userPositions, setUserPositions] = useState<UserPosition[]>([]);

  useEffect(() => {
    fetchHospitals();
    fetchUserPositions();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get('http://localhost:8083/api/centers');
      if (response.data) {
        setHospitalMarkers(response.data);
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      setError("Failed to load hospitals. Please try again later.");
    }
  };

  // New function to fetch user positions
  const fetchUserPositions = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/positions');
      if (response.data) {
        setUserPositions(response.data);
        console.log(userPositions);
      }
    } catch (error) {
      console.error("Error fetching user positions:", error);
      setError("Failed to load user positions. Please try again later.");
    }
  };

  const handleMapClick = (e: LeafletMouseEvent) => {
    const clickedLat = e.latlng.lat;
    const clickedLng = e.latlng.lng;

    const markerExists = hospitalMarkers.some(
      (c) => Math.abs(c.latitude - clickedLat) < 0.001 && Math.abs(c.longitude - clickedLng) < 0.001
    );

    if (!markerExists) {
      setNewCenterLocation({ lat: clickedLat, lng: clickedLng });
      setSelectedCenter(null);
      setFormData({ nameCenter: '', idadmin: 0 });
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  const handleAddCenter = async () => {
    if (!newCenterLocation) return;

    const newCenter = {
      nameCenter: formData.nameCenter,
      idadmin: formData.idadmin,
      latitude: newCenterLocation.lat,
      longitude: newCenterLocation.lng
    };

    try {
      const response = await axios.post('http://localhost:8083/api/centers', newCenter);
      setHospitalMarkers((prev) => [...prev, response.data]);
      setNewCenterLocation(null);
    } catch (error) {
      console.error("Failed to add center:", error);
    }
  };

  const handleUpdateCenter = async () => {
    if (!selectedCenter) return;

    try {
      await axios.put(`http://localhost:8083/api/centers/${selectedCenter.id}`, selectedCenter);
      setHospitalMarkers((prev) =>
        prev.map((c) => (c.id === selectedCenter.id ? selectedCenter : c))
      );
      setSelectedCenter(null);
    } catch (error) {
      console.error("Failed to update center:", error);
    }
  };

  const handleDeleteCenter = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8083/api/centers/${id}`);
      setHospitalMarkers((prev) => prev.filter((c) => c.id !== id));
      setSelectedCenter(null);
    } catch (error) {
      console.error("Failed to delete center:", error);
    }
  };

  // Update custom icon for user markers to use a red person SVG icon
  const userIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png', // True red user icon
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  return (
    <div className="relative h-screen w-full">
      {error && <div className="error-message">{error}</div>}

      <MapContainer
        center={currentLocation ? [currentLocation.lat, currentLocation.lng] : [31.7917, -7.0926]}
        zoom={currentLocation ? 12 : 6}
        style={{ height: '100vh', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />

        {/* User's current location */}
        {currentLocation && (
          <Marker position={[currentLocation.lat, currentLocation.lng]}>
            <Popup>Your Location</Popup>
          </Marker>
        )}

        {/* Existing hospital markers */}
        {hospitalMarkers.map((hospital) => (
          <Marker
            key={hospital.id}
            position={[hospital.latitude, hospital.longitude]}
            eventHandlers={{
              click: () => {
                setSelectedCenter(hospital);
                setNewCenterLocation(null);
              }
            }}
          >
            <Popup>{hospital.nameCenter}</Popup>
          </Marker>
        ))}

        {/* New user position markers with custom icon */}
        {userPositions.map((user) => (
          <Marker
            key={user.id}
            position={[user.latitude, user.longitude]}
            icon={userIcon}
            eventHandlers={{
              click: () => {
                // Optionally handle user marker click
              }
            }}
          >
            <Popup>User: {user.deviceId}</Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Add New Center Form */}
      {newCenterLocation && (
        <div className="form-popup">
          <h3>Add New Center</h3>
          <h4>Name Center</h4>
          <input
            placeholder="Name Center"
            value={formData.nameCenter}
            onChange={(e) => setFormData({ ...formData, nameCenter: e.target.value })}
          />
          <h4>Id</h4>
          <input
            placeholder="Admin ID"
            type="number"
            value={formData.idadmin}
            onChange={(e) => setFormData({ ...formData, idadmin: +e.target.value })}
          />
          <button onClick={handleAddCenter}>Add Center</button>
        </div>
      )}

      {/* Edit Center Form */}
      {selectedCenter && (
        <div className="form-popup">
          <h3>Edit Center</h3>
          <h4>Nom</h4>
          <input
            value={selectedCenter.nameCenter}
            onChange={(e) =>
              setSelectedCenter({ ...selectedCenter, nameCenter: e.target.value })
            }
          />
          <h4>Localisation</h4>
          <input
            type="number"
            value={selectedCenter.latitude}
            onChange={(e) =>
              setSelectedCenter({ ...selectedCenter, latitude: parseFloat(e.target.value) })
            }
          />
          <input
            type="number"
            value={selectedCenter.longitude}
            onChange={(e) =>
              setSelectedCenter({ ...selectedCenter, longitude: parseFloat(e.target.value) })
            }
          />
          <h4>id Admin </h4>
          <input
            type="number"
            value={selectedCenter.idadmin}
            onChange={(e) =>
              setSelectedCenter({ ...selectedCenter, idadmin: parseInt(e.target.value) })
            }
          />
          <button onClick={handleUpdateCenter}>Update</button>
          <button onClick={() => handleDeleteCenter(selectedCenter.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default CentersMap;
