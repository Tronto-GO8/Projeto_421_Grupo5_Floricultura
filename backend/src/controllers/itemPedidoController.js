const itemPedidoService =
    require("../services/itemPedidoService");

const itemPedidoController = {

    async listar(req, res, next) {

        try {

            const itens =
                await itemPedidoService.listarTodos();

            res.status(200).json(itens);

        } catch (error) {
            next(error);
        }
    },

    async buscarPorId(req, res, next) {

        try {

            const { id } = req.params;

            const item =
                await itemPedidoService.buscarPorId(id);

            if (!item) {
                return res.status(404).json({
                    erro: "Item do pedido não encontrado"
                });
            }

            res.status(200).json(item);

        } catch (error) {
            next(error);
        }
    },

    async listarPorPedido(req, res, next) {

        try {

            const { idPedido } = req.params;

            const itens =
                await itemPedidoService.listarPorPedido(
                    idPedido
                );

            res.status(200).json(itens);

        } catch (error) {
            next(error);
        }
    },

    async criar(req, res, next) {

        try {

            const {
                quantidade,
                id_pedido
            } = req.body;

            if (
                quantidade === undefined ||
                quantidade <= 0
            ) {
                return res.status(400).json({
                    erro: "A quantidade deve ser maior que zero"
                });
            }

            if (!id_pedido) {
                return res.status(400).json({
                    erro: "id_pedido é obrigatório"
                });
            }

            const item =
                await itemPedidoService.criar(
                    quantidade,
                    id_pedido
                );

            res.status(201).json(item);

        } catch (error) {
            next(error);
        }
    },

    async atualizar(req, res, next) {

        try {

            const { id } = req.params;

            const {
                quantidade,
                id_pedido
            } = req.body;

            if (
                quantidade === undefined ||
                quantidade <= 0
            ) {
                return res.status(400).json({
                    erro: "A quantidade deve ser maior que zero"
                });
            }

            if (!id_pedido) {
                return res.status(400).json({
                    erro: "id_pedido é obrigatório"
                });
            }

            const item =
                await itemPedidoService.atualizar(
                    id,
                    quantidade,
                    id_pedido
                );

            if (!item) {
                return res.status(404).json({
                    erro: "Item do pedido não encontrado"
                });
            }

            res.status(200).json(item);

        } catch (error) {
            next(error);
        }
    },

    async deletar(req, res, next) {

        try {

            const { id } = req.params;

            const deletado =
                await itemPedidoService.deletar(id);

            if (!deletado) {
                return res.status(404).json({
                    erro: "Item do pedido não encontrado"
                });
            }

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }

};

module.exports = itemPedidoController;
