###Proyecto biblioteca publicado en vercel

clonar repositorio 

crear proyecto en vercel conectado a git

    host: 'db-biblioteca.cdwk8g26ozev.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'bdbiblioteca123*',
    database: 'bd_librarysm',

se crea archivo de vercel en raiz del proyecto

----- contenido del archivo vercel -
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
--------- fin contenido archivo vercel ---


---package.json----
{
  "name": "mi-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.2.0",
    "cors": "^2.8.5"
  }
}

------fin package.json ------

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

en interface de vercel agregar variable de entorno
DB_HOST=mibd amazon
DB_USER=admin
DB_PASSWORD=library123*
DB_NAME=bd_librarysm