const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
const port = 3000;
const path = require('path');

//Conexion al archivo SQLite
const db = new sqlite3.Database('../rapimoney-db.db');
app.listen(3000,function(){
	console.log(`Running in :${port}`);
});


