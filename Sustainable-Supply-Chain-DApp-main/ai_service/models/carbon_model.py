import numpy as np
from sklearn.linear_model import LinearRegression

# Dummy training data
X_train = np.array([[1, 2], [2, 3], [3, 4], [4, 5]])
y_train = np.array([10, 20, 30, 40])

# Train a simple regression model at startup
model = LinearRegression()
model.fit(X_train, y_train)


def predict_carbon(features: list[float]) -> float:
    features_arr = np.array(features).reshape(1, -1)
    prediction = model.predict(features_arr)[0]
    return float(prediction)
