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
      "src": "frontend/package.json",
      "use": "@vercel/react"
    },
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/build/$1"
    }
  ]
}

--------- fin contenido archivo vercel ---



    