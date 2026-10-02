function errorMiddleware(error, req, res, next) {

    console.error(error);

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
        return res.status(400).json({
            erro: "Registro relacionado não existe"
        });
    }

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
        return res.status(409).json({
            erro: "Não é possível excluir este registro porque ele possui registros relacionados"
        });
    }

    if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
            erro: "Registro duplicado"
        });
    }

    res.status(500).json({
        erro: "Erro interno do servidor"
    });
}

module.exports = errorMiddleware;
