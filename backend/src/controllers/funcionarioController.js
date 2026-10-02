const funcionarioService = require("../services/funcionarioService");

const funcionarioController = {

    async listar(req, res, next) {
        try {
            const funcionarios = await funcionarioService.listarTodos();

            res.status(200).json(funcionarios);
        } catch (error) {
            next(error);
        }
    },

    async buscarPorId(req, res, next) {
        try {
            const { id } = req.params;

            const funcionario =
                await funcionarioService.buscarPorId(id);

            if (!funcionario) {
                return res.status(404).json({
                    erro: "Funcionário não encontrado"
                });
            }

            res.status(200).json(funcionario);

        } catch (error) {
            next(error);
        }
    },

    async criar(req, res, next) {
        try {
            const { nome, funcao } = req.body;

            if (!nome || !funcao) {
                return res.status(400).json({
                    erro: "Nome e função são obrigatórios"
                });
            }

            const funcionario =
                await funcionarioService.criar(nome, funcao);

            res.status(201).json(funcionario);

        } catch (error) {
            next(error);
        }
    },

    async atualizar(req, res, next) {
        try {
            const { id } = req.params;
            const { nome, funcao } = req.body;

            if (!nome || !funcao) {
                return res.status(400).json({
                    erro: "Nome e função são obrigatórios"
                });
            }

            const funcionario =
                await funcionarioService.atualizar(
                    id,
                    nome,
                    funcao
                );

            if (!funcionario) {
                return res.status(404).json({
                    erro: "Funcionário não encontrado"
                });
            }

            res.status(200).json(funcionario);

        } catch (error) {
            next(error);
        }
    },

    async deletar(req, res, next) {
        try {
            const { id } = req.params;

            const deletado =
                await funcionarioService.deletar(id);

            if (!deletado) {
                return res.status(404).json({
                    erro: "Funcionário não encontrado"
                });
            }

            res.status(204).send();

        } catch (error) {
            next(error);
        }
    }

};

module.exports = funcionarioController;
