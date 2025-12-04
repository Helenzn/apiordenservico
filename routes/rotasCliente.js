const { Router } = require('express');
const { getClientes, postClientes, putClientes, deleteClientes, getClientePorCodigo} = require('../controllers/clienteController');
const rotasClientes = new Router();

rotasClientes.route('/clientes')
    .get(getClientes)
    .post(postClientes)

rotasClientes.route('/clientes/:codigo')
    .get(getClientePorCodigo)
    .put(putClientes)
    .delete(deleteClientes)


module.exports = { rotasClientes };