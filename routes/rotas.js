const{Router}= require ('express');
const { login } = require("../controllers/usuarioController");

const{rotasClientes} = require('./rotasCliente');
const{rotasServicos} = require('./rotasServico');
const{rotasPedidos} = require('./rotasPedido');
const{rotasUsuarios} = require('./rotasUsuario');

const rotas = new Router();
rotas.route("/login").post(login);

rotas.use(rotasUsuarios, rotasClientes, rotasServicos, rotasPedidos);

module.exports=rotas;