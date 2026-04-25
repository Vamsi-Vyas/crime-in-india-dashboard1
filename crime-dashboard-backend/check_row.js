const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const creds = require('./google-credentials.json');

const SPREADSHEET_ID = '18BiyFoDHop-GVvz22c9JcNyJdvwQ4pDnNCKcxWNUCIA';

const serviceAccountAuth = new JWT({
  email: creds.client_email,
  key: creds.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

async function checkRow() {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows({ offset: sheet.rowCount - 5, limit: 5 });
  const lastRow = rows[rows.length - 1];
  
  console.log('LAST ROW RAW DATA:', lastRow._rawData);
  console.log('LAST ROW OBJECT:');
  sheet.headerValues.forEach(header => {
    console.log(`${header}: ${lastRow.get(header)}`);
  });
}
checkRow();
