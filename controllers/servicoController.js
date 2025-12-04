const { getServicosDB, postServicosDB, putServicosDB, deleteServicosDB, getServicoPorCodigoDB } = require ('../usecases/servicoUseCases');

const getServicos = async (request, response) => {
    await getServicosDB()
    .then(data => response.status(200).json(data))
    .catch(err => response.status(400).json({
        status: 'error',
        message: 'Erro ao consultar os Serviços: '+ err    }));
}

const postServicos = async (request, response) => {
    await postServicosDB (request.body)
    .then (data => response.status(200).json({
        status:'sucess',
        message: 'Serviço criado com sucesso!',
        objeto: data}))
    .catch(err=> response.status(400).json({
        status:'error', 
        message:err}));
}

const putServicos = async (request, response) => {
    await putServicosDB ({...request.body, codigo: parseInt(request.params.codigo)})
    .then (data => response.status(200).json({
        status:'sucess',
        message: 'Serviço editado com sucesso!',
        objeto: data}))
    .catch(err=> response.status(400).json({
        status:'error', 
        message:err}));
}

const deleteServicos = async (request, response) => {
    await deleteServicosDB (parseInt(request.params.codigo))
    .then (data => response.status(200).json({
        status:'sucess',
        message: 'Serviço deletado com sucesso!',
        objeto: data}))
    .catch(err=> response.status(400).json({
        status:'error', 
        message:err}));
}

const getServicoPorCodigo = async (request, response) => {
    await getServicoPorCodigoDB (parseInt(request.params.codigo))
    .then (data => response.status(200).json({data}))
    .catch(err=> response.status(400).json({
        status:'error', 
        message:'Erro ao consultar o Serviço: '+err}));
}

module.exports={
    getServicos, postServicos, putServicos, deleteServicos, getServicoPorCodigo
}