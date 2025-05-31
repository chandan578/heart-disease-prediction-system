from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the trained model and scaler
model = joblib.load("heart_disease_model.pkl")
scaler = joblib.load("scaler.pkl")  

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get input data from request
        data = request.get_json()
        
        # Extract all 13 features
        features = np.array([data["features"]]).reshape(1, -1)

        # Scale input data
        scaled_features = scaler.transform(features)

        # Get prediction
        prediction = model.predict(scaled_features)[0]

        # Get probability (probability of class 1 = having heart disease)
        probability = model.predict_proba(scaled_features)[:, 1][0]

        return jsonify({"prediction": int(prediction), "probability": float(probability)})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)