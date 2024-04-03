
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import sys
import json
df = pd.read_excel('C:\\Users\\Lenovo\\OneDrive\\Desktop\\backend-projects\\task-weight management-app\\pythonScripts\\newfile.xlsx')
df['Can Do'] = df['Can Do'].map({'Can Do': 1, 'Cannot Do': 0})
X = df[['Weight']]
y = df['Can Do']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)

def receive_data():
    try:
        data_string = sys.argv[1]
        data = json.loads(data_string)
        return pd.DataFrame(data, columns=['Weight'])
    except (IndexError, json.JSONDecodeError) as e:
        print(f"Error receiving data: {e}")
        return None
data = receive_data()
if data is not None:
    predictions = model.predict(data)
    predictions_binary = [1 if val > 0.5 else 0 for val in predictions]
    print(json.dumps(predictions_binary))  
else:
    print(json.dumps([])) 