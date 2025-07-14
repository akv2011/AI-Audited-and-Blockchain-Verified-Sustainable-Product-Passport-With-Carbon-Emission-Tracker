# 🧪 Complete System Testing Checklist

## 🚀 **SYSTEM STATUS: ALL SERVICES RUNNING** ✅

### Current Running Services:
- ✅ **React Frontend**: http://localhost:3000
- ✅ **Backend API**: http://localhost:3001  
- ✅ **AI Microservice**: http://localhost:8001
- ✅ **Blockchain**: Ganache running on port 7545

---

## 📋 **TESTING WORKFLOW - Follow This Exact Order**

### **PHASE 1: AI Features Testing (15-20 minutes)**

#### 🤖 **1.1 AI Analytics Page**
**Navigation**: Sidebar → AI Analytics

**Test Cases:**

**🔸 Basic Carbon Prediction**
```
Input Values:
- Energy Consumption: 1000
- Transportation: 500
- Manufacturing: 800
- Waste Production: 200
- Renewable Energy %: 75

Expected Results:
✅ Carbon footprint prediction displayed (~131.48 kg CO2)
✅ Confidence score shown (~85%)
✅ AI recommendations generated (4-5 suggestions)
✅ Impact level assessment (High/Medium/Low)
✅ Charts display prediction breakdown
```

**🔸 Model Comparison Testing**
```
Test Steps:
1. Use same data as above
2. Switch between models: Random Forest → XGBoost → Linear Regression
3. Compare predictions and confidence scores

Expected Results:
✅ Different predictions from each model
✅ Confidence intervals vary by model
✅ Model performance metrics displayed
✅ Recommendations adapt to model results
```

**🔸 Time Series Forecasting**
```
Test Steps:
1. Set forecast period: 12 months
2. Click "Generate Forecast"
3. Review forecast charts

Expected Results:
✅ Interactive forecast chart displayed
✅ Trend analysis shows future predictions
✅ Confidence bands around predictions
✅ Seasonal patterns if applicable
```

**🔸 Anomaly Detection**
```
Input Extreme Values:
- Energy Consumption: 10000 (very high)
- Transportation: 50000 (extremely high)
- Manufacturing: 100
- Waste Production: 50

Expected Results:
✅ Anomaly alerts triggered
✅ "Unusual pattern detected" messages
✅ Specific recommendations for outliers
✅ Alert notifications displayed
```

#### 🎯 **1.2 Sustainability Dashboard**
**Navigation**: Sidebar → Sustainability Dashboard

**Expected Widgets:**
```
✅ Carbon Footprint Widget
   - Current: ~79.8 kg CO2
   - Target: 60.0 kg CO2
   - Status: Warning (orange)
   - Trend: Improving

✅ Renewable Energy Widget
   - Current: ~24%
   - Target: 50%
   - Status: Critical (red)

✅ Energy Efficiency Widget
   - Current: 145.5 kWh
   - Target: 120.0 kWh
   - Status: Warning

✅ Sustainability Score
   - Overall: ~61.1
   - Grade: B
```

**Test Actions:**
- ✅ Verify all widgets load with real data
- ✅ Check color coding (red/orange/green) based on performance
- ✅ Test widget refresh functionality
- ✅ Verify AI recommendations carousel

---

### **PHASE 2: Traditional Supply Chain Features (20-25 minutes)**

#### 📦 **2.1 Product Management**
**Navigation**: Sidebar → Products

**🔸 Add New Product**
```
Test Data:
- Product Name: "Eco-Friendly T-Shirt"
- Description: "100% organic cotton sustainable apparel"
- Price: $25.99
- Category: "Clothing"
- Image: Upload any product image

Test Steps:
1. Click "Add Product"
2. Fill form with test data
3. Upload image
4. Submit form

Expected Results:
✅ Product creation success message
✅ Product appears in products list
✅ IPFS image upload successful
✅ Blockchain transaction hash displayed
✅ Product ID generated
```

**🔸 View Products List**
```
Expected Results:
✅ All products displayed in grid/list
✅ Product images load correctly
✅ Product details clickable
✅ Search/filter functionality works
```

#### 🏭 **2.2 Environmental Assessment**
**Navigation**: Sidebar → Assessments → Environmental

