const Roles = require("../models/rol");
const Usuario = require("../models/usuario");

const esRolValido = async (rol = "") => { // Recibimos el rol proveniente de las rutas.
    const existeRol = await Roles.findOne({ rol }); // Busca dentro de nuestro modelo Roles si existe un rol con ese nombre.
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos.`);
    }
}

// Verificar si el correo existe
const emailExiste = async (correo = "") => { // Recibimos el correo proveniente de las rutas.
    await Usuario.findOne({ correo: correo });
    if (!emailExiste) {
        throw new Error(`El correo: ${correo} ya está registrado.`);
    }
}

const existeUsuarioPorId = async (id) => { // Recibimos el ID proveniente de las rutas.
    const existeUsuarioPorId = await Usuario.findById(id);
    if (!existeUsuarioPorId) {
        throw new Error(`El ID: ${id} no existe.`); // Mostramos el ID.
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
};