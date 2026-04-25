const express = require('express');
const cors = require('cors');
const { ensureExcelFile, addNewsToExcel } = require('./excel_manager');
const { addNewsToGoogleSheet } = require('./google_sheets_manager');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Initialize Excel file on start
ensureExcelFile().then(() => {
  console.log('✅ Excel file initialized and ready at crime_data.xlsx');
}).catch(err => {
  console.error('❌ Failed to initialize Excel file:', err);
});

// API endpoint to add new news/incident
app.post('/api/report', async (req, res) => {
  try {
    const data = req.body;
    
    if (!data.city || !data.crimeDomain || !data.crimeDescription) {
      return res.status(400).json({ error: 'City, Crime Domain, and Crime Description are required.' });
    }

    // Commented out local excel/csv writing since we migrated the schema fully to Google Sheets
    // await addNewsToExcel(data); 
    await addNewsToGoogleSheet(data);
    
    res.status(200).json({ message: 'Incident reported successfully! The database/Excel and Google Sheets have been updated.' });
  } catch (err) {
    console.error('Error reporting incident:', err);
    res.status(500).json({ error: 'Internal server error while updating the database.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
