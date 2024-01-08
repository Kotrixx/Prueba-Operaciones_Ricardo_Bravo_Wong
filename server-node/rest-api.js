const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
const port = 3000;
const path = require('path');

//Conexion al archivo SQLite
const db = new sqlite3.Database('../rapimoneySQLite.db');

app.get('/items', (req, res) => {
  db.all('SELECT * FROM clientes', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ items: rows });
  });
});

app.listen(3000, function () {
	console.log(`Running in :${port}`);
});


