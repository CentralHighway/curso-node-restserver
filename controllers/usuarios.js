const { request, response } = require("express"); // Para acceder a los métodos que nos provee express

const usuariosGet = (req = request, res = response) => {
    const { query, nombre = "No name", apikey, page = 1, limit } = req.query;

    res.status(200).json({
        msg: "get API - Controlador",
        query,
        nombre,
        apikey,
        page,
        limit
    })
};

const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body; // Lo que sea que venga en el body de la petición lo vamos a reflejar en la respuesta. Desestructuramos el JSON y le pedimos solo los datos que necesitemos

    res.status(200).json({
        msg: "post API - Controlador",
        nombre, edad
    })
};

const usuariosPut = (req, res = response) => {
    const id = req.params.id;

    res.status(200).json({
        msg: "put API - Controlador",
        id
    })
};

const usuariosPatch = (req, res = response) => {
    res.status(200).json({
        msg: "patch API - Controlador"
    })
};

const usuariosDelete = (req, res = response) => {
    res.status(200).json({
        msg: "delete API - Controlador"
    })
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,

}