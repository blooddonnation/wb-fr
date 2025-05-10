import React from 'react';
import 'leaflet/dist/leaflet.css';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/admin/Dashboard';
import Donors from './pages/admin/Donors';
import Appointments from './pages/admin/Appointments';
import AddEvent from './pages/admin/AddEvent';
import  CentersMap from './pages/admin/AddCenters';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="events" element={<Events />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="donors" element={<Donors />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="add-event" element={<AddEvent />} />
        <Route path="add-center" element={<CentersMap />} />
      </Route>
    </Routes>
  );
}

export default App;