**🔸 Create Environmental Assessment**
```
Test Data:
- Company: "Walmart Distribution Center #1234"
- Assessment Period: "December 2024"
- Energy Consumption: 50000 kWh
- Water Usage: 10000 liters
- Waste Generated: 500 kg
- Renewable Energy: 75%
- Carbon Emissions: 25000 kg CO2
- Recycling Rate: 85%

Expected Results:
✅ Environmental indicators calculated automatically
✅ Sustainability metrics displayed with charts
✅ Performance grades assigned (A/B/C/D/F)
✅ Assessment stored on blockchain
✅ Recommendations generated
```

#### 👥 **2.3 Social Assessment**
**Navigation**: Sidebar → Assessments → Social

**🔸 Create Social Assessment**
```
Test Data:
- Employee Count: 150
- Training Hours: 2400
- Safety Incidents: 0
- Community Projects: 5
- Diversity Score: 85%
- Worker Satisfaction: 90%

Expected Results:
✅ Social indicators calculated
✅ Compliance metrics displayed
✅ Social impact charts generated
✅ Assessment data stored
```

#### 📋 **2.4 Order Management**
**Navigation**: Sidebar → Orders (under Products)

**🔸 Create New Order**
```
Test Data:
- Product: Select "Eco-Friendly T-Shirt" (created above)
- Quantity: 1000 units
- Supplier: "GreenTex Manufacturing Inc."
- Expected Delivery: Next month
- Production Stages: 
  * Design & Planning
  * Material Sourcing
  * Manufacturing
  * Quality Control
  * Packaging
  * Shipping

Expected Results:
✅ Order created successfully
✅ Production workflow initiated
✅ Order ID generated
✅ Blockchain transaction confirmed
✅ Order status tracking enabled
```

#### 🚚 **2.5 Shipment Tracking**
**Navigation**: Sidebar → Shipments

**🔸 Add Shipment**
```
Test Data:
- Order: Select order created above
- Production Stage: "Manufacturing"
- Current Location: "Factory - 123 Industrial Ave, City"
- Status: "In Transit"
- Expected Arrival: Tomorrow
- Notes: "Quality inspection completed"

Expected Results:
✅ Shipment tracking initiated
✅ Location data captured and displayed
✅ Real-time status updates
✅ Integration with Google Maps (if configured)
✅ Shipment timeline updated
```

#### 🔬 **2.6 Life Cycle Inventory (LCI)**
**Navigation**: Sidebar → Assessments → LCI

**🔸 Create LCI Assessment**
```
Test Data:
- Product: "Eco-Friendly T-Shirt"
- Production Stage: "Manufacturing"
- Material Inputs:
  * Cotton: 2.5 kg
  * Dyes: 0.1 kg
  * Water: 50 liters
- Energy Inputs:
  * Electricity: 15 kWh
  * Natural Gas: 5 MJ
- Outputs:
  * Finished Product: 1 t-shirt
  * Waste Water: 45 liters
  * Solid Waste: 0.2 kg

Expected Results:
✅ LCI indicators calculated
✅ Material flow diagrams generated
✅ Environmental impact per unit calculated
✅ Integration with AI predictions
✅ Comparison with industry benchmarks
```

---

### **PHASE 3: Product Journey & Reporting (10-15 minutes)**

#### 🗺️ **3.1 Product Journey Visualization**
**Navigation**: Sidebar → Journey

**Test Actions:**
```
1. Select the order/product created earlier
2. View complete journey timeline
3. Check shipment locations on map
4. Review sustainability metrics per stage

Expected Results:
✅ Complete product journey displayed
✅ Interactive timeline with key milestones
✅ Geographic tracking on map
✅ Sustainability data at each stage
✅ Carbon footprint calculation per stage
✅ Supplier compliance status
```

#### 📊 **3.2 Reports Generation**
**Navigation**: Sidebar → Reports

**🔸 Environmental Reports**
```
Test Steps:
1. Select "Environmental Report"
2. Choose date range (last 3 months)
3. Select assessment type (All/Environmental/Social/LCI)
4. Generate report

Expected Results:
✅ Comprehensive environmental metrics
✅ Charts and graphs displaying trends
✅ Comparison with previous periods
✅ PDF export functionality
✅ Key performance indicators (KPIs)
```

**🔸 Supply Chain Transparency Report**
```
Expected Results:
✅ Complete supply chain visibility
✅ Supplier performance metrics
✅ Product journey summaries
✅ Sustainability compliance scores
✅ AI-generated insights and recommendations
```

---

### **PHASE 4: Advanced AI Integration Testing (10 minutes)**

