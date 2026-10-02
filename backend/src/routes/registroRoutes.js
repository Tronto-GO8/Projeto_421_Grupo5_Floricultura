const express = require("express");

const router = express.Router();

const registroController =
    require("../controllers/registroController");

router.get(
    "/",
    registroController.listar
);

router.get(
    "/:id",
    registroController.buscarPorId
);

router.post(
    "/",
    registroController.criar
);

router.put(
    "/:id",
    registroController.atualizar
);

router.delete(
    "/:id",
    registroController.deletar
);

module.exports = router;
