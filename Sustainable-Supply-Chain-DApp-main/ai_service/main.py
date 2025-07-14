from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from models.carbon_model import (
    predict_carbon, detect_anomalies, forecast_carbon_trends, 
    predict_carbon_with_blockchain_data, get_available_models
)
from models.blockchain_integration import BlockchainDataIntegrator
from services.web3_service import web3_service
from services.notification_system import notification_system
from typing import List, Optional
import numpy as np

app = FastAPI(
    title="AI Sustainability Microservice",
    description="Advanced AI-powered sustainability analytics and predictions for supply chain management with blockchain integration and real-time alerts.",
    version="3.0.0"
)

# Initialize blockchain data integrator
blockchain_integrator = BlockchainDataIntegrator()

class PredictRequest(BaseModel):
    features: List[float]
    model_type: Optional[str] = "random_forest"

class PredictResponse(BaseModel):
    carbon_footprint: float
    confidence: float
    model_used: str
    recommendations: List[str]
    impact_level: str

class SustainabilityScoreRequest(BaseModel):
    energy_consumption: float
    renewable_energy_percentage: float
    waste_generated: float
    water_usage: float
    material_efficiency: float
    transportation_emissions: float

class SustainabilityScoreResponse(BaseModel):
    overall_score: float
    category_scores: dict
    grade: str
    recommendations: List[str]
    performance_level: str

class AnomalyDetectionRequest(BaseModel):
    features: List[float]

class AnomalyDetectionResponse(BaseModel):
    has_anomalies: bool
    anomalies: List[str]
    risk_level: str

@app.post("/predict", response_model=PredictResponse)
def predict_carbon_footprint(request: PredictRequest):
    """
    Predict carbon footprint using advanced ML models with automated alert checking
    Features expected: [transportation_distance, product_weight, energy_consumption, material_usage, renewable_energy_percentage]
    """
    try:
        result = predict_carbon(request.features, request.model_type)
        
        if "error" in result:
            raise HTTPException(status_code=400, detail=result["error"])
        
        # Check for alerts based on prediction
        carbon_value = result.get("carbon_footprint", 0)
        if carbon_value > 0:
            alert = notification_system.check_carbon_footprint(
                carbon_value, 
                context={"features": request.features, "model": request.model_type}
            )
            
            # Store prediction on blockchain
            prediction_data = {
                "type": "carbon_footprint",
                "features": request.features,
                "result": result,
                "confidence": result.get("confidence", 0),
                "model": request.model_type
            }
            web3_service.store_ai_prediction(prediction_data)
            
            # Add alert info to response if triggered
            if alert:
                result["alert_triggered"] = True
                result["alert_severity"] = alert.severity
                result["alert_message"] = alert.message
            else:
                result["alert_triggered"] = False
            
        return PredictResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.post("/sustainability-score", response_model=SustainabilityScoreResponse)
