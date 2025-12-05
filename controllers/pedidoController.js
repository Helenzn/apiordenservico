const { getPedidosDB, postPedidosDB, putPedidosDB, deletePedidosDB, getPedidoPorCodigoDB } = require ('../usecases/pedidoUseCases');

const getPedidos = async (request, response) => {
    try {
        const data = await getPedidosDB();
        response.status(200).json(data);
    } catch (err) {
        const errorMessage = typeof err === 'string' ? err : (err.message || 'Erro interno do servidor');
        response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os Pedidos: ' + errorMessage
        });
    }
}

const postPedidos = async (request, response) => {
    try {
        const data = await postPedidosDB(request.body);
        response.status(200).json({
            status: 'success',
            message: 'Pedido criado com sucesso!',
            objeto: data
        });
    } catch (err) {
        const errorMessage = typeof err === 'string' ? err : (err.message || 'Erro interno do servidor');
        response.status(400).json({
            status: 'error',
            message: errorMessage
        });
    }
}

const putPedidos = async (request, response) => {
    try {
        const data = await putPedidosDB({ ...request.body, codigo: parseInt(request.params.codigo) });
        response.status(200).json({
            status: 'success',
            message: 'Pedido editado com sucesso!',
            objeto: data
        });
    } catch (err) {
        const errorMessage = typeof err === 'string' ? err : (err.message || 'Erro interno do servidor');
        response.status(400).json({
            status: 'error',
            message: errorMessage
        });
    }
}

const deletePedidos = async (request, response) => {
    try {
        const data = await deletePedidosDB(parseInt(request.params.codigo));
        response.status(200).json({
            status: 'success',
            message: 'Pedido deletado com sucesso!',
            objeto: data
        });
    } catch (err) {
        const errorMessage = typeof err === 'string' ? err : (err.message || 'Erro interno do servidor');
        response.status(400).json({
            status: 'error',
            message: errorMessage
        });
    }
}

const getPedidoPorCodigo = async (request, response) => {
    try {
        const data = await getPedidoPorCodigoDB(parseInt(request.params.codigo));
        response.status(200).json({ data });
    } catch (err) {
        const errorMessage = typeof err === 'string' ? err : (err.message || 'Erro interno do servidor');
        response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar o pedido: ' + errorMessage
        });
    }
}

module.exports={
    getPedidos, postPedidos, putPedidos, deletePedidos, getPedidoPorCodigo

}