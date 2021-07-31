const { validationResult } = require("express-validator");

const validarCampos = (req = request, res = response, next) => { // Le pasamos como párametro next
    // Lo que nos llega del check de las rutas
    const errors = validationResult(req);
    if (!errors.isEmpty()) { // Si los errores no están vacios osea si hay errores:
        return res.status(400).json(errors);
    }

    next(); // Si no cae en el if, que siga con el siguiente Middleware hasta llegar al controlador.
}

module.exports = {
    validarCampos,
}