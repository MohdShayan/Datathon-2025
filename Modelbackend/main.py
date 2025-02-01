from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)  # Allow all origins

# Load the .pkl model
with open('pipelin.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    # Hardcoded values for fields not provided by the user
    hardcoded_values = {
        "Urban/Rural": "Urban",  # Example: Default to Urban
        "City": "New York",      # Example: Default to New York
        "Product Category": "Electronics",  # Example: Default to Electronics
        "Store Size": "Medium",   # Example: Default to Large
        "Promotions": "Yes",     # Example: Default to Yes
        "Household Size": 4,     # Example: Default to 4
        "City Population": 850000,  # Example: Default to 8.5 million
        "City GDP": 0.7,      # Example: Default to 150,000
        "Order Frequency": 8    # Example: Default to 12
    }

    # Create a DataFrame from the input data and hardcoded values
    sample_data = pd.DataFrame([{
        "Gender": data['gender'],
        "Urban/Rural": hardcoded_values["Urban/Rural"],
        "City": hardcoded_values["City"],
        "Product Category": hardcoded_values["Product Category"],
        "Store Size": hardcoded_values["Store Size"],
        "Promotions": hardcoded_values["Promotions"],
        "Age": data['age'],
        "Income": data['income'],
        "Household Size": hardcoded_values["Household Size"],
        "Total Bill": data['total_bill'],
        "Distance to Store": data['distance_to_store'],
        "City Population": hardcoded_values["City Population"],
        "City GDP": hardcoded_values["City GDP"],
        "Order Frequency": hardcoded_values["Order Frequency"],
        "Average Monthly Sales": data['average_monthly_sales']
    }])

    # Predict store type
    predicted_store_type = model.predict(sample_data)

    return jsonify({'prediction': predicted_store_type.tolist()})

if __name__ == '__main__':
    app.run(debug=True)