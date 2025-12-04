const { getPedidosDB, postPedidosDB, putPedidosDB, deletePedidosDB, getPedidoPorCodigoDB } = require ('../usecases/pedidoUseCases');

const getPedidos = async (request, response) => {
    await getPedidosDB()
    .then(data => response.status(200).json(data))
    .catch(err => response.status(400).json({
        status: 'error',
        message: 'Erro ao consultar os Pedidos: '+ err    }));
}


const postPedidos = async (request, response) => {
    await postPedidosDB (request.body)
    .then (data => response.status(200).json({
        status:'sucess',
        message: 'Pedido criado com sucesso!',
        objeto: data}))
    .catch(err=> response.status(400).json({
        status:'error', 
        message:err}));
}


const putPedidos = async (request, response) => {
    await putPedidosDB ({...request.body, codigo: parseInt(request.params.codigo)})
    .then (data => response.status(200).json({
        status:'sucess',
        message: 'Pedido editado com sucesso!',
        objeto: data}))
    .catch(err=> response.status(400).json({
        status:'error', 
        message:err}));
}

const deletePedidos = async (request, response) => {
    await deletePedidosDB (parseInt(request.params.codigo))
    .then (data => response.status(200).json({
        status:'sucess',
        message: 'Pedido deletado com sucesso!',
        objeto: data}))
    .catch(err=> response.status(400).json({
        status:'error', 
        message:err}));
}

const getPedidoPorCodigo = async (request, response) => {
    await getPedidoPorCodigoDB (parseInt(request.params.codigo))
    .then (data => response.status(200).json({data}))
    .catch(err=> response.status(400).json({
        status:'error', 
        message:'Erro ao consultar o pedido: '+err}));
}

module.exports={
    getPedidos, postPedidos, putPedidos, deletePedidos, getPedidoPorCodigo

}