const { getServicosDB, postServicosDB, putServicosDB, deleteServicosDB, getServicoPorCodigoDB } = require ('../usecases/servicoUseCases');

const getServicos = async (request, response) => {
    try {
        const data = await getServicosDB();
        response.status(200).json(data);
    } catch (err) {
        const errorMessage = typeof err === 'string' ? err : (err.message || 'Erro interno do servidor');
        response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os Serviços: ' + errorMessage
        });
    }
}

const postServicos = async (request, response) => {
    try {
        const data = await postServicosDB(request.body);
        response.status(200).json({
            status: 'success',
            message: 'Serviço criado com sucesso!',
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

const putServicos = async (request, response) => {
    try {
        const data = await putServicosDB({ ...request.body, codigo: parseInt(request.params.codigo) });
        response.status(200).json({
            status: 'success',
            message: 'Serviço editado com sucesso!',
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

const deleteServicos = async (request, response) => {
    try {
        const data = await deleteServicosDB(parseInt(request.params.codigo));
        response.status(200).json({
            status: 'success',
            message: 'Serviço deletado com sucesso!',
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

const getServicoPorCodigo = async (request, response) => {
    try {
        const data = await getServicoPorCodigoDB(parseInt(request.params.codigo));
        response.status(200).json({ data });
    } catch (err) {
        const errorMessage = typeof err === 'string' ? err : (err.message || 'Erro interno do servidor');
        response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar o Serviço: ' + errorMessage
        });
    }
}

module.exports={
    getServicos, postServicos, putServicos, deleteServicos, getServicoPorCodigo
}