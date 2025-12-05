const { pool } = require('../config');
const Usuario = require('../entities/usuario');

const mapRowToUsuario = (row) => new Usuario(
    row.codigo,
    row.nome,
    row.username,
    row.email,
    row.senha,
    row.tipo
);

const autenticaUsuarioDB = async (body) => {
    try {
        const { username, senha } = body;
        if (!username || !senha) {
            throw "Username e senha são obrigatórios";
        }
        const results = await pool.query(`SELECT * FROM usuarios WHERE username = $1 AND senha = $2`, [username, senha]);

        if (results.rowCount == 0) throw "Usuário ou senha inválidos";

        const user = results.rows[0];
        return new Usuario(user.codigo, user.nome, user.username, user.email, null, user.tipo);
    } catch (err) {
        throw "Erro ao autenticar o usuário: " + err;
    }
}

const getUsuariosDB = async () => {
    try {
        const { rows } = await pool.query("SELECT codigo, nome, username, email, tipo FROM usuarios ORDER BY nome");
        return rows.map(mapRowToUsuario);
    } catch (error) {
        throw "Erro ao buscar usuários no banco de dados: " + error.message;
    }
};

const getUsuarioPorCodigoDB = async (codigo) => {
    try {
        const { rows } = await pool.query("SELECT codigo, nome, username, email, tipo FROM usuarios WHERE codigo=$1", [codigo]);
        if (rows.length === 0) throw `Nenhum usuário encontrado com o código ${codigo}.`;

        return mapRowToUsuario(rows[0]);
    } catch (error) {
        throw "Erro ao buscar usuário por código no banco de dados: " + error.message;
    }
};

const addUsuarioDB = async (body) => {
    try {
        const { nome, username, email, senha, tipo = 'comum' } = body;
        if (!nome || !username || !email || !senha) {
            throw "Campos obrigatórios: nome, username, email, senha";
        }
        const result = await pool.query(`INSERT INTO usuarios (nome, username, email, senha, tipo) VALUES ($1, $2, $3, $4, $5) RETURNING codigo, nome, username, email, tipo`, [nome, username, email, senha, tipo]);
        if (result.rowCount === 0) throw "Erro ao criar usuário.";

        return mapRowToUsuario(result.rows[0]);
    } catch (error) {
        throw "Erro ao criar usuário no banco de dados: " + error.message;
    }
};

const updateUsuarioDB = async (body) => {
    try {
        const { codigo, nome, username, email, senha } = body;
        const result = await pool.query(`UPDATE usuarios SET nome=$2, username=$3, email=$4, senha=$5 WHERE codigo=$1  RETURNING codigo, nome, username, email, senha, tipo`, [codigo, nome, username, email, senha]);
        if (result.rowCount === 0) throw `Nenhum registro encontrado para o codigo ${codigo}, não foi possível atualizar.`;

        return mapRowToUsuario(result.rows[0]);
    } catch (error) {
        throw "Erro ao atualizar usuário no banco de dados: " + error.message;
    }
};

const deleteUsuarioDB = async (codigo) => {
    try {
        const result = await pool.query(`DELETE FROM usuarios WHERE codigo=$1 RETURNING codigo, nome, username, email, senha, tipo`, [codigo]);
        if (result.rowCount === 0) throw `Nenhum registro encontrado para o codigo ${codigo}, não foi possível excluir.`;

        return mapRowToUsuario(result.rows[0]);
    } catch (error) {
        throw "Erro ao excluir usuário no banco de dados: " + error.message;
    }
};

module.exports = { autenticaUsuarioDB, getUsuariosDB, getUsuarioPorCodigoDB, addUsuarioDB, updateUsuarioDB, deleteUsuarioDB };