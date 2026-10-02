const pedidoService = require("../services/pedidoService");

const pedidoController = {

    async listar(req, res, next) {

        try {

            const pedidos =
                await pedidoService.listarTodos();

            res.status(200).json(pedidos);

        } catch (error) {
            next(error);
        }
    },

    async buscarPorId(req, res, next) {

        try {

            const { id } = req.params;

            const pedido =
                await pedidoService.buscarPorId(id);

            if (!pedido) {
                return res.status(404).json({
                    erro: "Pedido não encontrado"
                });
            }

            res.status(200).json(pedido);

        } catch (error) {
            next(error);
        }
    },

    async criar(req, res, next) {

        try {

            const {
                status_atual,
                id_funcionario
            } = req.body;

            if (!status_atual) {
                return res.status(400).json({
                    erro: "status_atual é obrigatório"
                });
            }

            const pedido =
                await pedidoService.criar(
                    status_atual,
                    id_funcionario || null
                );

            res.status(201).json(pedido);

        } catch (error) {
            next(error);
        }
    },

    async atualizar(req, res, next) {

        try {

            const { id } = req.params;

            const {
                status_atual,
                id_funcionario
            } = req.body;

            if (!status_atual) {
                return res.status(400).json({
                    erro: "status_atual é obrigatório"
                });
            }

            const pedido =
                await pedidoService.atualizar(
                    id,
                    status_atual,
                    id_funcionario || null
                );

            if (!pedido) {
                return res.status(404).json({
                    erro: "Pedido não encontrado"
                });
            }

            res.status(200).json(pedido);

        } catch (error) {
            next(error);
        }
    },

    async atualizarStatus(req, res, next) {

        try {

            const { id } = req.params;
            const { status_atual } = req.body;

            if (!status_atual) {
                return res.status(400).json({
                    erro: "status_atual é obrigatório"
                });
            }

            const pedido =
                await pedidoService.atualizarStatus(
                    id,
                    status_atual
                );

            if (!pedido) {
                return res.status(404).json({
                    erro: "Pedido não encontrado"
                });
            }

            res.status(200).json(pedido);

        } catch (error) {
            next(error);
        }
    },

    async deletar(req, res, next) {

        try {

            const { id } = req.params;

            const deletado =
                await pedidoService.deletar(id);

            if (!deletado) {
                return res.status(404).json({
                    erro: "Pedido não encontrado"
                });
            }

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }

};

module.exports = pedidoController;
