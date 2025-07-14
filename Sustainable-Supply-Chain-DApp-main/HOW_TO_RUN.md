# 🚀 How to Run the AI-Enhanced Walmart Sustainable Supply Chain DApp

This guide will help you set up and run the complete AI-powered sustainability analytics system with blockchain integration.

## 📋 Prerequisites

### System Requirements
- **Node.js**: 16.17.0 or higher
- **Python**: 3.13.3 or higher
- **npm**: Latest version
- **Git**: Latest version

### Required Software
- **Truffle Suite**: For smart contract deployment
- **Ganache**: For local blockchain (optional, sample data provided)
- **MetaMask**: Browser extension for wallet connection
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

## 🛠️ Installation & Setup

### Step 1: Clone and Install Dependencies

```bash
# Clone the repository
git clone [repository-url]
cd Sustainable-Supply-Chain-DApp-main

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Set up Python AI service
cd ai_service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### Step 2: Environment Setup

Create environment files:

**Backend (.env)**:
```bash
cd backend
echo "AI_SERVICE_URL=http://localhost:8000" > .env
echo "PORT=3001" >> .env
cd ..
```

**AI Service (.env)**:
```bash
cd ai_service
echo "BLOCKCHAIN_URL=http://127.0.0.1:7545" > .env
echo "PORT=8000" >> .env
cd ..
```

## 🚀 Starting the Application

### Step 3: Start Services in Order

**Terminal 1 - AI Microservice** (Start First):
```bash
cd ai_service
source venv/bin/activate  # On Windows: venv\Scripts\activate
python main.py
```
✅ Should show: "Enhanced AI Sustainability Microservice running on http://0.0.0.0:8000"

**Terminal 2 - Backend API** (Start Second):
```bash
cd backend
npm start
```
✅ Should show: "Backend API server running on port 3001"

**Terminal 3 - Frontend React App** (Start Third):
```bash
npm start
```
✅ Should open browser at: http://localhost:3000

### Step 4: Verify All Services

Check that all services are running:

```bash
# Test AI Service
curl http://localhost:8000/health

# Test Backend API
curl http://localhost:3001/health

# Test Frontend (should open in browser automatically)
```

## 🧪 Testing the AI Features

### 1. **AI Analytics Dashboard**
- Navigate to: http://localhost:3000/ai-analytics
- Test all 6 tabs:
  - 🌍 Carbon Prediction
  - 📈 Forecasting
  - 📊 Sustainability Score
  - 🔍 Anomaly Detection
  - 🔗 Blockchain Data
  - 💡 AI Recommendations

### 2. **Sustainability Dashboard**
- Navigate to: http://localhost:3000/sustainability-dashboard
- View real-time widgets:
  - Carbon Footprint Gauge
  - Renewable Energy Progress
  - Energy Efficiency Metrics
  - AI-Powered Recommendations

### 3. **Test Carbon Prediction**
1. Go to AI Analytics → Carbon Prediction tab
2. Enter sample values:
   - Transportation Distance: 250 km
   - Product Weight: 5 kg
   - Energy Consumption: 120 kWh
   - Material Usage: 25 kg
   - Renewable Energy %: 0.3 (30%)
3. Select Model: XGBoost
4. Click "Predict Carbon Footprint"
5. ✅ Should show prediction with confidence, recommendations

### 4. **Test Forecasting**
1. Go to AI Analytics → Forecasting tab
2. Set forecast period: 30 days
3. Click "Generate Forecast"
4. ✅ Should show trend analysis and future predictions

### 5. **Test Blockchain Integration**
1. Go to AI Analytics → Blockchain Data tab
2. Click "Refresh Blockchain Data"
3. ✅ Should show environmental assessment data

## 🔧 Troubleshooting

### Common Issues & Solutions

**Port Already in Use**:
```bash
# Kill processes on specific ports
kill -9 $(lsof -ti:8000)  # AI Service
kill -9 $(lsof -ti:3001)  # Backend
kill -9 $(lsof -ti:3000)  # Frontend
```

**Python Dependencies Issues**:
```bash
cd ai_service
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

