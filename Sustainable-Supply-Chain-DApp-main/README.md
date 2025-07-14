# AI-Powered Walmart Sustainable Supply Chain DApp 🌱🤖

<div align="center">
  <img src="https://logos-world.net/wp-content/uploads/2020/09/Walmart-Logo.png" width="300" alt="Walmart Logo">
  <h3>AI-Enhanced Blockchain-Powered Sustainable Supply Chain Management</h3>
  <p><strong>Powering Walmart's commitment to sustainability through AI and blockchain technology</strong></p>
</div>

## About
The AI-Powered Walmart Sustainable Supply Chain DApp is an advanced system that combines artificial intelligence with blockchain technology to measure, predict, and optimize the environmental and social performance of Walmart's global supply chain network. This innovative information system collects data from Walmart's supply chain partners, uses AI to assess and predict sustainability performance, and provides actionable insights to stakeholders for strategic decision-making.

The AI-enhanced blockchain-powered system enables Walmart to:
- **Prove product origin** with immutable blockchain records
- **Predict carbon emissions** using advanced machine learning models
- **Track and trace** product journeys throughout the entire supply chain
- **Measure product lifecycle inventory** with AI-powered precision
- **Ensure supplier compliance** with automated AI auditing
- **Provide transparency** to customers about product sustainability
- **Generate real-time recommendations** for sustainability improvements
- **Detect anomalies** in supply chain operations automatically

<div align="center">
  <img src="https://corporate.walmart.com/content/corporate/en_us/purpose/esgreport/sustainability/_jcr_content/par/columncontrol_1988953659/par1/textimage_430530435/image.img.jpg/1620316474889.jpg" width="600" alt="Walmart Sustainability Initiative">
</div>

## 🏗️ System Architecture

Our AI-Enhanced Decision Support System (DSS) is specifically designed for Walmart's complex supply chain ecosystem and comprises four integrated components:

1. **AI/ML Model Base**: Advanced machine learning algorithms for carbon prediction, sustainability scoring, anomaly detection, and time series forecasting aligned with Walmart's sustainability goals
2. **Blockchain Database**: Immutable data storage with smart contracts for AI predictions, ensuring transparency and traceability across Walmart's supplier network  
3. **Microservices Architecture**: Python FastAPI AI service integrated with Node.js backend for scalable data processing
4. **React-Based User Interface**: Intuitive dashboard with AI analytics, real-time widgets, and predictive insights for Walmart associates and suppliers

### 🤖 AI/ML Features
- **Carbon Emission Prediction**: Multiple ML models (Random Forest, XGBoost, Linear Regression) for accurate carbon footprint forecasting
- **Sustainability Scoring**: AI-powered sustainability assessment with weighted environmental factors
- **Anomaly Detection**: Real-time identification of unusual patterns in supply chain operations
- **Time Series Forecasting**: Predictive analytics for future sustainability trends
- **Smart Recommendations**: AI-generated actionable insights for sustainability improvements
- **Real-time Alerts**: Automated notification system for critical sustainability thresholds

<div align="center">
  <img src="https://user-images.githubusercontent.com/44509698/234395807-fe548331-02ab-4644-8938-9fe63077f22a.png" width="600">
  <p><em>Walmart Supply Chain DApp Architecture</em></p>
</div>

### 🛠️ Technology Stack

Library | Version | Use | Walmart Integration
------------ | ------------- | ------------- | -------------
Truffle | 5.3.5 | Compile/deploy/test contracts, Ganache for running local test node | Smart contract development for Walmart supplier verification
Solidity | 0.5.16 | Compile contracts | Blockchain logic for supply chain transparency and AI predictions
Node | 16.17.0 | Build React UI and backend API | Frontend and backend development for Walmart associates
Web3 | 1.3.5 | Connect UI to EVM | Blockchain connectivity for real-time data
React | 18.2.0 | User interface | Dashboard for Walmart sustainability metrics and AI analytics
Python | 3.11+ | AI/ML microservice | FastAPI service for machine learning predictions
FastAPI | 0.104.1 | AI service framework | RESTful API for AI/ML endpoints
Scikit-learn | 1.3.2 | Machine learning | Carbon prediction and sustainability scoring
XGBoost | 2.0.2 | Advanced ML | High-performance gradient boosting for predictions
Pandas | 2.1.4 | Data processing | Data manipulation and analysis for AI models

