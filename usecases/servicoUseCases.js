const { pool } = require('../config.js');
const Servico = require('../entities/servico.js');

const getServicosDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM servicos ORDER BY nome');
        return rows.map(row => new Servico(row.codigo, row.nome, row.preco, row.descricao));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const postServicosDB = async (body) => {
    try {
        const { nome, preco, descricao } = body;
        const results = await pool.query(
            `INSERT INTO servicos (nome, preco, descricao) VALUES ($1, $2, $3) RETURNING codigo`,
            [nome, preco, descricao]
        );
        const servico = results.rows[0];
        return new Servico(servico.codigo, servico.nome, servico.preco, servico.descricao);
    } catch (err) {
        throw "Erro ao inserir serviço: " + err;
    }
}

const putServicosDB = async (body) => {
    try {
        const { codigo, nome, preco, descricao } = body;
        const results = await pool.query(
            `UPDATE servicos SET nome=$2, preco=$3, descricao=$4 WHERE codigo=$1 RETURNING codigo, nome, preco, descricao`,
            [codigo, nome, preco, descricao]
        );

        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado para o código ${codigo} para ser alterado`;
        }

        const servico = results.rows[0];
        return new Servico(servico.codigo, servico.nome, servico.preco, servico.descricao);
    } catch (err) {
        throw "Erro ao alterar serviço: " + err;
    }
}

const deleteServicosDB = async (codigo) => {
    try {
        const results = await pool.query(
            `DELETE FROM servicos WHERE codigo=$1`,
            [codigo]
        );

        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado para o código ${codigo} para ser removido`;
        } else {
            return 'Serviço removido com sucesso!';
        }
    } catch (err) {
        throw "Erro ao excluir serviço: " + err;
    }
}

const getServicoPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(
            'SELECT * FROM servicos WHERE codigo=$1',
            [codigo]
        );

        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado para o código ${codigo}`;
        } else {
            const servico = results.rows[0];
            return new Servico(servico.codigo, servico.nome, servico.preco, servico.descricao);
        }
    } catch (err) {
        throw "Erro ao consultar serviço: " + err;
    }
}

module.exports = {
    getServicosDB,
    postServicosDB,
    putServicosDB,
    deleteServicosDB,
    getServicoPorCodigoDB
};