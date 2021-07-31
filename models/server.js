const express = require('express')
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = "/api/usuarios";

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares (funciones que se ejecutan antes de llamar un controlador o seguir con la ejecución de las peticiones)
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() { // Los middlewares se usan con .use();
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static("public"));
    }

    routes() {
        this.app.use(this.usuariosPath, require("../routes/usuarios"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Sevidor corriendo en:", this.port);
        });
    }
}

module.exports = Server;