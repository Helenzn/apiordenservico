const { pool } = require('../config.js');
const Pedido = require('../entities/pedido.js');

const getPedidosDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM pedidos ORDER BY data');
        return rows.map(row => new Pedido(row.codigo, row.data, row.codigo_cliente, row.codigo_servico));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const postPedidosDB = async (body) => {
    try {
        const { data, codigo_cliente, codigo_servico } = body;
        const results = await pool.query(
            `INSERT INTO pedidos (data, codigo_cliente, codigo_servico) VALUES ($1, $2, $3) RETURNING codigo`,
            [data, codigo_cliente, codigo_servico]
        );
        const pedido = results.rows[0];
        return new Pedido(pedido.codigo, pedido.data, codigo_cliente, codigo_servico);
    } catch (err) {
        throw "Erro ao inserir pedido: " + err;
    }
}

const putPedidosDB = async (body) => {
    try {
        const { codigo, data, codigo_cliente, codigo_servico } = body;
        const results = await pool.query(
            `UPDATE pedidos SET data=$2, codigo_cliente=$3, codigo_servico=$4 WHERE codigo=$1 RETURNING codigo, data, codigo_cliente, codigo_servico`,
            [codigo, data, codigo_cliente, codigo_servico]
        );

        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado para o código ${codigo} para ser alterado`;
        }

        const pedido = results.rows[0];
        return new Pedido(pedido.codigo, pedido.data, pedido.codigo_cliente, pedido.codigo_servico);
    } catch (err) {
        throw "Erro ao alterar pedido: " + err;
    }
}

const deletePedidosDB = async (codigo) => {
    try {
        const results = await pool.query(
            `DELETE FROM pedidos WHERE codigo=$1`,
            [codigo]
        );

        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado para o código ${codigo} para ser removido`;
        } else {
            return 'Pedido removido com sucesso!';
        }
    } catch (err) {
        throw "Erro ao excluir pedido: " + err;
    }
}

const getPedidoPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(
            'SELECT * FROM pedidos WHERE codigo=$1',
            [codigo]
        );

        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado para o código ${codigo}`;
        } else {
            const pedido = results.rows[0];
            return new Pedido(pedido.codigo, pedido.data, pedido.codigo_cliente, pedido.codigo_servico);
        }
    } catch (err) {
        throw "Erro ao consultar pedido: " + err;
    }
}

module.exports = {
    getPedidosDB,
    postPedidosDB,
    putPedidosDB,
    deletePedidosDB,
    getPedidoPorCodigoDB
};