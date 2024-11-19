// npm init
// npm instal mysql express
//npm cors

// Inicialización de la aplicación y dependencias
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

// Uso de middleware
app.use(cors()); // Habilita CORS
app.use(express.json()); // Parseo de JSON en las peticiones

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',    // Puede ser 'localhost' o un nombre de dominio si se usa remoto
  user: 'root',         // Usuario de la base de datos
  password: '',         // Contraseña de la base de datos
  database: 'bd_librarysm' // Nombre de la base de datos

  // Para producción, descomentar y usar variables de entorno:
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME
});

// Conexión a la base de datos MySQL
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
    return;
  }
  console.log('Conexión a la base de datos MySQL establecida');
});

// -----        users ----------------------------------------------------------------
    app.post('/add_users', async (req, res) => { 
        const { cedula, nombre, direccion, telefono } = req.body;  //instruccion para tomar los datos enviados desde el formulario
        
        try {
            const [result] = await db.promise().query(
                'INSERT INTO users (cedula, nombre, direccion, telefono) VALUES (?, ?, ?, ?)', 
                [cedula, nombre, direccion, telefono]
            );
            res.send("Registro Exitoso!!!!!!!");
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al insertar usuario');
        }
    });
    


app.put('/update_users', (req, res) => {
    const { idUser, cedula, nombre, direccion, telefono } = req.body;


    //query para enviar los datos a la base de datos
    db.query('update users set cedula=?, nombre=?, direccion=?, telefono=? where usuarioId=?', [cedula, nombre, direccion, telefono, idUser],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Registro Actualizado  !!!!!!!");
            }
        }
    );
})

app.delete('/delete_users/:id', (req, res) => {
    // Extraer el id de los parámetros de la solicitud
    const { id } = req.params;

    // Ejecutar la consulta
    db.query('DELETE FROM users WHERE usuarioId = ?', [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el usuario:', err);
            return res.status(500).json({ error: 'Error al eliminar el usuario' });
        } else {
            res.json(result);
        }
    });
});

app.get('/get_users', (req, res) => {
    //query para seleccionar los datos a la base de datos
    db.query('select * from users ',
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
})

/////////////fin users ////////////////////////////////


///////////////////////Autor

// Agregar un autor
app.post('/add_autores', (req, res) => {
    const nombreAutor = req.body.nombreAutor;
    const apellidoAutor = req.body.apellidoAutor;
    console.log('Autor' + nombreAutor);
    db.query('INSERT INTO autor (nombreAutor, apellidoAutor) VALUES (?, ?)', [nombreAutor, apellidoAutor], (err, result) => {
        if (err) {
            console.error('Error al agregar el autor:', err);
            res.status(500).send('Error al agregar el autor');
        } else {
            res.send('Autor agregado exitosamente');
        }
    });
});

app.get('/get_autores', (req, res) => {
    //query para seleccionar los datos a la base de datos
    db.query('select * from autor ',
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
})
// Endpoint para actualizar un autor
app.put('/update_autor', (req, res) => {
    const { autorId, nombreAutor, apellidoAutor } = req.body;
    db.query('UPDATE autor SET nombreAutor = ?, apellidoAutor = ? WHERE autorId = ?', [nombreAutor, apellidoAutor, autorId],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar el autor:', err);
                return res.status(500).send('Error al actualizar el autor.');
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Autor no encontrado.');
            }
            res.send('Autor actualizado con éxito.');
        }
    );
});

// Endpoint para eliminar un autor
app.delete('/delete_autor/:autorId', (req, res) => {
    const autorId = req.params.autorId;

    db.query(
        'DELETE FROM autor WHERE autorId = ?',
        [autorId],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar el autor:', err);
                return res.status(500).send('Error al eliminar el autor.');
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Autor no encontrado.');
            }
            res.send('Autor eliminado con éxito.');
        }
    );
});

///////////////////////fin Autor