def calculate_sustainability_score(request: SustainabilityScoreRequest):
    """
    Calculate comprehensive sustainability score based on multiple factors
    """
    try:
        # Normalize scores to 0-100 scale
        energy_score = max(0, 100 - (request.energy_consumption / 10))  # Lower is better
        renewable_score = request.renewable_energy_percentage * 100      # Higher is better
        waste_score = max(0, 100 - (request.waste_generated / 5))       # Lower is better
        water_score = max(0, 100 - (request.water_usage / 20))          # Lower is better
        material_score = request.material_efficiency * 100              # Higher is better
        transport_score = max(0, 100 - (request.transportation_emissions / 15))  # Lower is better
        
        # Weight factors for different categories
        weights = {
            "energy": 0.2,
            "renewable": 0.15,
            "waste": 0.2,
            "water": 0.15,
            "material": 0.15,
            "transport": 0.15
        }
        
        category_scores = {
            "energy_efficiency": min(100, energy_score),
            "renewable_energy": min(100, renewable_score),
            "waste_management": min(100, waste_score),
            "water_conservation": min(100, water_score),
            "material_efficiency": min(100, material_score),
            "transportation": min(100, transport_score)
        }
        
        # Calculate weighted overall score
        overall_score = (
            category_scores["energy_efficiency"] * weights["energy"] +
            category_scores["renewable_energy"] * weights["renewable"] +
            category_scores["waste_management"] * weights["waste"] +
            category_scores["water_conservation"] * weights["water"] +
            category_scores["material_efficiency"] * weights["material"] +
            category_scores["transportation"] * weights["transport"]
        )
        
        # Determine grade
        if overall_score >= 85:
            grade = "A"
            performance_level = "Excellent"
        elif overall_score >= 70:
            grade = "B"
            performance_level = "Good"
        elif overall_score >= 55:
            grade = "C"
            performance_level = "Average"
        else:
            grade = "D"
            performance_level = "Needs Improvement"
        
        # Generate recommendations
        recommendations = []
        
        if category_scores["energy_efficiency"] < 60:
            recommendations.append("⚡ Implement energy efficiency programs to reduce consumption")
        if category_scores["renewable_energy"] < 50:
            recommendations.append("🌱 Increase renewable energy adoption in operations")
        if category_scores["waste_management"] < 70:
            recommendations.append("♻️ Enhance waste reduction and recycling initiatives")
        if category_scores["water_conservation"] < 65:
            recommendations.append("💧 Implement water conservation measures")
        if category_scores["material_efficiency"] < 60:
            recommendations.append("🔧 Optimize material usage and explore sustainable alternatives")
        if category_scores["transportation"] < 70:
            recommendations.append("🚛 Optimize logistics and reduce transportation emissions")
            
        if overall_score > 80:
            recommendations.append("🏆 Excellent sustainability performance - share best practices!")
        
        return SustainabilityScoreResponse(
            overall_score=round(overall_score, 1),
            category_scores=category_scores,
            grade=grade,
            recommendations=recommendations,
            performance_level=performance_level
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Score calculation failed: {str(e)}")

@app.post("/anomaly-detection", response_model=AnomalyDetectionResponse)
def detect_sustainability_anomalies(request: AnomalyDetectionRequest):
    """
    Detect anomalies in sustainability metrics
    """
    try:
        result = detect_anomalies(request.features)
        return AnomalyDetectionResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Anomaly detection failed: {str(e)}")

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "AI Sustainability Microservice",
        "version": "2.1.0",
        "features": [
            "carbon_footprint_prediction",
            "sustainability_scoring", 
            "anomaly_detection",
            "recommendations"
        ]
    }

@app.get("/models/info")
def get_models_info():
    """Get information about available AI models"""
    return {
        "available_models": {
            "carbon_prediction": {
                "linear": "Linear regression model for basic predictions",
                "random_forest": "Random Forest model for enhanced accuracy"
            }
        },
        "features_required": {
            "carbon_prediction": [
                "transportation_distance (km)",
                "product_weight (kg)", 
                "energy_consumption (kWh)",
                "material_usage (kg)",
                "renewable_energy_percentage (0-1)"
            ],
            "sustainability_score": [
                "energy_consumption",
                "renewable_energy_percentage", 
                "waste_generated",
                "water_usage",
                "material_efficiency",
                "transportation_emissions"
            ]
        }
    }

