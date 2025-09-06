import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ModelBuilder from './pages/ModelBuilder';
import ResultsPage from './pages/ResultsPage';
import { motion } from 'framer-motion';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <Routes>
          <Route 
            path="/" 
            element={user ? <Navigate to="/home" /> : <LandingPage />} 
          />
          <Route 
            path="/home" 
            element={user ? <HomePage /> : <Navigate to="/" />} 
          />
          <Route 
            path="/build" 
            element={user ? <ModelBuilder /> : <Navigate to="/" />} 
          />
          <Route 
            path="/results/:jobId" 
            element={user ? <ResultsPage /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;