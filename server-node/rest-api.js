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
  methods: 'GET', //Metodos permitidos para CORS
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


//RUTA PARA LISTAR TRANSACCIONES FILTRADO POR DNI Y/O FEECHA
app.get('/transacciones', (req, res) => {
  const { dni, fecha } = req.query;

  // Verificar si hay o no fecha
  const date_condition = fecha ? `AND fecha_de_operacion = '${fecha}'` : '';

  const query = `SELECT * FROM transacciones WHERE dni = ${dni} ${date_condition}`;

  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json( rows );
  });
});

//RUTA PARA VER DETALLES DE UNA TRANSACCION MEDIANTE SU ID
app.get('/transaccion', (req, res) => {
  const { id } = req.query;
  // Verificar si hay o no id
  const id_condition = id;
  
  const query = `SELECT * FROM transacciones t INNER JOIN clientes c ON t.dni = c.dni WHERE id_operacion = ${id_condition}`;

  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json( rows );
  });
});

//RUTA PARA LISTAR POR CATEGORIA (BONUS)

app.listen(3000, function () {
	console.log(`Running in :${port}`);
});