@app.post("/predict-enhanced")
def predict_carbon_enhanced(request: PredictRequest):
    """
    Enhanced carbon footprint prediction using blockchain historical data
    """
    try:
        # Get blockchain data for enhanced prediction
        enviro_data = web3_service.get_environmental_assessments()
        
        # Use enhanced prediction with blockchain context
        result = predict_carbon_with_blockchain_data(enviro_data, request.features)
        
        return {
            "carbon_footprint": result.get("carbon_footprint", 0),
            "confidence": result.get("confidence", 0),
            "model_used": result.get("model_used", request.model_type),
            "recommendations": result.get("recommendations", []),
            "impact_level": result.get("impact_level", "unknown"),
            "historical_average": result.get("historical_average"),
            "trend": result.get("trend"),
            "forecast_available": result.get("forecast_available", False),
            "blockchain_data_used": len(enviro_data) > 0
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Enhanced prediction failed: {str(e)}")

class ForecastRequest(BaseModel):
    forecast_days: Optional[int] = 30

@app.post("/forecast")
def carbon_forecast(request: ForecastRequest):
    """
    Generate carbon footprint forecasts using time series analysis
    """
    try:
        # Get historical environmental data from blockchain
        historical_data = web3_service.get_environmental_assessments(limit=100)
        
        # Convert to format expected by forecasting function
        forecast_data = []
        for data in historical_data:
            if isinstance(data, dict) and 'ghg' in data:
                forecast_data.append({
                    'date': data.get('date', '2024-01-01'),
                    'carbon_footprint': float(data.get('ghg', 50))
                })
        
        result = forecast_carbon_trends(forecast_data, request.forecast_days)
        
        return {
            "forecast": result.get("forecast", []),
            "trend": result.get("trend", "unknown"),
            "slope": result.get("slope", 0),
            "confidence": result.get("r_squared", 0),
            "historical_data_points": len(forecast_data),
            "error": result.get("error")
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Forecasting failed: {str(e)}")

@app.get("/blockchain/environmental-data")
def get_blockchain_environmental_data():
    """
    Fetch and analyze environmental data from blockchain
    """
    try:
        enviro_data = web3_service.get_environmental_assessments()
        analysis = blockchain_integrator.process_environmental_data(enviro_data)
        
        return {
            "success": True,
            "data_points": len(enviro_data),
            "analysis": analysis,
            "raw_data": enviro_data[:10]  # Return first 10 for preview
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch blockchain data: {str(e)}")

@app.get("/blockchain/products-analysis")
def get_blockchain_products_analysis():
    """
    Analyze product sustainability from blockchain data
    """
    try:
        products_data = web3_service.get_products_data()
        shipments_data = web3_service.get_shipments_data()
        
        analysis = {
            "total_products": len(products_data),
            "total_shipments": len(shipments_data),
            "products": products_data[:5],  # Sample products
            "average_shipping_distance": np.mean([s.get('distance', 0) for s in shipments_data]) if shipments_data else 0
        }
        
        return {
            "success": True,
            "analysis": analysis
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to analyze products: {str(e)}")

@app.get("/models/available")
def get_available_models_endpoint():
    """Get list of available AI models"""
    return {
        "carbon_prediction_models": get_available_models(),
        "features_info": {
            "transportation_distance": "Distance in kilometers",
            "product_weight": "Weight in kilograms", 
            "energy_consumption": "Energy in kWh",
            "material_usage": "Materials in kilograms",
            "renewable_energy_percentage": "Percentage as decimal (0-1)"
        }
    }

class AlertRequest(BaseModel):
    thresholds: dict
    monitoring_enabled: bool = True

@app.post("/alerts/configure")
def configure_sustainability_alerts(request: AlertRequest):
    """
    Configure sustainability monitoring alerts
    """
    try:
        # This would typically store alert configurations in a database
        # For now, return a confirmation
        return {
            "success": True,
            "message": "Alert thresholds configured successfully",
            "thresholds": request.thresholds,
            "monitoring": request.monitoring_enabled
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Alert configuration failed: {str(e)}")

@app.get("/dashboard/widgets")
def get_dashboard_widgets():
    """
    Get real-time sustainability dashboard data
    """
    try:
        # Get recent blockchain data
        enviro_data = web3_service.get_environmental_assessments(limit=10)
        
        # Calculate dashboard metrics
        if enviro_data:
            avg_carbon = np.mean([float(d.get('ghg', 0)) for d in enviro_data if 'ghg' in d])
            avg_energy = np.mean([float(d.get('energy', 0)) for d in enviro_data if 'energy' in d])
            renewable_ratio = np.mean([
                float(d.get('renewenergy', 0)) / max(float(d.get('energy', 1)), 1) 
                for d in enviro_data if 'energy' in d and 'renewenergy' in d
            ])
        else:
            avg_carbon, avg_energy, renewable_ratio = 0, 0, 0
        
        widgets = {
            "carbon_footprint": {
                "current": round(avg_carbon, 2),
                "target": 60.0,
                "status": "good" if avg_carbon < 60 else "warning" if avg_carbon < 100 else "critical",
                "trend": "improving"
            },
            "renewable_energy": {
                "percentage": round(renewable_ratio * 100, 1),
                "target": 50.0,
                "status": "good" if renewable_ratio > 0.5 else "warning" if renewable_ratio > 0.3 else "critical"
            },
            "energy_efficiency": {
                "current": round(avg_energy, 2),
                "target": 120.0,
                "status": "good" if avg_energy < 120 else "warning" if avg_energy < 180 else "critical"
            },
            "sustainability_score": {
                "overall": round(85 - (avg_carbon * 0.3), 1),  # Simple calculation
                "grade": "A" if avg_carbon < 60 else "B" if avg_carbon < 100 else "C"
            }
        }
        
        return {
            "success": True,
            "widgets": widgets,
            "last_updated": "2024-12-20T10:00:00Z",
            "data_points": len(enviro_data)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Dashboard data failed: {str(e)}")

@app.get("/alerts/active")
def get_active_alerts():
    """Get all active sustainability alerts"""
    try:
        alerts = notification_system.get_active_alerts()
        summary = notification_system.get_alert_summary()
        
        return {
            "success": True,
            "alerts": alerts,
            "summary": summary,
            "total_active": len(alerts)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get alerts: {str(e)}")

@app.post("/alerts/resolve/{alert_id}")
def resolve_alert(alert_id: str, resolution_notes: str = ""):
    """Resolve an active alert"""
    try:
        success = notification_system.resolve_alert(alert_id, resolution_notes)
        
        if success:
            return {
                "success": True,
                "message": f"Alert {alert_id} resolved successfully"
            }
        else:
            raise HTTPException(status_code=404, detail="Alert not found")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to resolve alert: {str(e)}")

@app.post("/alerts/configure-thresholds")
def configure_alert_thresholds(thresholds: dict):
    """Configure alert thresholds for different metrics"""
    try:
        notification_system.update_thresholds(thresholds)
        
        return {
            "success": True,
            "message": "Alert thresholds updated successfully",
            "thresholds": notification_system.alert_thresholds
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update thresholds: {str(e)}")

@app.get("/system/health-comprehensive")
def comprehensive_health_check():
    """Comprehensive system health check including AI models, blockchain, and alerts"""
    try:
        # Check AI models
        available_models = get_available_models()
        
        # Check blockchain connection
        try:
            enviro_data = web3_service.get_environmental_assessments(limit=1)
            blockchain_status = "connected" if enviro_data else "disconnected"
        except:
            blockchain_status = "error"
        
        # Get alert summary
        alert_summary = notification_system.get_alert_summary()
        
        # Get recent predictions
        recent_predictions = web3_service.get_blockchain_predictions(limit=5)
        
        return {
            "status": "healthy",
            "timestamp": "2024-12-20T10:00:00Z",
            "components": {
                "ai_models": {
                    "status": "operational",
                    "available_models": available_models,
                    "model_count": len(available_models)
                },
                "blockchain": {
                    "status": blockchain_status,
                    "connection": "local_ganache" if blockchain_status == "connected" else "none"
                },
                "notification_system": {
                    "status": "operational",
                    "active_alerts": alert_summary["active"],
                    "critical_alerts": alert_summary["by_severity"]["critical"]
                },
                "prediction_storage": {
                    "status": "operational",
                    "recent_predictions": len(recent_predictions)
                }
            },
            "metrics": {
                "total_alerts": alert_summary["total"],
                "active_alerts": alert_summary["active"],
                "predictions_stored": len(recent_predictions)
            }
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
            "timestamp": "2024-12-20T10:00:00Z"
        }

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Enhanced AI Sustainability Microservice...")
    print("📊 Features: Advanced ML, Blockchain Integration, Real-time Alerts")
    print("🔗 Blockchain: Smart contract integration for audit trail")
    print("🚨 Alerts: Real-time sustainability monitoring")
    uvicorn.run(app, host="0.0.0.0", port=8000)
