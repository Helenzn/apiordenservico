const { getClientesDB, postClientesDB, putClientesDB, deleteClientesDB, getClientePorCodigoDB } = require ('../usecases/clienteUseCases');

const getClientes = async (request, response) => {
    await getClientesDB()
    .then(data => response.status(200).json(data))
    .catch(err => response.status(400).json({
        status: 'error',
        message: 'Erro ao consultar os Clientes: '+ err    }));
}


const postClientes = async (request, response) => {
    await postClientesDB (request.body)
    .then (data => response.status(200).json({
        status:'sucess',
        message: 'Cliente criado com sucesso!',
        objeto: data}))
    .catch(err=> response.status(400).json({
        status:'error', 
        message:err}));
}

const putClientes = async (request, response) => {
    await putClientesDB ({...request.body, codigo: parseInt(request.params.codigo)})
    .then (data => response.status(200).json({
        status:'sucess',
        message: 'Cliente editado com sucesso!',
        objeto: data
    }))
    .catch(err=> response.status(400).json({
        status:'error', 
        message:err}));
}

const deleteClientes = async (request, response) => {
    await deleteClientesDB (parseInt(request.params.codigo))
    .then (data => response.status(200).json({
        status:'sucess',
        message: data //'Cliente deletado com sucesso!',
       // objeto: data
        }))
    .catch(err=> response.status(400).json({
        status:'error', 
        message:err}));
}

const getClientePorCodigo = async (request, response) => {
    await getClientePorCodigoDB (parseInt(request.params.codigo))
    .then (data => response.status(200).json({data}))
    .catch(err=> response.status(400).json({
        status:'error', 
        message:'Erro ao consultar o Cliente: '+err}));
}

module.exports={
    getClientes, postClientes, putClientes, deleteClientes, getClientePorCodigo
}