import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './AIAnalytics.css';

const AIAnalytics = () => {
  const [prediction, setPrediction] = useState(null);
  const [sustainabilityScore, setSustainabilityScore] = useState(null);
  const [anomalyDetection, setAnomalyDetection] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('carbon');
  
  // Enhanced feature inputs for carbon prediction
  const [carbonFeatures, setCarbonFeatures] = useState({
    transportation_distance: '',
    product_weight: '',
    energy_consumption: '',
    material_usage: '',
    renewable_energy_percentage: ''
  });
  
  // Sustainability score inputs
  const [sustainabilityInputs, setSustainabilityInputs] = useState({
    energy_consumption: '',
    renewable_energy_percentage: '',
    waste_generated: '',
    water_usage: '',
    material_efficiency: '',
    transportation_emissions: ''
  });

  // New state for enhanced features
  const [forecast, setForecast] = useState(null);
  const [blockchainData, setBlockchainData] = useState(null);
  const [availableModels, setAvailableModels] = useState(['random_forest']);
  const [selectedModel, setSelectedModel] = useState('random_forest');
  const [forecastDays, setForecastDays] = useState(30);

  const API_BASE_URL = 'http://localhost:3001';

  useEffect(() => {
    loadAvailableModels();
    loadBlockchainData();
  }, []);

  const loadAvailableModels = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/models/available`);
      const data = await response.json();
      if (data.success) {
        setAvailableModels(data.models);
      }
    } catch (error) {
      console.error('Error loading models:', error);
    }
  };

  const loadBlockchainData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blockchain/environmental-data`);
      const data = await response.json();
      if (data.success) {
        setBlockchainData(data);
      }
    } catch (error) {
      console.error('Error loading blockchain data:', error);
    }
  };

  const handlePredictCarbon = async () => {
    setLoading(true);
    try {
      const features = [
        parseFloat(carbonFeatures.transportation_distance) || 0,
        parseFloat(carbonFeatures.product_weight) || 0,
        parseFloat(carbonFeatures.energy_consumption) || 0,
        parseFloat(carbonFeatures.material_usage) || 0,
        parseFloat(carbonFeatures.renewable_energy_percentage) || 0
      ];
      
      if (features.every(f => f === 0)) {
        alert('Please enter at least one value');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/predict-carbon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          features: features,
          model_type: selectedModel 
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setPrediction(data);
        setRecommendations(data.recommendations || []);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error connecting to API: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePredictCarbonEnhanced = async () => {
    setLoading(true);
    try {
      const features = [
        parseFloat(carbonFeatures.transportation_distance) || 0,
        parseFloat(carbonFeatures.product_weight) || 0,
        parseFloat(carbonFeatures.energy_consumption) || 0,
        parseFloat(carbonFeatures.material_usage) || 0,
        parseFloat(carbonFeatures.renewable_energy_percentage) || 0
      ];
      
      if (features.every(f => f === 0)) {
        alert('Please enter at least one value');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/predict-carbon-enhanced`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          features: features,
          model_type: selectedModel 
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setPrediction({
          ...data,
          enhanced: true,
          blockchain_data_used: data.blockchain_data_used,
          historical_average: data.historical_average,
          trend: data.trend
        });
        setRecommendations(data.recommendations || []);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error connecting to API: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForecastCarbon = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/forecast-carbon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          forecast_days: forecastDays 
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setForecast(data);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error connecting to API: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetSustainabilityScore = async () => {
    setLoading(true);
    try {
      const requestData = {
        energy_consumption: parseFloat(sustainabilityInputs.energy_consumption) || 100,
        renewable_energy_percentage: parseFloat(sustainabilityInputs.renewable_energy_percentage) || 0.2,
        waste_generated: parseFloat(sustainabilityInputs.waste_generated) || 50,
        water_usage: parseFloat(sustainabilityInputs.water_usage) || 200,
        material_efficiency: parseFloat(sustainabilityInputs.material_efficiency) || 0.7,
        transportation_emissions: parseFloat(sustainabilityInputs.transportation_emissions) || 75
      };

      const response = await fetch(`${API_BASE_URL}/api/sustainability-score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
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

  const handleAnomalyDetection = async () => {
    setLoading(true);
    try {
      const features = [
        parseFloat(carbonFeatures.transportation_distance) || 0,
        parseFloat(carbonFeatures.product_weight) || 0,
        parseFloat(carbonFeatures.energy_consumption) || 0,
        parseFloat(carbonFeatures.material_usage) || 0,
        parseFloat(carbonFeatures.renewable_energy_percentage) || 0
      ];

      const response = await fetch(`${API_BASE_URL}/api/anomaly-detection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features: features }),
      });

      const data = await response.json();
      
      if (data.success) {
        setAnomalyDetection(data);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to perform anomaly detection');
    } finally {
      setLoading(false);
    }
  };

  const handleGetRecommendations = async () => {
    setLoading(true);
    try {
      const current_metrics = {
        carbon_footprint: (prediction && prediction.prediction) || 0,
        renewable_energy_percentage: parseFloat(carbonFeatures.renewable_energy_percentage) || 0
      };

      const response = await fetch(`${API_BASE_URL}/api/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ current_metrics }),
      });

      const data = await response.json();
      
      if (data.success) {
        setRecommendations(data.recommendations);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to get recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-dashboard">
      <Sidebar/>
      <div className="dashboard-content">
        <div className="ai-analytics-container">
          <h2>🤖 Enhanced AI Sustainability Analytics</h2>
          
          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button 
              className={`tab-button ${activeTab === 'carbon' ? 'active' : ''}`}
              onClick={() => setActiveTab('carbon')}
            >
              🌍 Carbon Prediction
            </button>
            <button 
              className={`tab-button ${activeTab === 'forecast' ? 'active' : ''}`}
              onClick={() => setActiveTab('forecast')}
            >
              📈 Forecasting
            </button>
            <button 
              className={`tab-button ${activeTab === 'sustainability' ? 'active' : ''}`}
              onClick={() => setActiveTab('sustainability')}
            >
              📊 Sustainability Score
            </button>
            <button 
              className={`tab-button ${activeTab === 'anomaly' ? 'active' : ''}`}
              onClick={() => setActiveTab('anomaly')}
            >
              🔍 Anomaly Detection
            </button>
            <button 
              className={`tab-button ${activeTab === 'blockchain' ? 'active' : ''}`}
              onClick={() => setActiveTab('blockchain')}
            >
              🔗 Blockchain Data
            </button>
            <button 
              className={`tab-button ${activeTab === 'recommendations' ? 'active' : ''}`}
              onClick={() => setActiveTab('recommendations')}
            >
              💡 AI Recommendations
            </button>
          </div>

          {/* Carbon Footprint Prediction Tab */}
          {activeTab === 'carbon' && (
            <div className="analytics-section">
              <h3>🌍 Advanced Carbon Footprint Prediction</h3>
              <p className="section-description">
                Enter supply chain parameters to get AI-powered carbon footprint predictions with confidence metrics and recommendations.
              </p>
              
              <div className="enhanced-input-grid">
                <div className="input-group">
                  <label>Transportation Distance (km)</label>
                  <input
                    type="number"
                    placeholder="e.g., 250"
                    value={carbonFeatures.transportation_distance}
                    onChange={(e) => setCarbonFeatures({...carbonFeatures, transportation_distance: e.target.value})}
                  />
                </div>
                <div className="input-group">
                  <label>Product Weight (kg)</label>
                  <input
                    type="number"
                    placeholder="e.g., 5.5"
                    value={carbonFeatures.product_weight}
                    onChange={(e) => setCarbonFeatures({...carbonFeatures, product_weight: e.target.value})}
                  />
                </div>
                <div className="input-group">
                  <label>Energy Consumption (kWh)</label>
                  <input
                    type="number"
                    placeholder="e.g., 120"
                    value={carbonFeatures.energy_consumption}
                    onChange={(e) => setCarbonFeatures({...carbonFeatures, energy_consumption: e.target.value})}
                  />
                </div>
                <div className="input-group">
                  <label>Material Usage (kg)</label>
                  <input
                    type="number"
                    placeholder="e.g., 25"
                    value={carbonFeatures.material_usage}
                    onChange={(e) => setCarbonFeatures({...carbonFeatures, material_usage: e.target.value})}
                  />
                </div>
                <div className="input-group">
                  <label>Renewable Energy % (0-1)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    placeholder="e.g., 0.25"
                    value={carbonFeatures.renewable_energy_percentage}
                    onChange={(e) => setCarbonFeatures({...carbonFeatures, renewable_energy_percentage: e.target.value})}
                  />
                </div>
              </div>
              
              <button onClick={handlePredictCarbon} disabled={loading} className="primary-button">
                {loading ? 'Analyzing...' : 'Predict Carbon Footprint'}
              </button>
              
              {prediction && (
                <div className="result-card enhanced">
                  <h4>🌍 Carbon Footprint Analysis</h4>
                  <div className="prediction-details">
                    <div className="main-metric">
                      <span className="value">{prediction.prediction.toFixed(2)}</span>
                      <span className="unit">kg CO₂e</span>
                    </div>
                    <div className="confidence-info">
                      <span className="confidence">Confidence: {(prediction.confidence * 100).toFixed(1)}%</span>
                      <span className={`impact-level ${prediction.impact_level}`}>
                        Impact: {prediction.impact_level.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                  {prediction.recommendations && prediction.recommendations.length > 0 && (
                    <div className="recommendations-section">
                      <h5>💡 AI Recommendations:</h5>
                      <ul>
                        {prediction.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Sustainability Score Tab */}
          {activeTab === 'sustainability' && (
            <div className="analytics-section">
              <h3>📊 Comprehensive Sustainability Scoring</h3>
              <p className="section-description">
                Enter operational metrics to get a comprehensive sustainability assessment across multiple categories.
              </p>
              
              <div className="enhanced-input-grid">
                <div className="input-group">
                  <label>Energy Consumption (kWh/month)</label>
                  <input
                    type="number"
                    placeholder="e.g., 100"
                    value={sustainabilityInputs.energy_consumption}
                    onChange={(e) => setSustainabilityInputs({...sustainabilityInputs, energy_consumption: e.target.value})}
                  />
                </div>
                <div className="input-group">
                  <label>Renewable Energy % (0-1)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    placeholder="e.g., 0.3"
                    value={sustainabilityInputs.renewable_energy_percentage}
                    onChange={(e) => setSustainabilityInputs({...sustainabilityInputs, renewable_energy_percentage: e.target.value})}
                  />
                </div>
                <div className="input-group">
                  <label>Waste Generated (kg/month)</label>
                  <input
                    type="number"
                    placeholder="e.g., 50"
                    value={sustainabilityInputs.waste_generated}
                    onChange={(e) => setSustainabilityInputs({...sustainabilityInputs, waste_generated: e.target.value})}
                  />
                </div>
                <div className="input-group">
                  <label>Water Usage (m³/month)</label>
                  <input
                    type="number"
                    placeholder="e.g., 200"
                    value={sustainabilityInputs.water_usage}
                    onChange={(e) => setSustainabilityInputs({...sustainabilityInputs, water_usage: e.target.value})}
                  />
                </div>
                <div className="input-group">
                  <label>Material Efficiency (0-1)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    placeholder="e.g., 0.75"
                    value={sustainabilityInputs.material_efficiency}
                    onChange={(e) => setSustainabilityInputs({...sustainabilityInputs, material_efficiency: e.target.value})}
                  />
                </div>
                <div className="input-group">
                  <label>Transportation Emissions (kg CO₂e)</label>
                  <input
                    type="number"
                    placeholder="e.g., 75"
                    value={sustainabilityInputs.transportation_emissions}
                    onChange={(e) => setSustainabilityInputs({...sustainabilityInputs, transportation_emissions: e.target.value})}
                  />
                </div>
              </div>
              
              <button onClick={handleGetSustainabilityScore} disabled={loading} className="primary-button">
                {loading ? 'Calculating...' : 'Calculate Sustainability Score'}
              </button>
              
              {sustainabilityScore && (
                <div className="result-card enhanced">
                  <h4>🏆 Sustainability Assessment</h4>
                  <div className="score-overview">
                    <div className="overall-score">
                      <span className="score-value">{sustainabilityScore.overall_score}/100</span>
                      <span className={`grade grade-${sustainabilityScore.grade.toLowerCase()}`}>
                        Grade: {sustainabilityScore.grade}
                      </span>
                      <span className="performance-level">{sustainabilityScore.performance_level}</span>
                    </div>
                  </div>
                  
                  {sustainabilityScore.category_scores && (
                    <div className="category-scores">
                      <h5>Category Breakdown:</h5>
                      <div className="scores-grid">
                        {Object.entries(sustainabilityScore.category_scores).map(([category, score]) => (
                          <div key={category} className="category-score">
                            <span className="category-name">{category.replace('_', ' ').toUpperCase()}</span>
                            <span className="category-value">{score.toFixed(1)}/100</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {sustainabilityScore.recommendations && sustainabilityScore.recommendations.length > 0 && (
                    <div className="recommendations-section">
                      <h5>💡 Improvement Recommendations:</h5>
                      <ul>
                        {sustainabilityScore.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Anomaly Detection Tab */}
          {activeTab === 'anomaly' && (
            <div className="analytics-section">
              <h3>🔍 Sustainability Anomaly Detection</h3>
              <p className="section-description">
                Detect unusual patterns or potential issues in your sustainability metrics using AI analysis.
              </p>
              
              <button onClick={handleAnomalyDetection} disabled={loading} className="primary-button">
                {loading ? 'Analyzing...' : 'Detect Anomalies'}
              </button>
              
              {anomalyDetection && (
                <div className="result-card enhanced">
                  <h4>🔍 Anomaly Detection Results</h4>
                  <div className="anomaly-overview">
                    <div className={`status ${anomalyDetection.has_anomalies ? 'warning' : 'success'}`}>
                      {anomalyDetection.has_anomalies ? '⚠️ Anomalies Detected' : '✅ No Anomalies Found'}
                    </div>
                    <div className={`risk-level ${anomalyDetection.risk_level}`}>
                      Risk Level: {anomalyDetection.risk_level.toUpperCase()}
                    </div>
                  </div>
                  
                  {anomalyDetection.anomalies && anomalyDetection.anomalies.length > 0 && (
                    <div className="anomalies-list">
                      <h5>⚠️ Detected Issues:</h5>
                      <ul>
                        {anomalyDetection.anomalies.map((anomaly, index) => (
                          <li key={index} className="anomaly-item">{anomaly}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Forecasting Tab */}
          {activeTab === 'forecast' && (
            <div className="analytics-section">
              <h3>📈 Carbon Footprint Forecasting</h3>
              <p className="section-description">
                Generate time series forecasts based on historical blockchain data to predict future carbon emissions trends.
              </p>
              
              <div className="forecast-controls">
                <div className="input-group">
                  <label>Forecast Period (Days)</label>
                  <input
                    type="number"
                    min="7"
                    max="365"
                    value={forecastDays}
                    onChange={(e) => setForecastDays(parseInt(e.target.value))}
                  />
                </div>
                
                <button onClick={handleForecastCarbon} disabled={loading} className="primary-button">
                  {loading ? 'Generating Forecast...' : 'Generate Forecast'}
                </button>
              </div>
              
              {forecast && (
                <div className="result-card enhanced">
                  <h4>📊 Carbon Footprint Forecast</h4>
                  <div className="forecast-summary">
                    <div className="forecast-metric">
                      <span className="metric-label">Trend Direction:</span>
                      <span className={`trend-indicator ${forecast.trend}`}>
                        {forecast.trend === 'increasing' ? '📈 Increasing' : 
                         forecast.trend === 'decreasing' ? '📉 Decreasing' : '➡️ Stable'}
                      </span>
                    </div>
                    <div className="forecast-metric">
                      <span className="metric-label">Confidence Level:</span>
                      <span className="confidence-value">{(forecast.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="forecast-metric">
                      <span className="metric-label">Data Points Used:</span>
                      <span className="data-points">{forecast.historical_data_points}</span>
                    </div>
                  </div>
                  
                  {forecast.forecast && forecast.forecast.length > 0 && (
                    <div className="forecast-table">
                      <h5>📅 Upcoming Predictions (First 7 Days)</h5>
                      <table>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Predicted CO₂e (kg)</th>
                            <th>Confidence</th>
                          </tr>
                        </thead>
                        <tbody>
                          {forecast.forecast.slice(0, 7).map((item, index) => (
                            <tr key={index}>
                              <td>{new Date(item.date).toLocaleDateString()}</td>
                              <td>{item.predicted_carbon_footprint.toFixed(2)}</td>
                              <td>{(item.confidence * 100).toFixed(1)}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Blockchain Data Tab */}
          {activeTab === 'blockchain' && (
            <div className="analytics-section">
              <h3>🔗 Blockchain Data Analysis</h3>
              <p className="section-description">
                View and analyze environmental sustainability data stored on the blockchain.
              </p>
              
              <div className="blockchain-controls">
                <button onClick={loadBlockchainData} disabled={loading} className="primary-button">
                  {loading ? 'Loading...' : 'Refresh Blockchain Data'}
                </button>
              </div>
              
              {blockchainData && (
                <div className="result-card enhanced">
                  <h4>📊 Blockchain Environmental Data</h4>
                  <div className="blockchain-summary">
                    <div className="summary-metric">
                      <span className="metric-label">Total Assessments:</span>
                      <span className="metric-value">{blockchainData.data_points}</span>
                    </div>
                    
                    {blockchainData.analysis && (
                      <>
                        <div className="summary-metric">
                          <span className="metric-label">Average Energy Consumption:</span>
                          <span className="metric-value">{blockchainData.analysis.avg_energy_consumption && blockchainData.analysis.avg_energy_consumption.toFixed(2)} kWh</span>
                        </div>
                        <div className="summary-metric">
                          <span className="metric-label">Average GHG Emissions:</span>
                          <span className="metric-value">{blockchainData.analysis.avg_ghg_emissions && blockchainData.analysis.avg_ghg_emissions.toFixed(2)} kg CO₂e</span>
                        </div>
                        <div className="summary-metric">
                          <span className="metric-label">Renewable Energy %:</span>
                          <span className="metric-value">{blockchainData.analysis.avg_renewable_percentage && (blockchainData.analysis.avg_renewable_percentage * 100).toFixed(1)}%</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {blockchainData.preview_data && blockchainData.preview_data.length > 0 && (
                    <div className="blockchain-preview">
                      <h5>📋 Recent Assessment Data (Sample)</h5>
                      <div className="data-grid">
                        {blockchainData.preview_data.slice(0, 3).map((item, index) => (
                          <div key={index} className="data-item">
                            <div className="data-field">
                              <span className="field-label">Assessment ID:</span>
                              <span className="field-value">{item.id}</span>
                            </div>
                            <div className="data-field">
                              <span className="field-label">Date:</span>
                              <span className="field-value">{item.date}</span>
                            </div>
                            <div className="data-field">
                              <span className="field-label">Energy:</span>
                              <span className="field-value">{item.energy} kWh</span>
                            </div>
                            <div className="data-field">
                              <span className="field-label">GHG:</span>
                              <span className="field-value">{item.ghg} kg CO₂e</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Enhanced Carbon Prediction Section */}
          <div className="enhanced-prediction-section">
            <h3>🔬 Enhanced AI Prediction</h3>
            <p>Get enhanced carbon predictions using blockchain historical data and advanced ML models.</p>
            
            <div className="model-selection">
              <label>Select AI Model:</label>
              <select 
                value={selectedModel} 
                onChange={(e) => setSelectedModel(e.target.value)}
                className="model-selector"
              >
                {availableModels.map(model => (
                  <option key={model} value={model}>
                    {model.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            
            <button onClick={handlePredictCarbonEnhanced} disabled={loading} className="enhanced-button">
              {loading ? 'Processing...' : '🚀 Enhanced Prediction with Blockchain Data'}
            </button>
            
            {prediction && prediction.enhanced && (
              <div className="enhanced-result">
                <h4>🎯 Enhanced Prediction Results</h4>
                <div className="enhanced-metrics">
                  <div className="metric">
                    <span className="label">Predicted Carbon Footprint:</span>
                    <span className="value">{prediction.prediction && prediction.prediction.toFixed(2)} kg CO₂e</span>
                  </div>
                  <div className="metric">
                    <span className="label">Historical Average:</span>
                    <span className="value">{prediction.historical_average && prediction.historical_average.toFixed(2)} kg CO₂e</span>
                  </div>
                  <div className="metric">
                    <span className="label">Trend Analysis:</span>
                    <span className={`trend ${prediction.trend}`}>{prediction.trend}</span>
                  </div>
                  <div className="metric">
                    <span className="label">Blockchain Data Used:</span>
                    <span className="value">{prediction.blockchain_data_used ? '✅ Yes' : '❌ No'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recommendations Tab */}
          {activeTab === 'recommendations' && (
            <div className="analytics-section">
              <h3>💡 AI-Powered Sustainability Recommendations</h3>
              <p className="section-description">
                Get personalized recommendations based on your current sustainability performance and AI analysis.
              </p>
              
              <button onClick={handleGetRecommendations} disabled={loading} className="primary-button">
                {loading ? 'Generating...' : 'Get AI Recommendations'}
              </button>
              
              {recommendations && recommendations.length > 0 && (
                <div className="result-card enhanced">
                  <h4>💡 Strategic Recommendations</h4>
                  <div className="recommendations-grid">
                    {recommendations.map((rec, index) => (
                      <div key={index} className={`recommendation-card ${rec.priority}`}>
                        <div className="rec-header">
                          <span className="rec-category">{rec.category.toUpperCase()}</span>
                          <span className={`rec-priority ${rec.priority}`}>{rec.priority} PRIORITY</span>
                        </div>
                        <div className="rec-action">{rec.action}</div>
                        <div className="rec-impact">{rec.potential_impact}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {recommendations && recommendations.length === 0 && (
                <div className="result-card enhanced">
                  <h4>💡 No Specific Recommendations</h4>
                  <p>Your current performance looks good! Continue monitoring and consider the general best practices for sustainability.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAnalytics;
