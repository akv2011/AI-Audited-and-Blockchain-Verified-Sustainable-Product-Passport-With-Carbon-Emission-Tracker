const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend API is running' });
});

// Enhanced carbon footprint prediction endpoint
app.post('/api/predict-carbon', async (req, res) => {
  try {
    const { features, model_type = "random_forest" } = req.body;
    
    if (!features || !Array.isArray(features)) {
      return res.status(400).json({ error: 'Features array is required' });
    }

    // Call the enhanced Python AI service
    const response = await axios.post(`${AI_SERVICE_URL}/predict`, {
      features: features,
      model_type: model_type
    });

    res.json({
      success: true,
      prediction: response.data.carbon_footprint,
      confidence: response.data.confidence,
      model_used: response.data.model_used,
      recommendations: response.data.recommendations,
      impact_level: response.data.impact_level,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error calling AI service:', error.message);
    res.status(500).json({ 
      error: 'Failed to get carbon footprint prediction',
      details: error.response?.data || error.message 
    });
  }
});

// Enhanced sustainability scoring endpoint
app.post('/api/sustainability-score', async (req, res) => {
  try {
    const { 
      energy_consumption = 100,
      renewable_energy_percentage = 0.2,
      waste_generated = 50,
      water_usage = 200,
      material_efficiency = 0.7,
      transportation_emissions = 75
    } = req.body;
    
    // Call the Python AI service for comprehensive scoring
    const response = await axios.post(`${AI_SERVICE_URL}/sustainability-score`, {
      energy_consumption,
      renewable_energy_percentage,
      waste_generated,
      water_usage,
      material_efficiency,
      transportation_emissions
    });
    
    res.json({
      success: true,
      overall_score: response.data.overall_score,
      category_scores: response.data.category_scores,
      grade: response.data.grade,
      recommendations: response.data.recommendations,
      performance_level: response.data.performance_level,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error calculating sustainability score:', error.message);
    res.status(500).json({ 
      error: 'Failed to calculate sustainability score',
      details: error.response?.data || error.message 
    });
  }
});

// Anomaly detection endpoint
app.post('/api/anomaly-detection', async (req, res) => {
  try {
    const { features } = req.body;
    
    if (!features || !Array.isArray(features)) {
      return res.status(400).json({ error: 'Features array is required for anomaly detection' });
    }

    const response = await axios.post(`${AI_SERVICE_URL}/anomaly-detection`, {
      features: features
    });

    res.json({
      success: true,
      has_anomalies: response.data.has_anomalies,
      anomalies: response.data.anomalies,
      risk_level: response.data.risk_level,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in anomaly detection:', error.message);
    res.status(500).json({ 
      error: 'Failed to perform anomaly detection',
      details: error.response?.data || error.message 
    });
  }
});

// Get AI models information
app.get('/api/models/info', async (req, res) => {
  try {
    const response = await axios.get(`${AI_SERVICE_URL}/models/info`);
    res.json({
      success: true,
      models_info: response.data
    });
  } catch (error) {
    console.error('Error getting models info:', error.message);
    res.status(500).json({ 
      error: 'Failed to get models information',
      details: error.response?.data || error.message 
    });
  }
});

// Blockchain data integration endpoint (for future Phase 2)
app.post('/api/blockchain-analytics', async (req, res) => {
  try {
    const { 
      contract_address,
      transaction_data,
      sustainability_metrics 
    } = req.body;
    
    // TODO: Implement blockchain data integration
    // This would fetch data from smart contracts and analyze it with AI
    
    res.json({
      success: true,
      message: "Blockchain analytics endpoint - implementation pending",
      data: {
        contract_address,
        analysis_status: "pending",
        integration_phase: "Phase 2 development"
      }
    });
    
  } catch (error) {
    res.status(500).json({ 
      error: 'Blockchain analytics not yet implemented',
      details: error.message 
    });
  }
});

// Sustainability recommendations based on historical data
app.post('/api/recommendations', async (req, res) => {
  try {
    const { 
      current_metrics,
      historical_data,
      improvement_targets 
    } = req.body;
    
    // Enhanced recommendations logic combining AI insights
    let recommendations = [];
    
    if (current_metrics) {
      // Generate recommendations based on current performance
      if (current_metrics.carbon_footprint > 100) {
        recommendations.push({
          category: "emissions",
          priority: "high", 
          action: "Implement immediate carbon reduction strategies",
          potential_impact: "30-50% emission reduction"
        });
      }
      
      if (current_metrics.renewable_energy_percentage < 0.3) {
        recommendations.push({
          category: "energy",
          priority: "medium",
          action: "Increase renewable energy adoption",
          potential_impact: "20-40% sustainability score improvement"
        });
      }
    }
    
    res.json({
      success: true,
      recommendations,
      analysis_date: new Date().toISOString(),
      recommendations_count: recommendations.length
    });
    
  } catch (error) {
    console.error('Error generating recommendations:', error.message);
    res.status(500).json({ 
      error: 'Failed to generate recommendations',
      details: error.message 
    });
  }
});

// Enhanced carbon prediction with blockchain data
app.post('/api/predict-carbon-enhanced', async (req, res) => {
  try {
    const { features, model_type = "random_forest" } = req.body;
    
    if (!features || !Array.isArray(features)) {
      return res.status(400).json({ error: 'Features array is required' });
    }

    const response = await axios.post(`${AI_SERVICE_URL}/predict-enhanced`, {
      features: features,
      model_type: model_type
    });

    res.json({
      success: true,
      prediction: response.data.carbon_footprint,
      confidence: response.data.confidence,
      model_used: response.data.model_used,
      recommendations: response.data.recommendations,
      impact_level: response.data.impact_level,
      historical_average: response.data.historical_average,
      trend: response.data.trend,
      blockchain_data_used: response.data.blockchain_data_used,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error calling enhanced AI service:', error.message);
    res.status(500).json({ 
      error: 'Failed to get enhanced carbon footprint prediction',
      details: error.response?.data || error.message 
    });
  }
});

// Carbon footprint forecasting endpoint
app.post('/api/forecast-carbon', async (req, res) => {
  try {
    const { forecast_days = 30 } = req.body;
    
    const response = await axios.post(`${AI_SERVICE_URL}/forecast`, {
      forecast_days: forecast_days
    });

    res.json({
      success: true,
      forecast: response.data.forecast,
      trend: response.data.trend,
      confidence: response.data.confidence,
      historical_data_points: response.data.historical_data_points,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error getting forecast:', error.message);
    res.status(500).json({ 
      error: 'Failed to generate carbon footprint forecast',
      details: error.response?.data || error.message 
    });
  }
});

// Dashboard widgets endpoint
app.get('/api/dashboard/widgets', async (req, res) => {
  try {
    const response = await axios.get(`${AI_SERVICE_URL}/dashboard/widgets`);

    res.json({
      success: true,
      widgets: response.data.widgets,
      last_updated: response.data.last_updated,
      data_points: response.data.data_points
    });

  } catch (error) {
    console.error('Error getting dashboard widgets:', error.message);
    res.status(500).json({ 
      error: 'Failed to get dashboard widgets',
      details: error.response?.data || error.message 
    });
  }
});

// Blockchain environmental data endpoint
app.get('/api/blockchain/environmental-data', async (req, res) => {
  try {
    const response = await axios.get(`${AI_SERVICE_URL}/blockchain/environmental-data`);

    res.json({
      success: true,
      data_points: response.data.data_points,
      analysis: response.data.analysis,
      preview_data: response.data.raw_data
    });

  } catch (error) {
    console.error('Error getting blockchain data:', error.message);
    res.status(500).json({ 
      error: 'Failed to get blockchain environmental data',
      details: error.response?.data || error.message 
    });
  }
});

// Available models endpoint
app.get('/api/models/available', async (req, res) => {
  try {
    const response = await axios.get(`${AI_SERVICE_URL}/models/available`);

    res.json({
      success: true,
      models: response.data.carbon_prediction_models,
      features_info: response.data.features_info
    });

  } catch (error) {
    console.error('Error getting available models:', error.message);
    res.status(500).json({ 
      error: 'Failed to get available models',
      details: error.response?.data || error.message 
    });
  }
});

// Alert configuration endpoint
app.post('/api/alerts/configure', async (req, res) => {
  try {
    const { thresholds, monitoring_enabled = true } = req.body;
    
    const response = await axios.post(`${AI_SERVICE_URL}/alerts/configure`, {
      thresholds: thresholds,
      monitoring_enabled: monitoring_enabled
    });

    res.json({
      success: true,
      message: response.data.message,
      thresholds: response.data.thresholds,
      monitoring: response.data.monitoring
    });

  } catch (error) {
    console.error('Error configuring alerts:', error.message);
    res.status(500).json({ 
      error: 'Failed to configure alerts',
      details: error.response?.data || error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend API server running on port ${PORT}`);
  console.log(`AI Service URL: ${AI_SERVICE_URL}`);
  console.log('Available endpoints:');
  console.log('  POST /api/predict-carbon - Enhanced carbon footprint prediction');
  console.log('  POST /api/sustainability-score - Comprehensive sustainability scoring');
  console.log('  POST /api/anomaly-detection - Sustainability anomaly detection');
  console.log('  POST /api/recommendations - AI-powered recommendations');
  console.log('  GET  /api/models/info - AI models information');
  console.log('  POST /api/blockchain-analytics - Blockchain data integration (Phase 2)');
  console.log('  POST /api/predict-carbon-enhanced - Enhanced carbon prediction with blockchain data');
  console.log('  POST /api/forecast-carbon - Carbon footprint forecasting');
  console.log('  GET  /api/dashboard/widgets - Dashboard widgets data');
  console.log('  GET  /api/blockchain/environmental-data - Blockchain environmental data');
  console.log('  GET  /api/models/available - Available AI models and features info');
  console.log('  POST /api/alerts/configure - Configure alerts and monitoring');
});
