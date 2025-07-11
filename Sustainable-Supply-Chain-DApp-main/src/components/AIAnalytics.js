import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './AIAnalytics.css';

const AIAnalytics = () => {
  const [prediction, setPrediction] = useState(null);
  const [sustainabilityScore, setSustainabilityScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState(['', '']);

  const API_BASE_URL = 'http://localhost:3001';

  const handlePredictCarbon = async () => {
    setLoading(true);
    try {
      const numericFeatures = features.map(f => parseFloat(f)).filter(f => !isNaN(f));
      
      if (numericFeatures.length < 2) {
        alert('Please enter at least 2 numeric values');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/predict-carbon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features: numericFeatures }),
      });

      const data = await response.json();
      
      if (data.success) {
        setPrediction(data.prediction);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to get prediction');
    } finally {
      setLoading(false);
    }
  };

  const handleGetSustainabilityScore = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/sustainability-score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      
      if (data.success) {
        setSustainabilityScore(data);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to get sustainability score');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-dashboard">
      <Sidebar/>
      <div className="dashboard-content">
        <div className="ai-analytics-container">
          <h2>🤖 AI-Powered Sustainability Analytics</h2>
          
          <div className="analytics-section">
            <h3>Carbon Footprint Prediction</h3>
            <div className="input-group">
              <input
                type="number"
                placeholder="Feature 1 (e.g., transportation distance)"
                value={features[0]}
                onChange={(e) => setFeatures([e.target.value, features[1]])}
              />
              <input
                type="number"
                placeholder="Feature 2 (e.g., product weight)"
                value={features[1]}
                onChange={(e) => setFeatures([features[0], e.target.value])}
              />
            </div>
            <button onClick={handlePredictCarbon} disabled={loading}>
              {loading ? 'Predicting...' : 'Predict Carbon Footprint'}
            </button>
            
            {prediction !== null && (
              <div className="result-card">
                <h4>🌍 Carbon Footprint Prediction</h4>
                <p className="prediction-value">{prediction.toFixed(2)} kg CO₂</p>
              </div>
            )}
          </div>

          <div className="analytics-section">
            <h3>Sustainability Score</h3>
            <button onClick={handleGetSustainabilityScore} disabled={loading}>
              {loading ? 'Calculating...' : 'Get Sustainability Score'}
            </button>
            
            {sustainabilityScore && (
              <div className="result-card">
                <h4>🏆 Sustainability Score</h4>
                <div className="score-display">
                  <span className="score-value">{sustainabilityScore.sustainabilityScore.toFixed(1)}/100</span>
                  <span className={`grade grade-${sustainabilityScore.grade.toLowerCase()}`}>
                    Grade: {sustainabilityScore.grade}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalytics;
