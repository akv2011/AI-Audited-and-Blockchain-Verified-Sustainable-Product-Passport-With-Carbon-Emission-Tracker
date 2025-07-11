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

// Carbon footprint prediction endpoint
app.post('/api/predict-carbon', async (req, res) => {
  try {
    const { features } = req.body;
    
    if (!features || !Array.isArray(features)) {
      return res.status(400).json({ error: 'Features array is required' });
    }

    // Call the Python AI service
    const response = await axios.post(`${AI_SERVICE_URL}/predict`, {
      features: features
    });

    res.json({
      success: true,
      prediction: response.data.carbon_footprint,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error calling AI service:', error.message);
    res.status(500).json({ 
      error: 'Failed to get carbon footprint prediction',
      details: error.message 
    });
  }
});

// Sustainability scoring endpoint (placeholder)
app.post('/api/sustainability-score', async (req, res) => {
  try {
    // TODO: Implement sustainability scoring logic
    // This would integrate with additional AI models
    
    const mockScore = Math.random() * 100; // Placeholder
    
    res.json({
      success: true,
      sustainabilityScore: mockScore,
      grade: mockScore > 80 ? 'A' : mockScore > 60 ? 'B' : mockScore > 40 ? 'C' : 'D',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to calculate sustainability score',
      details: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend API server running on port ${PORT}`);
  console.log(`AI Service URL: ${AI_SERVICE_URL}`);
});
