const pool = require("../config/database");

const funcionarioService = {

    async listarTodos() {
        const [rows] = await pool.query(
            "SELECT * FROM funcionario ORDER BY id_funcionario"
        );

        return rows;
    },

    async buscarPorId(id) {
        const [rows] = await pool.query(
            "SELECT * FROM funcionario WHERE id_funcionario = ?",
            [id]
        );

        return rows[0];
    },

    async criar(nome, funcao) {
        const [result] = await pool.query(
            `
            INSERT INTO funcionario
            (nome, funcao)
            VALUES (?, ?)
            `,
            [nome, funcao]
        );

        return {
            id_funcionario: result.insertId,
            nome,
            funcao
        };
    },

    async atualizar(id, nome, funcao) {
        const [result] = await pool.query(
            `
            UPDATE funcionario
            SET nome = ?, funcao = ?
            WHERE id_funcionario = ?
            `,
            [nome, funcao, id]
        );

        if (result.affectedRows === 0) {
            return null;
        }

        return this.buscarPorId(id);
    },

    async deletar(id) {
        const [result] = await pool.query(
            "DELETE FROM funcionario WHERE id_funcionario = ?",
            [id]
        );

        return result.affectedRows > 0;
    }

};

module.exports = funcionarioService;
