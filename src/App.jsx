import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import AddTool from './pages/AddTool';
import ToolDetail from './pages/ToolDetail';
import Reservations from './pages/Reservations';
import ManageReservations from './pages/ManageReservations';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ajouter" element={<AddTool />} />
        <Route path="/outil/:id" element={<ToolDetail />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/demandes" element={<ManageReservations />} />
        <Route path="/connexion" element={<Login />} />
      </Routes>
    </Router>
  );
}