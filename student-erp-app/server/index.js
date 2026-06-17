const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(express.json());

// Simple CORS for development
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Serve static frontend from ../src
app.use(express.static(path.join(__dirname, '..', 'src')));

function readDB(){
  try{
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw);
  }catch(e){
    return {};
  }
}

function writeDB(data){
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// API: Profile
app.get('/api/profile', (req,res) => {
  const db = readDB();
  res.json(db.profile || {});
});
app.put('/api/profile', (req,res) => {
  const db = readDB();
  db.profile = req.body || {};
  writeDB(db);
  res.json(db.profile);
});

// API: Stats
app.get('/api/stats', (req,res) => {
  const db = readDB();
  res.json(db.stats || {});
});
app.put('/api/stats', (req,res) => {
  const db = readDB();
  db.stats = req.body || {};
  writeDB(db);
  res.json(db.stats);
});

// API: Drives
app.get('/api/drives', (req,res) => {
  const db = readDB();
  res.json(db.drives || {});
});
app.put('/api/drives', (req,res) => {
  const db = readDB();
  db.drives = req.body || {};
  writeDB(db);
  res.json(db.drives);
});

// API: Courses (CRUD)
app.get('/api/courses', (req,res) => {
  const db = readDB();
  res.json(db.courses || []);
});
app.post('/api/courses', (req,res) => {
  const db = readDB();
  db.courses = db.courses || [];
  const item = req.body;
  item.id = Date.now();
  db.courses.push(item);
  writeDB(db);
  res.status(201).json(item);
});
app.put('/api/courses/:id', (req,res) => {
  const db = readDB();
  db.courses = db.courses || [];
  const id = parseInt(req.params.id,10);
  const idx = db.courses.findIndex(c=>c.id===id);
  if(idx===-1) return res.sendStatus(404);
  db.courses[idx] = Object.assign({}, db.courses[idx], req.body);
  writeDB(db);
  res.json(db.courses[idx]);
});
app.delete('/api/courses/:id', (req,res) => {
  const db = readDB();
  db.courses = db.courses || [];
  const id = parseInt(req.params.id,10);
  db.courses = db.courses.filter(c=>c.id!==id);
  writeDB(db);
  res.sendStatus(204);
});

// Fallback for SPA
app.get('*', (req,res) => {
  const index = path.join(__dirname, '..', 'src', 'index.html');
  if (fs.existsSync(index)) return res.sendFile(index);
  res.status(404).send('Not found');
});

app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));
