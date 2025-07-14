import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
import pandas as pd
# New imports for enhanced models
try:
    import xgboost as xgb
    XGBOOST_AVAILABLE = True
except ImportError:
    XGBOOST_AVAILABLE = False
    print("XGBoost not available. Installing...")

from datetime import datetime, timedelta
from typing import List, Dict, Any

# Enhanced training data for carbon footprint prediction
# Features: [transportation_distance, product_weight, energy_consumption, material_usage, renewable_energy_percentage]
X_train = np.array([
    [100, 2, 50, 10, 0.2],    # Low impact
    [250, 5, 120, 25, 0.1],   # Medium impact  
    [500, 10, 200, 50, 0.05], # High impact
    [150, 3, 80, 15, 0.3],    # Medium-low impact
    [300, 7, 150, 35, 0.15],  # Medium-high impact
    [50, 1, 30, 5, 0.5],      # Very low impact
    [800, 15, 300, 80, 0.02], # Very high impact
    [200, 4, 100, 20, 0.25],  # Medium impact
    [600, 12, 250, 60, 0.08], # High impact
    [75, 1.5, 40, 8, 0.4]     # Low impact
])

# Carbon footprint in kg CO2e
y_train = np.array([25, 65, 120, 35, 85, 15, 180, 50, 140, 20])

# Train multiple models
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)

# Linear regression model
linear_model = LinearRegression()
linear_model.fit(X_train_scaled, y_train)

# Random Forest model (more sophisticated)
rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model.fit(X_train_scaled, y_train)

# XGBoost model (if available)
if XGBOOST_AVAILABLE:
    xgb_model = xgb.XGBRegressor(
        n_estimators=100,
        max_depth=6,
        learning_rate=0.1,
        random_state=42
    )
    xgb_model.fit(X_train_scaled, y_train)
else:
    xgb_model = None

def predict_carbon(features: list[float], model_type: str = "random_forest") -> dict:
    """
    Predict carbon footprint using multiple models
    
    Args:
        features: List of features [transportation_distance, product_weight, energy_consumption, material_usage, renewable_energy_percentage]
        model_type: Type of model to use ("linear", "random_forest", or "xgboost")
    
    Returns:
        Dictionary with prediction and confidence metrics
    """
    try:
        # Ensure we have the right number of features
        if len(features) < 5:
            # Pad with default values if not enough features
            features = features + [0] * (5 - len(features))
        elif len(features) > 5:
            # Take only first 5 features
            features = features[:5]
            
        features_arr = np.array(features).reshape(1, -1)
        features_scaled = scaler.transform(features_arr)
        
        if model_type == "linear":
            prediction = linear_model.predict(features_scaled)[0]
            confidence = 0.75  # Static confidence for linear model
        elif model_type == "xgboost" and XGBOOST_AVAILABLE:
            prediction = xgb_model.predict(features_scaled)[0]
            # XGBoost confidence based on prediction interval
            preds = xgb_model.predict(features_scaled, pred_contribs=True)
            confidence = min(0.95, 0.6 + np.mean(preds) * 0.5)
        else:
            prediction = rf_model.predict(features_scaled)[0]
            # Calculate confidence based on feature importance and variance
            feature_importance = rf_model.feature_importances_
            confidence = min(0.95, 0.6 + np.mean(feature_importance) * 0.5)
        
        # Calculate sustainability recommendations
        recommendations = generate_recommendations(features, prediction)
        
        return {
            "carbon_footprint": float(max(0, prediction)),
            "confidence": float(confidence),
            "model_used": model_type,
            "recommendations": recommendations,
            "impact_level": categorize_impact(prediction)
        }
        
    except Exception as e:
        return {
            "carbon_footprint": 0.0,
            "confidence": 0.0,
            "model_used": model_type,
            "error": str(e),
            "recommendations": [],
            "impact_level": "unknown"
        }

def categorize_impact(carbon_footprint: float) -> str:
    """Categorize the environmental impact level"""
    if carbon_footprint < 30:
        return "low"
    elif carbon_footprint < 80:
        return "medium"
    elif carbon_footprint < 150:
        return "high"
    else:
        return "very_high"

def generate_recommendations(features: list[float], carbon_footprint: float) -> list[str]:
    """Generate sustainability recommendations based on input features"""
    recommendations = []
    
    if len(features) >= 5:
        transportation_distance, product_weight, energy_consumption, material_usage, renewable_energy_percentage = features[:5]
        
        # Transportation recommendations
        if transportation_distance > 300:
            recommendations.append("🚛 Consider optimizing transportation routes or using local suppliers to reduce shipping distance")
        
        # Energy recommendations  
        if renewable_energy_percentage < 0.3:
            recommendations.append("🌱 Increase renewable energy usage in production (current: {:.1%})".format(renewable_energy_percentage))
        
        # Efficiency recommendations
        if energy_consumption > 150:
            recommendations.append("⚡ Implement energy efficiency measures to reduce power consumption")
            
        if material_usage > 40:
            recommendations.append("♻️ Explore material reduction strategies or use of recycled materials")
            
        # Overall impact recommendations
        if carbon_footprint > 100:
            recommendations.append("🎯 High carbon footprint detected - prioritize emission reduction initiatives")
        elif carbon_footprint < 25:
            recommendations.append("✅ Excellent sustainability performance - maintain current practices")
    
    return recommendations

