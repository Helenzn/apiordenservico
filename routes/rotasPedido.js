const { Router } = require('express');
const { getPedidos, postPedidos, putPedidos, deletePedidos, getPedidoPorCodigo} = require('../controllers/pedidoController');
const rotasPedidos = new Router();

rotasPedidos.route('/pedidos')
    .get(getPedidos)
    .post(postPedidos)

rotasPedidos.route('/pedidos/:codigo')
    .get(getPedidoPorCodigo)
    .put(putPedidos)
    .delete(deletePedidos)


module.exports = { rotasPedidos };