////EDITORIALES      
// Endpoint get editorial
app.get('/get_editoriales', (req, res) => {
    //query para seleccionar los datos a la base de datos
    db.query('select * from editorial ',
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
})


// Endpoint ADD editorial
app.post('/add_editoriales', (req, res) => {
    // Extract data from request body
    const nombreEditorial = req.body.nombreEditorial;
    const direccionEditorial = req.body.direccionEditorial;
    const telefonoEditorial = req.body.telefonoEditorial;

    // Debugging information (Optional, remove in production)
    console.log(nombreEditorial, direccionEditorial, telefonoEditorial);

    // Insert data into the database
    db.query('INSERT INTO editorial (nombreEditorial, direccionEditorial, telefonoEditorial) VALUES (?, ?, ?)', [nombreEditorial, direccionEditorial, telefonoEditorial], (err, result) => {
        if (err) {
            // Log error and send error response
            console.error('Error al agregar el editorial:', err);
            res.status(500).send('Error al agregar el editorial');
        } else {
            // Send success response
            res.send('Editorial agregado exitosamente');
        }
    });
});

// Endpoint para actualizar un autor
app.put('/update_editoriales', (req, res) => {
    const { editorialId, nombreEditorial, direccionEditorial, telefonoEditorial } = req.body;

    db.query('UPDATE editorial SET nombreEditorial = ?, direccionEditorial = ?, telefonoEditorial=? WHERE editorialId = ?',
        [nombreEditorial, direccionEditorial, telefonoEditorial, editorialId],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar el Editorial:', err);
                return res.status(500).send('Error al actualizar el Editorial.');
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Editorial no encontrado.');
            }
            res.send('Editorial actualizado con éxito.');
        }
    );
});

// Endpoint para eliminar un editorial
app.delete('/delete_editoriales/:editorialId', (req, res) => {
    // Extraer el id de los parámetros de la solicitud
    const { editorialId } = req.params;

    // Ejecutar la consulta
    db.query('DELETE FROM editorial WHERE editorialId = ?', [editorialId], (err, result) => {
        if (err) {
            console.error('Error al eliminar el Editorial:', err);
            return res.status(500).json({ error: 'Error al eliminar el editorial' });
        } else {
            res.json(result);
        }
    });
});


