# Crime in India Analytics Dashboard

A Full-Stack Data Analytics web application that provides live, interactive visualizations of crime data in India. 

## 🌟 Overview
This project was built to process, analyze, and visualize a large dataset of crime incidents. It features a modern web dashboard where users can view interactive charts, as well as a live reporting system where new crime incidents can be submitted securely to a cloud database.

The visualizations are built in **Tableau** and embedded into a dynamic frontend. When new data is submitted via the custom frontend form, it routes through a backend API directly into a **Google Sheets** database, which live-syncs with the Tableau dashboard.

## 🏗️ Architecture Stack
* **Frontend:** React (Vite)
* **Backend API:** Node.js, Express
* **Database / Cloud Storage:** Google Sheets API (via `google-spreadsheet`)
* **Analytics Engine:** Tableau Public
* **Styling:** Vanilla CSS 

## ✨ Key Features
* **Interactive Tableau Dashboards:** Maps, heatmaps, stacked bar charts, and line graphs showing temporal and geographical trends.
* **Live Data Pipeline:** A custom reporting form that automatically injects structured data into Google Sheets.
* **Automated Data Formatting:** The backend normalizes timestamps and formats data to align precisely with Tableau schema expectations.
* **Scalable Storage:** Offloads heavy data management by using Google Sheets as a cloud-hosted JSON/CSV equivalent.

## 🚀 How to Run Locally

### 1. Start the Backend
Navigate to the backend directory, install dependencies, and run the Express server:
```bash
cd crime-dashboard-backend
npm install
npm start
```
*(Note: Requires a `google-credentials.json` service account key placed in the backend root directory).*

### 2. Start the Frontend
In a new terminal window, navigate to the frontend directory:
```bash
cd crime-dashboard-frontend
npm install
npm run dev
```

### 3. View the App
Open your browser and navigate to `http://localhost:5173`. 

---
*Developed by Vamsi Vyas*