## 🔄 Walmart Supply Chain Workflow
This diagram shows how Walmart and its suppliers interact with the sustainable supply chain system:

<div align="center">
  <img src="https://user-images.githubusercontent.com/44509698/234407614-6d68b711-a044-4140-a40f-97bdb38d82ab.jpg" width="900">
  <p><em>Walmart Supplier Network Integration Flow</em></p>
</div>

### 🌍 Environmental Assessment for Walmart Suppliers

Walmart suppliers and the company itself conduct comprehensive environmental assessments to measure monthly and annual sustainability performance against Walmart's Project Gigaton goals.

<div align="center">
  <img src="https://user-images.githubusercontent.com/44509698/227777345-93a637b8-710e-470a-abdc-26c63749abf8.png" width="800">
  <p><em>Walmart Supplier Assessment Dashboard</em></p>
</div>

The focal company enters information into the environmental assessment form. After submitting the assessment form, the system automatically calculates sustainability indicators.

<img src="https://user-images.githubusercontent.com/44509698/234398157-beb5eb14-d91e-4019-84af-854716af99c4.png" width="700">
<img src="https://user-images.githubusercontent.com/44509698/234396794-0e21629f-9204-43cc-837e-33f23017deb0.png" width="700"> 

The focal company or suppliers can display the environmental and social sustainability indicators with charts. In the charts, indicators are grouped according to similarities of their measurement units or their contexts. Also, in the chart section various sustainability assessments can be viewed at the same time or can be filtered by month or year. Thus, stakeholders can analyze and compare their past performances and evaluate their sustainability progress. 

<img src="https://user-images.githubusercontent.com/44509698/227777426-274c8fca-a181-453a-99c5-6e401831cfdc.png" width="800">
<img src="https://user-images.githubusercontent.com/44509698/234384044-3862be5b-68d0-476d-8623-953d8cc00e86.jpg" width="800">

When the focal company and all of its suppliers have completed their environmental and social assessments, the company creates orders. To create an order, the focal company first must create a digital record of the product. The image of the product is uploaded to IPFS.
<img src="https://user-images.githubusercontent.com/44509698/227777549-61a27643-3880-420b-8485-c350b5b89ad3.png" width="700">
<img src="https://user-images.githubusercontent.com/44509698/234409672-5692d813-8c30-4379-98ca-f55a404e2533.jpg" width="700">

After registering the product, the focal company creates an order. In this scenario, production of 1000 t-shirts are ordered. The permission to add products and orders is only given to the focal company.

<img src="https://user-images.githubusercontent.com/44509698/234399310-7c2d04db-2888-4572-903e-574b23d5b6eb.png" width="800">

Later, the suppliers’ send or receive the shipments of the order. When sending or receiving the shipments, each supplier selects the order and their production stage. As shipment is sent or received the real-time location (latitude and longitude), descriptive name of the location and the time information is obtained and displayed via Google API.

<img src="https://user-images.githubusercontent.com/44509698/234400211-8e04e1fa-30e3-44f8-b22f-8f4d800be65d.png" width="700">
<img src="https://user-images.githubusercontent.com/44509698/234400083-c3f05b9c-1e0b-4990-8232-9ca491e942e9.png" width="700">

The life cycle inventory for each product can be done after relevant production stages are completed. The company or the suppliers enter information to LCI form of the material flow for their production stage (Figure 27). After submitting the form, the system automatically calculates LCI indicators.

<img src="https://user-images.githubusercontent.com/44509698/234405656-7ce70961-4a52-4fac-8646-a510b124da20.png" width="700">

From the reports page, stakeholders can view the LCI analysis chart. All the product production stages are displayed in the x axis of each chart. With these informations stakeholders can detect inefficacies in their production processes and find out about the environmental impact of each production processes. 

<img src="https://user-images.githubusercontent.com/44509698/234405599-95fcea5e-6376-4e2c-b3d8-04c7ad638d57.png" width="800">

Finally, when the order is completed, customers can see the entire product journey; the shipment locations and time, production stages. They can also display the environmental footprint of each product and the environmental and social sustainability assessment of suppliers and the focal company. 

