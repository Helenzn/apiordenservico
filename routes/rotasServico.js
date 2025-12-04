const { Router } = require('express');
const { getServicos, postServicos, putServicos, deleteServicos, getServicoPorCodigo} = require('../controllers/servicoController');
const rotasServicos = new Router();

rotasServicos.route('/servicos')
    .get(getServicos)
    .post(postServicos)

rotasServicos.route('/servicos/:codigo')
    .get(getServicoPorCodigo)
    .put(putServicos)
    .delete(deleteServicos)

module.exports = { rotasServicos };