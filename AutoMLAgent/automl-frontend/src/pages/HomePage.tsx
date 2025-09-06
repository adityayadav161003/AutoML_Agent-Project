import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiSettings, FiUser, FiMail, FiLogOut, FiUpload, FiPlay } from 'react-icons/fi';
import LightRays from '../components/backgrounds/LightRays';
import ResponsiveButton from '../components/ui/ResponsiveButton';

const HomePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleBuildModel = () => {
    navigate('/build');
  };

  return (
    <div className="min-h-screen p-6 relative">
      {/* LightRays Background */}
      <LightRays />
      {/* Header */}
      <header className="glassmorphism rounded-2xl p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name}!</h1>
            <p className="text-gray-300">Ready to build your next ML model?</p>
          </div>
          <div className="flex items-center space-x-4">
            <ResponsiveButton 
              variant="ghost" 
              size="sm" 
              className="glassmorphism glassmorphism-hover"
              aria-label="Settings"
              tabIndex={1}
            >
              <FiSettings className="w-5 h-5" />
            </ResponsiveButton>
            <ResponsiveButton 
              variant="ghost" 
              size="sm" 
              className="glassmorphism glassmorphism-hover"
              aria-label="Profile"
              tabIndex={2}
            >
              <FiUser className="w-5 h-5" />
            </ResponsiveButton>
            <ResponsiveButton 
              onClick={logout}
              variant="ghost" 
              size="sm" 
              className="glassmorphism glassmorphism-hover"
              aria-label="Logout"
              tabIndex={3}
            >
              <FiLogOut className="w-5 h-5" />
            </ResponsiveButton>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Build Model Section */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glassmorphism rounded-2xl p-8 text-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-6"
            >
              <FiUpload className="w-24 h-24 text-blue-400 mx-auto mb-4" />
            </motion.div>
            
            <h2 className="text-4xl font-bold text-white mb-4">Build Your Model</h2>
            <p className="text-xl text-gray-300 mb-8">
              Upload your data and describe what you want to achieve using natural language.
              Our AI will handle the rest.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ResponsiveButton
                onClick={handleBuildModel}
                variant="primary"
                size="lg"
                className="text-xl shadow-lg hover:shadow-xl"
                leftIcon={<FiPlay />}
                tabIndex={4}
              >
                BUILD YOUR MODEL
              </ResponsiveButton>
            </motion.div>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="glassmorphism rounded-xl p-6 text-center">
              <h3 className="text-3xl font-bold text-blue-400">0</h3>
              <p className="text-gray-300">Models Built</p>
            </div>
            <div className="glassmorphism rounded-xl p-6 text-center">
              <h3 className="text-3xl font-bold text-purple-400">0</h3>
              <p className="text-gray-300">Datasets Processed</p>
            </div>
            <div className="glassmorphism rounded-xl p-6 text-center">
              <h3 className="text-3xl font-bold text-indigo-400">0</h3>
              <p className="text-gray-300">Downloads</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="glassmorphism rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <p className="text-gray-400 text-center py-4">No recent activity</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="glassmorphism rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <div className="space-y-3">
              <ResponsiveButton
                variant="ghost"
                size="md"
                fullWidth
                className="text-left glassmorphism glassmorphism-hover flex items-center"
                leftIcon={<FiMail />}
                tabIndex={5}
              >
                Contact Support
              </ResponsiveButton>
              <ResponsiveButton
                variant="ghost"
                size="md"
                fullWidth
                className="text-left glassmorphism glassmorphism-hover flex items-center"
                leftIcon={<FiSettings />}
                tabIndex={6}
              >
                Settings
              </ResponsiveButton>
              <ResponsiveButton
                variant="ghost"
                size="md"
                fullWidth
                className="text-left glassmorphism glassmorphism-hover flex items-center"
                leftIcon={<FiUser />}
                tabIndex={7}
              >
                Profile
              </ResponsiveButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;