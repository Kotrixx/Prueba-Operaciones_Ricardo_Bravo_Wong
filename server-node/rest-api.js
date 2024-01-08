const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const app = express();
const port = 3000;
const path = require('path');

//Conexion al archivo SQLite
const db = new sqlite3.Database('../rapimoneySQLite.db');

const corsOptions = {
  origin: '*',
  methods: 'GET', // Puedes ajustar esto según los métodos que estás utilizando (por ejemplo, 'GET, POST, PUT, DELETE')
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


app.get('/items', (req, res) => {
  db.all('SELECT * FROM clientes', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});


app.listen(3000, function () {
	console.log(`Running in :${port}`);
});


