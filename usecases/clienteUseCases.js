const { pool } = require('../config.js');
const Cliente = require('../entities/cliente.js');

const getClientesDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM clientes ORDER BY nome');
        return rows.map(row => new Cliente(row.codigo, row.nome, row.email, row.telefone));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const postClientesDB = async (body) => {
    try {
        const { nome, email, telefone } = body;
        const results = await pool.query(
            `INSERT INTO clientes (clientes) VALUES ($1, $2, $3) RETURNING codigo`,
            [nome, email, telefone]
        );
        const cliente = results.rows[0];
        return new Cliente(cliente.codigo, cliente.nome, cliente.email, cliente.telefone);
    } catch (err) {
        throw "Erro ao inserir cliente: " + err;
    }
}

const putClientesDB = async (body) => {
    try {
        const { codigo, nome, email, telefone } = body;
        const results = await pool.query(
            `UPDATE clientes SET nome=$2, email=$3, telefone=$4 WHERE codigo=$1 RETURNING codigo, nome, email, telefone`,
            [codigo, nome, email, telefone]
        );

        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado para o código ${codigo} para ser alterado`;
        }

        const cliente = results.rows[0];
        return new Cliente(cliente.codigo, cliente.nome, cliente.email, cliente.telefone);
    } catch (err) {
        throw "Erro ao alterar cliente: " + err;
    }
}

const deleteClientesDB = async (codigo) => {
    try {
        const results = await pool.query(
            `DELETE FROM clientes WHERE codigo=$1`,
            [codigo]
        );

        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado para o código ${codigo} para ser removido`;
        } else {
            return 'Cliente removido com sucesso!';
        }
    } catch (err) {
        throw "Erro ao excluir cliente: " + err;
    }
}

const getClientePorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(
            'SELECT * FROM clientes WHERE codigo=$1',
            [codigo]
        );

        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado para o código ${codigo}`;
        } else {
            const cliente = results.rows[0];
            return new Cliente(cliente.codigo, cliente.nome, cliente.email, cliente.telefone);
        }
    } catch (err) {
        throw "Erro ao consultar cliente: " + err;
    }
}

module.exports = {
    getClientesDB,
    postClientesDB,
    putClientesDB,
    deleteClientesDB,
    getClientePorCodigoDB
};