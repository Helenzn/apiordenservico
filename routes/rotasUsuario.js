const { Router } = require('express');
const { verificaJWT } = require('../controllers/usuarioController');
const { getUsuarios, getUsuarioPorCodigo, addUsuario, updateUsuario, deleteUsuario} = require('../controllers/usuarioController');

const rotasUsuarios = Router();

rotasUsuarios.route('/usuarios')
    .get(verificaJWT, getUsuarios)
    .post(addUsuario)
    .put(verificaJWT, updateUsuario);

rotasUsuarios.route('/usuarios/:codigo')
    .get(verificaJWT, getUsuarioPorCodigo)
    .delete(verificaJWT, deleteUsuario);

module.exports = { rotasUsuarios };