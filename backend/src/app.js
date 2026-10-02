const express = require("express");
const cors = require("cors");

const funcionarioRoutes =
    require("./routes/funcionarioRoutes");

const produtoRoutes =
    require("./routes/produtoRoutes");

const pedidoRoutes =
    require("./routes/pedidoRoutes");

const itemPedidoRoutes =
    require("./routes/itemPedidoRoutes");

const registroRoutes =
    require("./routes/registroRoutes");

const errorMiddleware =
    require("./middlewares/errorMiddleware");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// Rota inicial
app.get("/", (req, res) => {

    res.json({
        mensagem: "API da Floricultura funcionando!"
    });

});

// Funcionários
app.use(
    "/api/funcionarios",
    funcionarioRoutes
);

// Produtos
app.use(
    "/api/produtos",
    produtoRoutes
);

// Pedidos
app.use(
    "/api/pedidos",
    pedidoRoutes
);

// Itens dos pedidos
app.use(
    "/api/itens-pedido",
    itemPedidoRoutes
);

// Registros
app.use(
    "/api/registros",
    registroRoutes
);

// Rota inexistente
app.use((req, res) => {

    res.status(404).json({
        erro: "Rota não encontrada"
    });

});

// Tratamento de erros
app.use(errorMiddleware);

module.exports = app;
