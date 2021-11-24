require('dotenv').config({path: "./config/.env"});

//Initialisation de l'application 
const app = require('express')();

//Loading requirements
require('./boot/database')();

//Définition du PORT
const PORT = process.env.PORT || 5000 ;

//Attendre un appel pour le serveur
app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
);

