import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminDashboard from './components/admin/AdminDashboard';
import WebsiteBuilder from './components/builder/WebsiteBuilder';
import UserPortal from './components/user/UserPortal';
import Login from './components/auth/Login';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
              <Route path="/builder" element={<WebsiteBuilder />} />
              <Route path="/user/:userId" element={<UserPortal />} />
            </Routes>
          </div>
        </Router>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;