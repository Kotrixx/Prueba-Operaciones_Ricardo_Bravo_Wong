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
  
  var query = `SELECT * FROM transacciones t INNER JOIN clientes c ON t.dni = c.dni 
      INNER JOIN categoria cat ON cat.idCategoria = t.idCategoria ORDER BY fecha_de_operacion DESC LIMIT 10 `;

  // Verificar si hay o no fecha
  if (dni && fecha) {
      console.log("asd")
    query = `SELECT * FROM transacciones t INNER JOIN clientes c ON t.dni = c.dni 
      INNER JOIN categoria cat ON cat.idCategoria = t.idCategoria WHERE t.dni = ${dni} AND fecha_de_operacion = '${fecha}'`
  } else if (dni) {
      console.log(dni)
    query = `SELECT * FROM transacciones t INNER JOIN clientes c ON t.dni = c.dni INNER JOIN categoria cat ON cat.idCategoria = t.idCategoria
      WHERE t.dni = ${dni} ORDER BY fecha_de_operacion DESC LIMIT 10 `;
  } 

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
  
  const query = `SELECT * FROM transacciones t INNER JOIN clientes c ON t.dni = c.dni 
    INNER JOIN categoria cat ON cat.idCategoria = t.idCategoria WHERE id_operacion = ${id_condition}`;

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