#### 🧠 **4.1 Real-time AI Alerts**
**Test in AI Analytics:**
```
1. Create prediction with extreme values
2. Check for real-time alerts
3. Verify alert management system

Expected Results:
✅ Immediate alert notifications
✅ Alert categorization (Low/Medium/High/Critical)
✅ Actionable recommendations
✅ Alert history tracking
```

#### ⛓️ **4.2 Blockchain-AI Integration**
**Verification Steps:**
```
1. Make AI prediction
2. Check if prediction stored on blockchain
3. Verify data integrity
4. Test retrieval of historical predictions

Expected Results:
✅ AI predictions stored immutably
✅ Blockchain verification successful
✅ Historical data retrievable
✅ Data integrity maintained
```

---

## 🎯 **SUCCESS CRITERIA CHECKLIST**

### **AI Features** ✅
- [ ] Carbon predictions working with 85%+ accuracy
- [ ] Multiple ML models (Random Forest, XGBoost, Linear Regression) functioning
- [ ] Time series forecasting generating reasonable predictions
- [ ] Anomaly detection identifying outliers correctly
- [ ] AI recommendations relevant and actionable
- [ ] Dashboard widgets displaying real-time data

### **Blockchain Features** ✅
- [ ] Smart contracts deployed and functioning
- [ ] Product data stored immutably
- [ ] Assessment data recorded on blockchain
- [ ] Order and shipment tracking working
- [ ] AI predictions stored on-chain
- [ ] Transaction hashes generated for all operations

### **User Interface** ✅
- [ ] All navigation links working
- [ ] Forms submitting successfully
- [ ] Charts and visualizations displaying
- [ ] Responsive design on different screen sizes
- [ ] Error handling working properly
- [ ] Loading states displayed appropriately

### **Data Integration** ✅
- [ ] AI service communicating with backend
- [ ] Backend integrating with blockchain
- [ ] Frontend displaying real-time data
- [ ] Data consistency across all components
- [ ] APIs responding within acceptable time limits

---

## 🚨 **Troubleshooting Guide**

### **Common Issues & Solutions:**

**❌ Service Not Responding**
```bash
# Check service status
curl http://localhost:3001/health  # Backend
curl http://localhost:8001/health  # AI Service

# Restart services if needed
cd backend && npm start
cd ai_service && uvicorn main:app --reload --port 8001
```

**❌ Blockchain Connection Issues**
```bash
# Check Ganache status
ss -tulpn | grep 7545

# Redeploy contracts if needed
truffle migrate --reset
```

**❌ AI Predictions Not Working**
```bash
# Test AI service directly
curl -X POST "http://localhost:8001/predict-enhanced" \
  -H "Content-Type: application/json" \
  -d '{"features": [1000, 500, 800, 200, 75], "model_type": "random_forest"}'
```

**❌ Frontend Issues**
```bash
# Clear browser cache
# Check browser console for errors
# Verify all services are running
```

---

## 🎉 **Expected Testing Duration**

- **Total Time**: 60-75 minutes
- **Phase 1** (AI Features): 15-20 minutes
- **Phase 2** (Supply Chain): 20-25 minutes  
- **Phase 3** (Journey & Reports): 10-15 minutes
- **Phase 4** (Advanced AI): 10 minutes
- **Documentation & Verification**: 10-15 minutes

---

## 📝 **Testing Notes Template**

Use this template to document your testing:

```
## Test Session: [Date/Time]

### Phase 1 - AI Features
- [ ] Basic predictions: ✅/❌ (Notes: _______)
- [ ] Model comparison: ✅/❌ (Notes: _______)
- [ ] Forecasting: ✅/❌ (Notes: _______)
- [ ] Anomaly detection: ✅/❌ (Notes: _______)

### Phase 2 - Supply Chain
- [ ] Product creation: ✅/❌ (Notes: _______)
- [ ] Assessments: ✅/❌ (Notes: _______)
- [ ] Orders: ✅/❌ (Notes: _______)
- [ ] Shipments: ✅/❌ (Notes: _______)

### Phase 3 - Journey & Reports
- [ ] Journey visualization: ✅/❌ (Notes: _______)
- [ ] Report generation: ✅/❌ (Notes: _______)

### Phase 4 - Advanced Features
- [ ] Real-time alerts: ✅/❌ (Notes: _______)
- [ ] Blockchain integration: ✅/❌ (Notes: _______)

### Overall System Performance
- Response times: ______
- User experience: ______
- Issues found: ______
- Suggestions: ______
```

---

**🚀 START TESTING: Open http://localhost:3000 and follow this checklist step by step!**
