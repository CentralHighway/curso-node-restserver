const { Router } = require("express");
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require("../controllers/usuarios");

const router = Router();

router.get('/', usuariosGet);

router.post('/', usuariosPost);

router.put('/:id', usuariosPut); // No ejecutamos la función, solo le mandamos la referencia a la misma (request = "/" y response = usuariosGet)

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);

module.exports = router;