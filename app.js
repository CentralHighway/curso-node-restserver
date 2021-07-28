// Importaciones externas


// Importaciones propias
const Server = require("./models/server");

require("dotenv").config(); // Requerimos dotenv y le pásamos el método config en el cual se encuentran nuestras variables de entorno definidas.


const server = new Server();

server.listen();