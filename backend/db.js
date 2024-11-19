const mysql = require('mysql');
const express = require('express');
const router = express.Router();

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_librarysm',
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1); // Salir si hay un error de conexión
    }
    console.log('Conectado a la base de datos');
});

module.exports = db;
