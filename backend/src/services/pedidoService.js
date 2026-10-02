const pool = require("../config/database");

const pedidoService = {

    async listarTodos() {
        const [rows] = await pool.query(`
            SELECT
                p.id_pedido,
                p.status_atual,
                p.id_funcionario,
                f.nome AS funcionario_nome,
                f.funcao AS funcionario_funcao
            FROM pedido p
            LEFT JOIN funcionario f
                ON p.id_funcionario = f.id_funcionario
            ORDER BY p.id_pedido
        `);

        return rows;
    },

    async buscarPorId(id) {
        const [rows] = await pool.query(`
            SELECT
                p.id_pedido,
                p.status_atual,
                p.id_funcionario,
                f.nome AS funcionario_nome,
                f.funcao AS funcionario_funcao
            FROM pedido p
            LEFT JOIN funcionario f
                ON p.id_funcionario = f.id_funcionario
            WHERE p.id_pedido = ?
        `, [id]);

        return rows[0];
    },

    async criar(statusAtual, idFuncionario) {

        const [result] = await pool.query(`
            INSERT INTO pedido
            (status_atual, id_funcionario)
            VALUES (?, ?)
        `, [
            statusAtual,
            idFuncionario
        ]);

        return this.buscarPorId(result.insertId);
    },

    async atualizar(
        id,
        statusAtual,
        idFuncionario
    ) {

        const [result] = await pool.query(`
            UPDATE pedido
            SET
                status_atual = ?,
                id_funcionario = ?
            WHERE id_pedido = ?
        `, [
            statusAtual,
            idFuncionario,
            id
        ]);

        if (result.affectedRows === 0) {
            return null;
        }

        return this.buscarPorId(id);
    },

    async atualizarStatus(id, statusAtual) {

        const [result] = await pool.query(`
            UPDATE pedido
            SET status_atual = ?
            WHERE id_pedido = ?
        `, [
            statusAtual,
            id
        ]);

        if (result.affectedRows === 0) {
            return null;
        }

        return this.buscarPorId(id);
    },

    async deletar(id) {

        const [result] = await pool.query(`
            DELETE FROM pedido
            WHERE id_pedido = ?
        `, [id]);

        return result.affectedRows > 0;
    }

};

module.exports = pedidoService;
