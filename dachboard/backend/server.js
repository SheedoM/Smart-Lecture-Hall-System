require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, process.env.ATTENDANCE_FILE || 'attendance.json');

app.use(bodyParser.json());
if (process.env.ALLOW_CORS === 'true' || process.env.ALLOW_CORS === undefined) {
  app.use(cors());
}

// Ensure data file
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');

// Simple in-memory mirror (reloads from disk on start)
function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE));
}
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/status', (req, res) => {
  // This endpoint is simple and assumes an ESP or frontend will push updates
  const data = readData();
  // Quick status stub; customize to integrate with persistent storage
  res.json({
    isEntryAllowed: true,
    availableSeats: 30,
    attendees: data.slice(-20).reverse()
  });
});

app.post('/log', (req, res) => {
  const record = { timestamp: new Date().toISOString(), ...req.body };
  const data = readData();
  data.push(record);
  writeData(data);
  res.status(201).json(record);
});

app.post('/api/reset-attendees', (req, res) => {
  writeData([]);
  res.json({ success: true });
});

app.get('/attendance/export', (req, res) => {
  const data = readData();
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="attendance.csv"');
  res.write('timestamp,tag_uid,student_id,notes\n');
  data.forEach(r => {
    res.write(`${r.timestamp},${r.tag_uid || ''},${r.student_id || ''},${(r.notes||'').replace(/[\n\r,]/g,' ')}\n`);
  });
  res.end();
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
