class Pedido {
    constructor(codigo, data, codigo_cliente, codigo_servico) {
        this.codigo = codigo;
        this.data = data;
        this.codigo_cliente = codigo_cliente;
        this.codigo_servico = codigo_servico;
    }
}

module.exports = Pedido;