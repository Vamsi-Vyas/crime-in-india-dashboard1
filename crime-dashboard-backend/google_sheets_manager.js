const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const creds = require('./google-credentials.json');

const SPREADSHEET_ID = '18BiyFoDHop-GVvz22c9JcNyJdvwQ4pDnNCKcxWNUCIA';

const serviceAccountAuth = new JWT({
  email: creds.client_email,
  key: creds.private_key,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});

const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

function formatToDDMMYYYY(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return dateStr || 'N/A';
  const parts = dateStr.split('-');
  if (parts.length === 3 && parts[0].length === 4) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`; // Convert YYYY-MM-DD to DD-MM-YYYY
  }
  return dateStr;
}

async function addNewsToGoogleSheet(data) {
  try {
    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[0]; // takes the first sheet
    
    // Add row (keys must match the headers exactly)
    await sheet.addRow({
      'Report Number': data.reportNumber || 'N/A',
      'Date Reported': formatToDDMMYYYY(data.dateReported),
      'Date of Occurrence': formatToDDMMYYYY(data.dateOfOccurrence),
      'Time of Occurrence': data.timeOfOccurrence || 'N/A',
      'City': data.city || 'Unknown',
      'Crime Code': data.crimeCode || 'N/A',
      'Crime Description': data.crimeDescription || 'No description provided',
      'Victim Age': data.victimAge || 'Unknown',
      'Victim Gender': data.victimGender || 'X',
      'Weapon Used': data.weaponUsed || 'None',
      'Crime Domain': data.crimeDomain || 'Other Crime',
      'Police Deployed': data.policeDeployed || 1,
      'Case Closed': data.caseClosed || 'No',
      'Date Case Closed': formatToDDMMYYYY(data.dateCaseClosed)
    });
    
    console.log('✅ Added row to Google Sheet successfully');
  } catch (error) {
    console.error('❌ Failed to add row to Google Sheet:', error);
    throw error;
  }
}

module.exports = { addNewsToGoogleSheet };
