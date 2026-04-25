import pandas as pd
import time
import os

# Ensure the file exists
file = "crime_dataset_india.csv"

if not os.path.exists(file):
    # Create the initial CSV if it doesn't exist
    print(f"Creating {file} with initial data...")
    data = {
        'Date': ['2026-04-03'],
        'Title': ['System Simulation Initialized'],
        'Location': ['Server'],
        'Category': ['General'],
        'Description': ['Automatic data generator started.'],
        'Reported At': [time.strftime("%Y-%m-%d %H:%M:%S")]
    }
    df = pd.DataFrame(data)
    df.to_csv(file, index=False)

print(f"🚀 Simulation started. Appending rows to {file} every 10 seconds...")

while True:
    try:
        # Load the latest data
        df = pd.read_csv(file)

        # Pick a random row to duplicate (simulating a new similar incident)
        if len(df) > 0:
            new_row = df.sample(1)
            # Update the timestamp
            new_row['Reported At'] = time.strftime("%Y-%m-%d %H:%M:%S")
            new_row['Date'] = time.strftime("%Y-%m-%d")
            
            # Concatenate
            df = pd.concat([df, new_row], ignore_index=True)

            # Save
            df.to_csv(file, index=False)
            print(f"Added new simulated incident: {new_row['Title'].values[0]} at {new_row['Reported At'].values[0]}")
        else:
            print("CSV is empty. Add some data first.")

    except Exception as e:
        print(f"Error: {e}")

    time.sleep(10)
