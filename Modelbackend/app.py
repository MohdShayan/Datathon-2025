
# from flask import Flask, jsonify, request
# from flask_cors import CORS
# import pandas as pd
# from statsmodels.tsa.arima.model import ARIMA

# app = Flask(__name__)
# CORS(app)

# def load_sales_data(filepath):
#     df = pd.read_csv(filepath)
#     df["Date"] = pd.to_datetime(df["Date"], format="%d-%m-%Y", errors="coerce")
#     df = df.dropna(subset=["Date"])
#     sales_data = df.groupby("Date")["Total Bill"].sum()
#     return sales_data

# def forecast_sales(data, steps=30):
#     model = ARIMA(data, order=(1, 0, 2))  # Adjust ARIMA parameters as needed
#     fitted_model = model.fit()
#     forecast = fitted_model.get_forecast(steps=steps)
    
#     forecast_index = pd.date_range(start=data.index[-1], periods=steps + 1, freq="D")[1:]
#     forecast_values = forecast.predicted_mean.tolist()
    
#     return {"dates": forecast_index.strftime("%Y-%m-%d").tolist(), "forecast": forecast_values}

# @app.route("/forecast", methods=["GET"])
# def get_forecast():
#     dataset_path = "Datasetttttttt1.csv"
#     sales_data = load_sales_data(dataset_path)

#     # Get forecast days from the frontend
#     days = int(request.args.get("days", 30))  # Default to 30 days if not provided
#     forecast_result = forecast_sales(sales_data, steps=days)

#     return jsonify(forecast_result)

# if __name__ == "__main__":
#     app.run(debug=True)
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

DATASET_PATH = os.path.join(UPLOAD_FOLDER, "uploaded_dataset.csv")

def load_sales_data(filepath):
    df = pd.read_csv(filepath)
    df["Date"] = pd.to_datetime(df["Date"], format="%d-%m-%Y", errors="coerce")
    df = df.dropna(subset=["Date"])
    sales_data = df.groupby("Date")["Total Bill"].sum()
    return sales_data

def forecast_sales(data, steps=30):
    model = ARIMA(data, order=(1, 0, 2))  # Adjust ARIMA parameters if needed
    fitted_model = model.fit()
    forecast = fitted_model.get_forecast(steps=steps)
    
    forecast_index = pd.date_range(start=data.index[-1], periods=steps + 1, freq="D")[1:]
    forecast_values = forecast.predicted_mean.tolist()
    
    return {"dates": forecast_index.strftime("%Y-%m-%d").tolist(), "forecast": forecast_values}

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"message": "No file part"}), 400

    file = request.files["file"]
    
    if file.filename == "":
        return jsonify({"message": "No selected file"}), 400

    if file and file.filename.endswith(".csv"):
        file.save(DATASET_PATH)
        return jsonify({"message": "File uploaded successfully"}), 200

    return jsonify({"message": "Invalid file format. Only CSV allowed!"}), 400

@app.route("/forecast", methods=["GET"])
def get_forecast():
    if not os.path.exists(DATASET_PATH):
        return jsonify({"message": "No dataset uploaded yet!"}), 400

    sales_data = load_sales_data(DATASET_PATH)

    days = int(request.args.get("days", 30))  # Default to 30 days
    forecast_result = forecast_sales(sales_data, steps=days)

    return jsonify(forecast_result)

if __name__ == "__main__":
    app.run(debug=True)

