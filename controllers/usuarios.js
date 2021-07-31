const { request, response } = require("express"); // Para acceder a los métodos que nos provee express
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query; // Tomamos los argumentos que nos llegan desde los parámetros de la URL.
    const query = { estado: true };

    // Hacemos una desestructuración de arreglos donde total es el valor de la primer promesa y usuarios el valor de la segunda.
    const [total, usuarios] = await Promise.all([ // Un arreglo de promesas, para que las promesas se ejecuten simultaneamente, si falla una fallan las demás.
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(parseInt(desde))
            .limit(parseInt(limite))
    ])

    res.json({
        total,
        usuarios
    })
};

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body; // Lo que sea que venga en el body de la petición lo vamos a reflejar en la respuesta. Desestructuramos el JSON y le pedimos solo los datos que necesitemos
    const usuario = new Usuario({ nombre, correo, password, rol }) // Creamos una nueva instancia de Usuario y le envíamos el lo que queremos guardar en la BD. Si mandamos un campo inexistente Mongoose lo va a ignorar automaticamente.


    // Encriptar la contraseña  (hash)
    const salt = bcryptjs.genSaltSync(); // El número de saltos que va a tener la contraseña para encriptarse.
    usuario.password = bcryptjs.hashSync(password, salt) // Darle un hash a la contraseña.


    // Guardamos la nueva instancia dentro de la Base de Datos.
    await usuario.save();

    res.status(200).json(usuario);
};

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
        // Encriptar la contraseña  (hash)
        const salt = bcryptjs.genSaltSync(); // El número de saltos que va a tener la contraseña para encriptarse.
        resto.password = bcryptjs.hashSync(password, salt) // Darle un hash a la contraseña.
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto); // Busca por el parámetro ID y actualiza solo el resto

    res.status(200).json({
        usuario
    })
};

const usuariosPatch = (req, res = response) => {
    res.status(200).json({
        msg: "patch API - Controlador"
    })
};

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id); // No utilizar este metodo porque si borramos al usuario se pierde la integridad de la base de datos

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.status(200).json(usuario);
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}