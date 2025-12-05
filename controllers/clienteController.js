const { getClientesDB, postClientesDB, putClientesDB, deleteClientesDB, getClientePorCodigoDB } = require ('../usecases/clienteUseCases');

const getClientes = async (request, response) => {
    try {
        const data = await getClientesDB();
        response.status(200).json(data);
    } catch (err) {
        const errorMessage = typeof err === 'string' ? err : (err.message || 'Erro interno do servidor');
        response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os Clientes: ' + errorMessage
        });
    }
}

const postClientes = async (request, response) => {
    try {
        const data = await postClientesDB(request.body);
        response.status(200).json({
            status: 'success',
            message: 'Cliente criado com sucesso!',
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

const putClientes = async (request, response) => {
    try {
        const data = await putClientesDB({ ...request.body, codigo: parseInt(request.params.codigo) });
        response.status(200).json({
            status: 'success',
            message: 'Cliente editado com sucesso!',
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

const deleteClientes = async (request, response) => {
    try {
        const data = await deleteClientesDB(parseInt(request.params.codigo));
        response.status(200).json({
            status: 'success',
            message: 'Cliente deletado com sucesso!',
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

const getClientePorCodigo = async (request, response) => {
    try {
        const data = await getClientePorCodigoDB(parseInt(request.params.codigo));
        response.status(200).json({ data });
    } catch (err) {
        const errorMessage = typeof err === 'string' ? err : (err.message || 'Erro interno do servidor');
        response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar o Cliente: ' + errorMessage
        });
    }
}

module.exports={
    getClientes, postClientes, putClientes, deleteClientes, getClientePorCodigo
}