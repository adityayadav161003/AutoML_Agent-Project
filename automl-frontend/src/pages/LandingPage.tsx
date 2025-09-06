import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Galaxy from '../components/backgrounds/Galaxy';
import ResponsiveButton from '../components/ui/ResponsiveButton';

const LandingPage: React.FC = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Galaxy Background */}
      <Galaxy />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-white"
        >
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AutoML Agent
          </span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4"
        >
          <ResponsiveButton
            onClick={() => {
              setShowAuth(true);
              setIsLogin(true);
            }}
            variant="outline"
            size="md"
            tabIndex={1}
          >
            Login
          </ResponsiveButton>
          <ResponsiveButton
            onClick={() => {
              setShowAuth(true);
              setIsLogin(false);
            }}
            variant="primary"
            size="md"
            tabIndex={2}
          >
            Register
          </ResponsiveButton>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-8 pt-20 pb-32">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AutoML Agent
              </span>
              <br />
              <span className="text-4xl md:text-5xl font-light">
                Democratizing Machine Learning
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Build powerful machine learning models using simple natural language commands. 
              No coding required - just describe what you want to achieve and let AI do the rest.
            </p>

            <ResponsiveButton 
              onClick={() => {
                setShowAuth(true);
                setIsLogin(false);
              }}
              variant="primary"
              size="lg"
              tabIndex={3}
            >
              Start Your ML Journey
            </ResponsiveButton>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-24 grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: '📊',
                title: 'Upload Data',
                description: 'Simply drag and drop your datasets in any format',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: '🎯',
                title: 'Describe Goals',
                description: 'Use natural language to specify what you want to predict',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: '🚀',
                title: 'Get Results',
                description: 'Download your trained model with full documentation',
                color: 'from-green-500 to-emerald-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -10 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className={`text-xl font-bold text-white mb-2 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Product Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-24"
          >
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Describe Your Goal</h3>
                    <p className="text-gray-400">Tell us what you want to predict or classify in plain English</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Upload Your Data</h3>
                    <p className="text-gray-400">Drag and drop your CSV, Excel, or JSON files</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Get Your Model</h3>
                    <p className="text-gray-400">Download your trained model with performance metrics</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2">Example prompt:</div>
                  <div className="text-gray-300">"I want to predict customer churn based on their purchase history and demographics"</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAuth(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl max-w-md w-full border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <ResponsiveButton
                  onClick={() => setShowAuth(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white text-2xl"
                  aria-label="Close"
                  tabIndex={0}
                >
                  ×
                </ResponsiveButton>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required={!isLogin}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                      tabIndex={1}
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                    tabIndex={2}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                    tabIndex={3}
                  />
                </div>
                
                <ResponsiveButton
                  type="submit"
                  disabled={loading}
                  isLoading={loading}
                  loadingText="Processing..."
                  variant="primary"
                  size="lg"
                  fullWidth
                  tabIndex={4}
                >
                  {isLogin ? 'Sign In' : 'Sign Up'}
                </ResponsiveButton>
              </form>
              
              <p className="text-center text-gray-300 mt-4">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <ResponsiveButton
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  variant="ghost"
                  size="sm"
                  className="text-blue-400 hover:text-blue-300 font-semibold ml-1"
                  tabIndex={5}
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </ResponsiveButton>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;