// -----------  LIBROS ----------------
// Endpoint para obtener libros
app.get('/get_libros', (req, res) => {
    //query para seleccionar los datos a la base de datos
    db.query(`SELECT l.libroId, l.nombreLibro, l.editorialId, l.autorId, l.cantidad, l.fechaCreacion, l.observacion,
        e.nombreEditorial AS nombreEditorial , 
        a.nombreAutor AS nombreAutor , a.apellidoAutor AS apellidoAutor 
       		 FROM libro l
        			INNER JOIN  editorial e
                    		ON l.editorialId = e.editorialId 
        			INNER JOIN autor a
                    		ON l.autorId = a.autorId order by l.libroId asc`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
})

app.get('/get_libros_autores', (req, res) => {
    //query para seleccionar los datos a la base de datos
    db.query(`SELECT * from autor`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
})

app.get('/get_libros_editoriales', (req, res) => {
    //query para seleccionar los datos a la base de datos
    db.query(`SELECT * from editorial`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
})



// Endpoint ADD libro
app.post('/add_libro', (req, res) => {
    const { nombrelibro, nombreeditorial, nombreautor, cantidad, fecha } = req.body;

    console.log({
        nombrelibro,
        nombreeditorial,
        nombreautor,
        cantidad,
        fecha
    });

    db.query(
        `INSERT INTO libro (nombreLibro, editorialId, autorId, cantidad, fechaCreacion) 
       VALUES (?, ?, ?, ?, ?)`,
        [nombrelibro, nombreeditorial, nombreautor, cantidad, fecha],
        (err, result) => {
            if (err) {
                console.error('Error al agregar el libro:', err);
                return res.status(500).send('Error al agregar el libro');
            }
            res.send('Libro agregado exitosamente');
        }
    );
});

// Endpoint para actualizar un libro
app.put('/update_libro', (req, res) => {
   
    const { libroid, nombrelibro, editorialid, autorid, cantidad, fecha, observacion} = req.body;

    if (!libroid || !nombrelibro || !cantidad || !fecha ) {
        return res.status(400).send('Todos los campos son requeridos.');
    }

    db.query(
        'UPDATE libro SET nombreLibro = ?, cantidad = ?, fechaCreacion = ? ,observacion = ?  WHERE libroId = ?' ,
        [nombrelibro, cantidad, fecha, observacion, libroid],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar el Libro:', err);
                return res.status(500).send('Error al actualizar el Libro.');
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Libro no encontrado.');
            }
            res.send('Libro actualizado con éxito.');
        }
    );
});


// Endpoint para eliminar un libro
app.delete('/delete_libros/:libroId', (req, res) => {
    // Extraer el id de los parámetros de la solicitud
    const { libroId } = req.params;

    // Ejecutar la consulta
    db.query('DELETE FROM libro WHERE libroid=?', [libroId], (err, result) => {
        if (err) {
            console.error('Error al eliminar el libro:' + id, err);
            return res.status(500).json({ error: 'Error al eliminar el libro' });
        } else {
            res.send(result);
        }
    });
});


///----------------PRESTAMOS

// Endpoint get editorial
app.get('/get_prestamos', (req, res) => {
    //query para seleccionar los datos a la base de datos
    db.query(`SELECT p.prestamoId, p.usuarioId, p.libroId, p.estado, p.fechaFin, p.fechaCreacion, u.nombre as nombusu, l.nombrelibro as nomblibro FROM prestamo p INNER JOIN users u ON p.usuarioId = u.usuarioId INNER JOIN libro l ON p.libroId=l.libroId ORDER BY prestamoId ASC;
`,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
})

// Endpoint ADD prestamo
app.post('/add_prestamo', (req, res) => {
    const { usuario, libro, estado, fechaprestamo, fechadevolucion } = req.body;

    console.log({
        usuario,
        libro,
        estado,
        fechaprestamo,
        fechadevolucion
    });

    db.query(`INSERT INTO prestamo (usuarioId, libroId, estado, fechaFin,fechaCreacion) 
       VALUES (?, ?, ?, ?, ?)`,
        [usuario, libro, estado, fechaprestamo, fechadevolucion],
        (err, result) => {
            if (err) {
                console.error('Error al agregar el prestamo:', err);
                return res.status(500).send('Error al agregar el prestamo');
            }
            res.send('prestamo agregado exitosamente');
        }
    );
});


// Endpoint para actualizar un prestamo
app.put('/update_prestamo', (req, res) => {
    const { Prestamoid, usuario, libro, estado, FechaPrestamo, FechaDevolucion} = req.body;

    if (!Prestamoid ) {
        return res.status(400).send('El ID de Prestamo no Viajo al backend');
    }

    db.query(
        'UPDATE prestamo SET estado = ?,fechaCreacion = ?, fechaFin = ? WHERE prestamoId = ?',
        [estado,FechaPrestamo, FechaDevolucion, Prestamoid],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar el Prestamo:', err);
                return res.status(500).send('Error al actualizar el Libro.');
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Prestamo no encontrado.');
            }
            res.send('Prestamo actualizado con éxito.');
        }
    );
});

// Endpoint para eliminar un prestamo
app.delete('/delete_prestamo/:prestamoid', (req, res) => {
    // Extraer el id de los parámetros de la solicitud
    const { prestamoid } = req.params;

    // Ejecutar la consulta
    db.query('DELETE FROM prestamo WHERE prestamoid=?', [prestamoid], (err, result) => {
        if (err) {
            console.error('Error al eliminar el PRESTAMO:' + id, err);
            return res.status(500).json({ error: 'Error al eliminar el PRESTAMO' });
        } else {
            res.json(result);
        }
    });
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});