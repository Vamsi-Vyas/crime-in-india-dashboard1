const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'crime_data.xlsx');
const CSV_FILE = path.join(__dirname, 'crime_dataset_india.csv');

async function ensureExcelFile() {
  const workbook = new ExcelJS.Workbook();
  
  if (fs.existsSync(FILE_PATH)) {
    await workbook.xlsx.readFile(FILE_PATH);
  } else {
    const sheet = workbook.addWorksheet('Crime News');
    sheet.columns = [
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Title', key: 'title', width: 30 },
      { header: 'Location', key: 'location', width: 20 },
      { header: 'Category', key: 'category', width: 15 },
      { header: 'Description', key: 'description', width: 50 },
      { header: 'Reported At', key: 'reportedAt', width: 25 }
    ];
    // Bold headers
    sheet.getRow(1).font = { bold: true };
    await workbook.xlsx.writeFile(FILE_PATH);
  }
}

async function addNewsToExcel(data) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(FILE_PATH);
  const sheet = workbook.getWorksheet('Crime News');
  
  sheet.addRow({
    date: data.date || new Date().toISOString().split('T')[0],
    title: data.title,
    location: data.location,
    category: data.category,
    description: data.description,
    reportedAt: new Date().toLocaleString()
  });
  
  await workbook.xlsx.writeFile(FILE_PATH);
  
  // Also append to CSV for Python simulator
  const csvRow = `"${data.date || new Date().toISOString().split('T')[0]}","${data.title}","${data.location}","${data.category}","${data.description}","${new Date().toLocaleString()}"\n`;
  fs.appendFileSync(CSV_FILE, csvRow);
}

module.exports = { ensureExcelFile, addNewsToExcel };
