const registroService =
    require("../services/registroService");

const registroController = {

    async listar(req, res, next) {

        try {

            const registros =
                await registroService.listarTodos();

            res.status(200).json(registros);

        } catch (error) {
            next(error);
        }
    },

    async buscarPorId(req, res, next) {

        try {

            const { id } = req.params;

            const registro =
                await registroService.buscarPorId(id);

            if (!registro) {
                return res.status(404).json({
                    erro: "Registro não encontrado"
                });
            }

            res.status(200).json(registro);

        } catch (error) {
            next(error);
        }
    },

    async criar(req, res, next) {

        try {

            const {
                atividade,
                horario
            } = req.body;

            if (!atividade) {
                return res.status(400).json({
                    erro: "atividade é obrigatória"
                });
            }

            const registro =
                await registroService.criar(
                    atividade,
                    horario
                );

            res.status(201).json(registro);

        } catch (error) {
            next(error);
        }
    },

    async atualizar(req, res, next) {

        try {

            const { id } = req.params;

            const {
                atividade,
                horario
            } = req.body;

            if (!atividade || !horario) {
                return res.status(400).json({
                    erro: "atividade e horario são obrigatórios"
                });
            }

            const registro =
                await registroService.atualizar(
                    id,
                    atividade,
                    horario
                );

            if (!registro) {
                return res.status(404).json({
                    erro: "Registro não encontrado"
                });
            }

            res.status(200).json(registro);

        } catch (error) {
            next(error);
        }
    },

    async deletar(req, res, next) {

        try {

            const { id } = req.params;

            const deletado =
                await registroService.deletar(id);

            if (!deletado) {
                return res.status(404).json({
                    erro: "Registro não encontrado"
                });
            }

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }

};

module.exports = registroController;
