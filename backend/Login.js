const express = require('express');
const router = express.Router();
const db = require('./db'); // Importa la conexión a la base de datos

// Ruta para hacer login
router.post('/login_admon', (req, res) => {
    const { email, password } = req.body;

    // Ejemplo de consulta SQL
    const query = 'SELECT * FROM usersAdmon WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        if (results.length > 0) {
            // Enviar una respuesta exitosa con un mensaje o token
            res.status(200).json({ message: 'Login exitoso' });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    });
});

module.exports = router;
