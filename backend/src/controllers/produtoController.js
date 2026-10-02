const produtoService = require("../services/produtoService");

const produtoController = {

    async listar(req, res, next) {
        try {
            const produtos = await produtoService.listarTodos();

            res.status(200).json(produtos);
        } catch (error) {
            next(error);
        }
    },

    async buscarPorId(req, res, next) {
        try {
            const { id } = req.params;

            const produto =
                await produtoService.buscarPorId(id);

            if (!produto) {
                return res.status(404).json({
                    erro: "Produto não encontrado"
                });
            }

            res.status(200).json(produto);

        } catch (error) {
            next(error);
        }
    },

    async criar(req, res, next) {
        try {
            const {
                nome,
                preco,
                estoque
            } = req.body;

            if (!nome || preco === undefined || estoque === undefined) {
                return res.status(400).json({
                    erro: "Nome, preço e estoque são obrigatórios"
                });
            }

            if (Number(preco) < 0 || Number(estoque) < 0) {
                return res.status(400).json({
                    erro: "Preço e estoque não podem ser negativos"
                });
            }

            const produto =
                await produtoService.criar(
                    nome,
                    preco,
                    estoque
                );

            res.status(201).json(produto);

        } catch (error) {
            next(error);
        }
    },

    async atualizar(req, res, next) {
        try {
            const { id } = req.params;

            const {
                nome,
                preco,
                estoque
            } = req.body;

            if (!nome || preco === undefined || estoque === undefined) {
                return res.status(400).json({
                    erro: "Nome, preço e estoque são obrigatórios"
                });
            }

            const produto =
                await produtoService.atualizar(
                    id,
                    nome,
                    preco,
                    estoque
                );

            if (!produto) {
                return res.status(404).json({
                    erro: "Produto não encontrado"
                });
            }

            res.status(200).json(produto);

        } catch (error) {
            next(error);
        }
    },

    async deletar(req, res, next) {
        try {
            const { id } = req.params;

            const deletado =
                await produtoService.deletar(id);

            if (!deletado) {
                return res.status(404).json({
                    erro: "Produto não encontrado"
                });
            }

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }

};

module.exports = produtoController;
