class Usuario {
    constructor(codigo, nome, username, email, senha, tipo) {
        this.codigo = codigo;
        this.nome = nome;
        this.username = username;
        this.email = email;
        this.senha = senha;
        this.tipo = tipo;
    }
}

module.exports = Usuario;