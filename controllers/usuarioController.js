require('dotenv').config();
const jwt = require('jsonwebtoken');
const { autenticaUsuarioDB} = require('../usecases/usuarioUseCases');
const {getUsuariosDB, getUsuarioPorCodigoDB, addUsuarioDB, updateUsuarioDB, deleteUsuarioDB } = require('../usecases/usuarioUseCases');

const login = async (request, response) => {
    try {
        if (!request.body || !request.body.username || !request.body.senha) {
            return response.status(400).json({ auth: false, message: 'Username e senha são obrigatórios' });
        }
        
        const usuario = await autenticaUsuarioDB(request.body);
        const token = jwt.sign({ usuario }, process.env.SECRET, { expiresIn: 1800 });
        return response.json({ auth: true, token: token, usuario });
    } catch (err) {
        const errorMessage = typeof err === 'string' ? err : (err.message || 'Erro interno do servidor');
        response.status(401).json({ auth: false, message: errorMessage });
    }
}

function verificaJWT(request, response, next) {
    const authHeader = request.headers['authorization'];
    if (!authHeader) return response.status(401).json({ auth: false, message: 'Nenhum token recebido.' });

    let token = authHeader.trim();

    if (token.toLowerCase().startsWith('authorization ')) token = token.slice(14);
    else if (token.startsWith('Bearer ')) token = token.slice(7);

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return response.status(401).json({ auth: false, message: 'Erro ao autenticar o token.' });

        request.usuario = decoded.usuario;
        next();
    });
}

const getUsuarios = async (req, res) => {
    try {
        const data = await getUsuariosDB();
        res.status(200).json({ status: 'success', message: 'Usuários consultados com sucesso!', objeto: data });
    } catch (err) {
        const errorMessage = typeof err === 'string' ? err : (err.message || 'Erro interno do servidor');
        res.status(400).json({ message: 'Erro ao consultar usuários: ' + errorMessage, status: 'error' });
    }
};

const getUsuarioPorCodigo = async (req, res) => {
    try {
        const codigo = parseInt(req.params.codigo);
        if (isNaN(codigo)) {
            return res.status(400).json({ message: 'Código inválido', status: 'error' });
        }
        const data = await getUsuarioPorCodigoDB(codigo);
        res.status(200).json({ status: 'success', message: 'Usuário consultado com sucesso!', objeto: data });
    } catch (err) {
        const errorMessage = typeof err === 'string' ? err : (err.message || 'Erro interno do servidor');
        res.status(400).json({ message: 'Erro ao consultar usuário: ' + errorMessage, status: 'error' });
    }
};

const addUsuario = async (req, res) => {
    try {
        const data = await addUsuarioDB(req.body);
        res.status(201).json({ status: 'success', message: 'Usuário criado com sucesso!', objeto: data });
    } catch (err) {
        const errorMessage = typeof err === 'string' ? err : (err.message || 'Erro interno do servidor');
        res.status(400).json({ message: 'Erro ao criar usuário: ' + errorMessage, status: 'error' });
    }
};

const updateUsuario = async (req, res) => {
    try {
        const data = await updateUsuarioDB(req.body);
        res.status(200).json({ status: 'success', message: 'Usuário atualizado com sucesso!', objeto: data });
    } catch (err) {
        const errorMessage = typeof err === 'string' ? err : (err.message || 'Erro interno do servidor');
        res.status(400).json({ message: 'Erro ao atualizar usuário: ' + errorMessage, status: 'error' });
    }
};

const deleteUsuario = async (req, res) => {
    try {
        const codigo = parseInt(req.params.codigo);
        if (isNaN(codigo)) {
            return res.status(400).json({ message: 'Código inválido', status: 'error' });
        }
        const data = await deleteUsuarioDB(codigo);
        res.status(200).json({ status: 'success', message: 'Usuário deletado com sucesso!', objeto: data });
    } catch (err) {
        const errorMessage = typeof err === 'string' ? err : (err.message || 'Erro interno do servidor');
        res.status(400).json({ message: 'Erro ao excluir usuário: ' + errorMessage, status: 'error' });
    }
};

module.exports = { login, verificaJWT, getUsuarios, getUsuarioPorCodigo, addUsuario, updateUsuario, deleteUsuario };