def detect_anomalies(features: list[float]) -> dict:
    """Detect potential anomalies in sustainability metrics"""
    anomalies = []
    
    if len(features) >= 5:
        transportation_distance, product_weight, energy_consumption, material_usage, renewable_energy_percentage = features[:5]
        
        # Check for unusual patterns
        if transportation_distance > 1000:
            anomalies.append("Unusually high transportation distance detected")
            
        if energy_consumption / product_weight > 50:
            anomalies.append("High energy consumption per unit weight - potential efficiency issue")
            
        if renewable_energy_percentage > 1.0:
            anomalies.append("Invalid renewable energy percentage (>100%)")
            
        if material_usage / product_weight > 20:
            anomalies.append("High material usage ratio - review material efficiency")
    
    return {
        "has_anomalies": len(anomalies) > 0,
        "anomalies": anomalies,
        "risk_level": "high" if len(anomalies) > 2 else "medium" if len(anomalies) > 0 else "low"
    }

def forecast_carbon_trends(historical_data: List[Dict], forecast_days: int = 30) -> Dict:
    """
    Forecast carbon footprint trends using time series analysis
    
    Args:
        historical_data: List of dictionaries with 'date' and 'carbon_footprint' keys
        forecast_days: Number of days to forecast ahead
    
    Returns:
        Dictionary with forecast data and trends
    """
    try:
        if len(historical_data) < 3:
            return {
                "error": "Insufficient historical data for forecasting",
                "forecast": [],
                "trend": "unknown"
            }
        
        # Convert to DataFrame
        df = pd.DataFrame(historical_data)
        df['date'] = pd.to_datetime(df['date'])
        df = df.sort_values('date')
        
        # Simple linear trend forecasting
        X = np.arange(len(df)).reshape(-1, 1)
        y = df['carbon_footprint'].values
        
        trend_model = LinearRegression()
        trend_model.fit(X, y)
        
        # Generate forecast
        future_X = np.arange(len(df), len(df) + forecast_days).reshape(-1, 1)
        forecast_values = trend_model.predict(future_X)
        
        # Generate future dates
        last_date = df['date'].iloc[-1]
        future_dates = [last_date + timedelta(days=i+1) for i in range(forecast_days)]
        
        # Calculate trend
        slope = trend_model.coef_[0]
        if slope > 0.5:
            trend = "increasing"
        elif slope < -0.5:
            trend = "decreasing"
        else:
            trend = "stable"
        
        forecast_data = [
            {
                "date": date.isoformat(),
                "predicted_carbon_footprint": max(0, float(value)),
                "confidence": 0.70  # Basic confidence for linear trend
            }
            for date, value in zip(future_dates, forecast_values)
        ]
        
        return {
            "forecast": forecast_data,
            "trend": trend,
            "slope": float(slope),
            "r_squared": trend_model.score(X, y),
            "current_average": float(np.mean(y[-7:])) if len(y) >= 7 else float(np.mean(y))
        }
        
    except Exception as e:
        return {
            "error": f"Forecasting failed: {str(e)}",
            "forecast": [],
            "trend": "unknown"
        }

def predict_carbon_with_blockchain_data(blockchain_data: List[Dict], features: List[float]) -> Dict:
    """
    Enhanced prediction using blockchain historical data for context
    
    Args:
        blockchain_data: Historical environmental data from blockchain
        features: Current prediction features
    
    Returns:
        Enhanced prediction with historical context
    """
    try:
        # Get base prediction
        base_prediction = predict_carbon(features)
        
        if not blockchain_data:
            return base_prediction
        
        # Analyze historical trends
        historical_carbon = []
        for data in blockchain_data:
            if 'ghg' in data and 'date' in data:
                historical_carbon.append({
                    'date': data['date'],
                    'carbon_footprint': float(data['ghg'])
                })
        
        if len(historical_carbon) >= 3:
            forecast_result = forecast_carbon_trends(historical_carbon)
            
            # Enhance prediction with trend analysis
            current_avg = forecast_result.get('current_average', 0)
            predicted_value = base_prediction['carbon_footprint']
            
            # Adjust prediction based on historical trends
            if forecast_result['trend'] == 'decreasing':
                adjusted_prediction = predicted_value * 0.95  # Slight improvement expected
                trend_confidence = 0.85
            elif forecast_result['trend'] == 'increasing':
                adjusted_prediction = predicted_value * 1.05  # Slight degradation expected
                trend_confidence = 0.75
            else:
                adjusted_prediction = predicted_value
                trend_confidence = 0.80
            
            return {
                **base_prediction,
                "carbon_footprint": float(adjusted_prediction),
                "confidence": float(trend_confidence),
                "historical_average": float(current_avg),
                "trend": forecast_result['trend'],
                "forecast_available": True
            }
        
        return base_prediction
        
    except Exception as e:
        base_prediction['error'] = f"Enhanced prediction failed: {str(e)}"
        return base_prediction

def get_available_models() -> List[str]:
    """Return list of available ML models"""
    models = ["linear", "random_forest"]
    if XGBOOST_AVAILABLE and xgb_model is not None:
        models.append("xgboost")
    return models
