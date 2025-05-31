import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# 📌 Load Data
data = pd.read_csv("heart.csv")  

# 📌 Select **ALL** Features Based on Angular Form
features = ["age", "sex", "cp", "trestbps", "chol", "fbs", "restecg", "thalach", "exang", "oldpeak", "slope", "ca", "thal"]
X = data[features]  # Updated input features
y = data["target"]  # 1 = heart disease, 0 = no heart disease

# 📌 Train-Test Split (80-20)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 📌 Normalize Data Using StandardScaler
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# 📌 Train a Random Forest Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 📌 Evaluate Model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"✅ Model Accuracy: {accuracy:.2f}")

# 📌 Save the Model & Scaler for Deployment
joblib.dump(model, "heart_disease_model.pkl")   # Saves the trained model
joblib.dump(scaler, "scaler.pkl")               # Saves the scaler

print("✅ Model and Scaler saved successfully!")
