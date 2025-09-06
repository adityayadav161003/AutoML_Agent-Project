import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiFile, FiX, FiArrowLeft, FiPlay } from 'react-icons/fi';
import axios from 'axios';

const ModelBuilder: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && (file.type === 'text/csv' || file.name.endsWith('.csv'))) {
      setUploadedFile(file);
    } else {
      alert('Please upload a CSV file');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    maxFiles: 1,
  });

  const handleBuildModel = async () => {
    if (!uploadedFile || !query.trim()) {
      alert('Please upload a file and enter your query');
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    
    // Simulate processing steps
    const steps = [
      'Analyzing dataset...',
      'Preprocessing data...',
      'Selecting optimal algorithm...',
      'Training model...',
      'Evaluating performance...',
      'Generating results...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i]);
      setProgress(((i + 1) / steps.length) * 100);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Mock API call - replace with actual endpoint
    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('query', query);
      
      // const response = await axios.post('/api/build-model', formData);
      // const jobId = response.data.jobId;
      
      // Mock response
      const jobId = Date.now().toString();
      navigate(`/results/${jobId}`);
    } catch (error) {
      console.error('Error building model:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/home')}
            className="glassmorphism glassmorphism-hover rounded-lg p-3 text-white mr-4"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">Build Your Model</h1>
            <p className="text-gray-300">Upload your data and describe your goals</p>
          </div>
        </div>

        {/* File Upload */}
        <div className="glassmorphism rounded-2xl p-8 mb-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Upload Dataset</h2>
          
          {!uploadedFile ? (
            <div
              {...getRootProps()}
              className={`file-upload-area cursor-pointer ${
                isDragActive ? 'drag-over' : ''
              }`}
            >
              <input {...getInputProps()} />
              <FiUpload className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <p className="text-white text-lg mb-2">
                {isDragActive ? 'Drop your CSV file here' : 'Drag & drop your CSV file'}
              </p>
              <p className="text-gray-400">or click to browse</p>
            </div>
          ) : (
            <div className="glassmorphism rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <FiFile className="w-8 h-8 text-blue-400 mr-3" />
                <div>
                  <p className="text-white font-medium">{uploadedFile.name}</p>
                  <p className="text-gray-400 text-sm">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="text-red-400 hover:text-red-300 p-2"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Query Input */}
        <div className="glassmorphism rounded-2xl p-8 mb-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Describe Your Goal</h2>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., 'Predict house prices based on location, size, and features' or 'Classify customer churn based on usage patterns'"
            className="w-full h-32 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <p className="text-gray-400 text-sm mt-2">
            Describe what you want to predict, classify, or analyze in natural language
          </p>
        </div>

        {/* Build Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBuildModel}
            disabled={!uploadedFile || !query.trim() || isProcessing}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiPlay className="inline-block mr-2" />
            {isProcessing ? 'Processing...' : 'Build Model'}
          </motion.button>
        </div>

        {/* Processing Animation */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glassmorphism rounded-2xl p-8 mt-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Processing Your Model</h3>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                  <span>{currentStep}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="progress-bar">
                  <motion.div
                    className="progress-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Animated Dots */}
              <div className="flex justify-center space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-blue-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ModelBuilder;