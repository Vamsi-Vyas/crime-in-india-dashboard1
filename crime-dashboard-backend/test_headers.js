const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const credentials = require('./google-credentials.json');

async function test() {
  const serviceAccountAuth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet('18BiyFoDHop-GVvz22c9JcNyJdvwQ4pDnNCKcxWNUCIA', serviceAccountAuth);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  await sheet.loadHeaderRow();
  console.log('ACTUAL HEADERS:', sheet.headerValues);
}
test();
