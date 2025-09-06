import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { FiDownload, FiArrowLeft, FiCheckCircle, FiBarChart3, FiFileText } from 'react-icons/fi';

const ResultsPage: React.FC = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);

  // Mock results data - replace with actual API data
  const results = {
    modelType: 'Random Forest Regressor',
    accuracy: 0.87,
    rmse: 0.23,
    mae: 0.18,
    r2Score: 0.84,
    featureImportance: [
      { feature: 'Square Footage', importance: 0.35 },
      { feature: 'Location', importance: 0.28 },
      { feature: 'Bedrooms', importance: 0.18 },
      { feature: 'Bathrooms', importance: 0.12 },
      { feature: 'Year Built', importance: 0.07 }
    ],
    predictions: [
      { actual: 250000, predicted: 245000, difference: -5000 },
      { actual: 320000, predicted: 328000, difference: 8000 },
      { actual: 180000, predicted: 175000, difference: -5000 },
    ]
  };

  const handleDownload = async () => {
    setDownloading(true);
    
    // Mock download - replace with actual API call
    try {
      // In a real app, this would be: window.location.href = `/api/download/${jobId}`;
      
      // Create mock download
      const mockData = {
        ...results,
        jobId,
        timestamp: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(mockData, null, 2)], {
        type: 'application/json'
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `automl-results-${jobId}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/build')}
            className="glassmorphism glassmorphism-hover rounded-lg p-3 text-white mr-4"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">Model Results</h1>
            <p className="text-gray-300">Job ID: {jobId}</p>
          </div>
        </div>

        {/* Success Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glassmorphism rounded-2xl p-6 mb-6 flex items-center"
        >
          <FiCheckCircle className="w-8 h-8 text-green-400 mr-3" />
          <div>
            <h2 className="text-xl font-semibold text-white">Model Training Complete!</h2>
            <p className="text-gray-300">Your model has been successfully trained and evaluated.</p>
          </div>
        </motion.div>

        {/* Results Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Metrics */}
          <div className="glassmorphism rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FiBarChart3 className="mr-2" />
              Performance Metrics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-300">Accuracy:</span>
                <span className="text-white font-semibold">{(results.accuracy * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">RMSE:</span>
                <span className="text-white font-semibold">{results.rmse}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">MAE:</span>
                <span className="text-white font-semibold">{results.mae}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">R² Score:</span>
                <span className="text-white font-semibold">{results.r2Score}</span>
              </div>
            </div>
          </div>

          {/* Model Info */}
          <div className="glassmorphism rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FiFileText className="mr-2" />
              Model Information
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-gray-300">Algorithm:</span>
                <p className="text-white font-semibold">{results.modelType}</p>
              </div>
              <div>
                <span className="text-gray-300">Features Used:</span>
                <p className="text-white font-semibold">{results.featureImportance.length}</p>
              </div>
              <div>
                <span className="text-gray-300">Training Time:</span>
                <p className="text-white font-semibold">~2.5 minutes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Importance */}
        <div className="glassmorphism rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Feature Importance</h3>
          <div className="space-y-3">
            {results.featureImportance.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{item.feature}</span>
                  <span className="text-white">{(item.importance * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.importance * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Predictions */}
        <div className="glassmorphism rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Sample Predictions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-300 border-b border-gray-600">
                  <th className="pb-2">Actual Value</th>
                  <th className="pb-2">Predicted Value</th>
                  <th className="pb-2">Difference</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {results.predictions.map((pred, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-2">${pred.actual.toLocaleString()}</td>
                    <td className="py-2">${pred.predicted.toLocaleString()}</td>
                    <td className="py-2">
                      <span className={pred.difference > 0 ? 'text-green-400' : 'text-red-400'}>
                        {pred.difference > 0 ? '+' : ''}${pred.difference.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Download Section */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            disabled={downloading}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
          >
            <FiDownload className="inline-block mr-2" />
            {downloading ? 'Downloading...' : 'Download Results & Model'}
          </motion.button>
          <p className="text-gray-400 text-sm mt-2">
            Includes trained model, predictions, and detailed report
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;