const express = require("express");

const router = express.Router();

const itemPedidoController =
    require("../controllers/itemPedidoController");

router.get(
    "/",
    itemPedidoController.listar
);

router.get(
    "/pedido/:idPedido",
    itemPedidoController.listarPorPedido
);

router.get(
    "/:id",
    itemPedidoController.buscarPorId
);

router.post(
    "/",
    itemPedidoController.criar
);

router.put(
    "/:id",
    itemPedidoController.atualizar
);

router.delete(
    "/:id",
    itemPedidoController.deletar
);

module.exports = router;