**Node.js Issues**:
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Frontend Compilation Errors**:
```bash
# Clear React cache
rm -rf node_modules/.cache
npm start
```

### Service Health Checks

**AI Service Health**:
```bash
curl http://localhost:8000/system/health-comprehensive
```

**Backend Health**:
```bash
curl http://localhost:3001/health
```

## 📊 API Testing

### Key Endpoints to Test

**AI Predictions**:
```bash
# Basic prediction
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"features": [250, 5, 120, 25, 0.3], "model_type": "xgboost"}'

# Enhanced prediction with blockchain
curl -X POST http://localhost:8000/predict-enhanced \
  -H "Content-Type: application/json" \
  -d '{"features": [250, 5, 120, 25, 0.3], "model_type": "random_forest"}'

# Forecasting
curl -X POST http://localhost:8000/forecast \
  -H "Content-Type: application/json" \
  -d '{"forecast_days": 7}'
```

**Dashboard Data**:
```bash
# Get dashboard widgets
curl http://localhost:8000/dashboard/widgets

# Get available models
curl http://localhost:8000/models/available

# Get active alerts
curl http://localhost:8000/alerts/active
```

## 🎯 Feature Testing Checklist

### ✅ AI Features
- [ ] Carbon footprint prediction (Linear, Random Forest, XGBoost)
- [ ] Time series forecasting (7-365 days)
- [ ] Sustainability scoring (comprehensive metrics)
- [ ] Anomaly detection (threshold violations)
- [ ] Real-time alerts (automatic threshold monitoring)
- [ ] AI recommendations (actionable insights)

### ✅ Blockchain Integration
- [ ] Environmental data retrieval from blockchain
- [ ] AI prediction storage on blockchain
- [ ] Historical trend analysis
- [ ] Smart contract event logging

### ✅ Dashboard Features
- [ ] Real-time sustainability widgets
- [ ] Carbon footprint gauges
- [ ] Renewable energy tracking
- [ ] Energy efficiency metrics
- [ ] Alert management system

### ✅ User Interface
- [ ] 6-tab AI Analytics interface
- [ ] Responsive design (mobile/desktop)
- [ ] Real-time data updates
- [ ] Interactive visualizations
- [ ] Error handling and loading states

## 🚨 Alert System Testing

1. **Test High Carbon Alert**:
   - Enter high values (transportation: 800, energy: 300)
   - Should trigger critical alert

2. **Test Low Renewable Energy Alert**:
   - Set renewable energy % to 0.1 (10%)
   - Should trigger warning alert

3. **View Active Alerts**:
   ```bash
   curl http://localhost:8000/alerts/active
   ```

## 📱 Mobile Testing

- Test on mobile devices or browser dev tools
- Verify responsive design
- Check touch interactions
- Validate mobile-first dashboard

## 🔐 Security Notes

- All AI predictions are logged for audit trail
- Blockchain integration provides immutable records
- Input validation on all endpoints
- CORS configured for local development

## 📈 Performance Expectations

- **AI Prediction Response**: < 500ms
- **Dashboard Widget Load**: < 2s
- **Blockchain Query**: < 3s
- **Forecast Generation**: < 1s
- **Frontend Page Load**: < 3s

## 🆘 Support

For issues or questions:
1. Check browser console for errors
2. Verify all services are running on correct ports
3. Check terminal outputs for error messages
4. Review API responses for detailed error info

**Service URLs**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- AI Service: http://localhost:8000
- API Documentation: http://localhost:8000/docs (FastAPI Swagger UI)

---

## 🏆 Success Criteria

The system is working correctly when:
1. All 3 services start without errors
2. Frontend loads and displays navigation
3. AI Analytics page shows all 6 tabs
4. Carbon prediction returns results with confidence
5. Dashboard widgets display real-time data
6. Alerts system monitors and triggers notifications
7. Blockchain integration retrieves historical data
8. Forecasting generates future trend predictions

**🎉 Congratulations! You now have a fully functional AI-powered sustainability analytics system!**