<img src="https://user-images.githubusercontent.com/44509698/227777379-5d3bcce2-d824-4133-955d-120c4c1a4a71.png" width="800">

## 🎯 Walmart-Specific Features

### Project Gigaton Integration with AI Enhancement
This DApp directly supports Walmart's Project Gigaton initiative by:
- **AI-Powered Carbon Prediction**: Machine learning models predicting carbon emissions with 85%+ accuracy
- **Smart Energy Optimization**: AI recommendations for renewable energy adoption
- **Predictive Waste Reduction**: Forecasting waste generation and optimization opportunities
- **Intelligent Agriculture Monitoring**: AI-driven sustainable farming practice recommendations

### AI-Enhanced Supplier Management
- **Automated AI Auditing**: Machine learning models for continuous compliance monitoring
- **Predictive Risk Assessment**: Early warning system for sustainability risks
- **Real-time AI Dashboard**: Live widgets showing AI predictions and recommendations
- **Smart Contract Integration**: Blockchain storage of AI predictions and alerts
- **Anomaly Detection**: Automatic identification of unusual sustainability patterns

### Advanced Customer Intelligence
- **AI Sustainability Scoring**: Machine learning-powered product sustainability ratings
- **Predictive Impact Modeling**: Forecasting environmental impact of purchases
- **Smart Recommendations**: AI-generated suggestions for sustainable alternatives
- **Blockchain-Verified AI Claims**: Immutable proof of AI-generated sustainability insights

## 🚀 Getting Started

### Prerequisites
- Node.js 16.17.0 or higher
- Python 3.11 or higher
- Truffle Suite
- MetaMask browser extension
- Git

### Quick Setup
For detailed setup instructions, please see **[HOW_TO_RUN.md](./HOW_TO_RUN.md)** which provides comprehensive step-by-step instructions for:
- Environment setup
- Service configuration
- Testing procedures
- Troubleshooting

### Installation Overview
```bash
# Clone the repository
git clone [repository-url]
cd walmart-sustainable-supply-chain-dapp

# Install Node.js dependencies
npm install

# Install Python AI service dependencies
cd ai_service
pip install -r requirements.txt

# Install backend dependencies
cd ../backend
npm install

# Start all services (see HOW_TO_RUN.md for details)
# 1. Start blockchain (Ganache)
# 2. Deploy contracts
# 3. Start AI microservice
# 4. Start backend API
# 5. Start React frontend
```

### Deployment
```bash
# Build for production
npm run build

# Deploy smart contracts
truffle migrate --network [network_name]
```

## 📊 AI-Powered Sustainability Metrics Dashboard

The enhanced dashboard provides real-time AI insights into:
- **AI Carbon Predictions**: Machine learning forecasts of emission trends with confidence intervals
- **Smart Energy Recommendations**: AI-driven renewable energy adoption strategies
- **Predictive Waste Analytics**: Forecasting waste generation and reduction opportunities
- **Anomaly Detection Alerts**: Real-time identification of sustainability performance outliers
- **Sustainability Scoring**: AI-calculated composite sustainability ratings
- **Time Series Forecasting**: Predictive models for future sustainability performance
- **Blockchain Data Integration**: On-chain AI predictions and verification

### 🤖 AI Analytics Features
- **Multiple ML Models**: Random Forest, XGBoost, and Linear Regression for diverse prediction needs
- **Real-time Widgets**: Live dashboard showing AI predictions and recommendations
- **Interactive Forecasting**: Configurable time series predictions with visual charts
- **Alert Management**: Real-time notification system for critical sustainability thresholds
- **Model Performance Metrics**: Accuracy scores and confidence intervals for AI predictions

## 🤝 Contributing

This project is developed for Walmart's sustainability initiatives. For contribution guidelines, please contact the Walmart Supply Chain Technology Team.

## 📞 Support

For technical support and questions about this DApp:
- **Email**: supply-chain-tech@walmart.com
- **Documentation**: [Internal Walmart Documentation Portal]
- **Slack**: #sustainability-dapp-support

---

<div align="center">
  <img src="https://logos-world.net/wp-content/uploads/2020/09/Walmart-Logo.png" width="150" alt="Walmart Logo">
  <p><strong>Powering a more sustainable future through technology</strong></p>
  <p>© 2025 Walmart Inc. All Rights Reserved.</p>
</div>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
