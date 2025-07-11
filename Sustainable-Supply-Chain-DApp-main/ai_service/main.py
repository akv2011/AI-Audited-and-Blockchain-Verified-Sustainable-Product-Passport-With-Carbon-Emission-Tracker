from fastapi import FastAPI
from pydantic import BaseModel
from models.carbon_model import predict_carbon

app = FastAPI(
    title="AI Sustainability Microservice",
    description="Provides carbon footprint predictions and sustainability analytics.",
    version="0.1.0"
)

class PredictRequest(BaseModel):
    features: list[float]

class PredictResponse(BaseModel):
    carbon_footprint: float

@app.post("/predict", response_model=PredictResponse)
def predict(request: PredictRequest):
    # TODO: Replace dummy logic with actual ML model inference
    prediction = predict_carbon(request.features)
    return {"carbon_footprint": prediction}

# Additional endpoints for scoring, recommendations, anomaly detection
@app.get("/health")
def health_check():
    return {"status": "ok"}

# To run: uvicorn main:app --reload --host 0.0.0.0 --port 8000
