const pool = require("../config/database");

const registroService = {

    async listarTodos() {

        const [rows] = await pool.query(`
            SELECT *
            FROM registro
            ORDER BY horario DESC
        `);

        return rows;
    },

    async buscarPorId(id) {

        const [rows] = await pool.query(`
            SELECT *
            FROM registro
            WHERE id_registro = ?
        `, [id]);

        return rows[0];
    },

    async criar(atividade, horario = null) {

        const [result] = await pool.query(`
            INSERT INTO registro
            (atividade, horario)
            VALUES (?, COALESCE(?, CURRENT_TIMESTAMP))
        `, [
            atividade,
            horario
        ]);

        return this.buscarPorId(result.insertId);
    },

    async atualizar(id, atividade, horario) {

        const [result] = await pool.query(`
            UPDATE registro
            SET
                atividade = ?,
                horario = ?
            WHERE id_registro = ?
        `, [
            atividade,
            horario,
            id
        ]);

        if (result.affectedRows === 0) {
            return null;
        }

        return this.buscarPorId(id);
    },

    async deletar(id) {

        const [result] = await pool.query(`
            DELETE FROM registro
            WHERE id_registro = ?
        `, [id]);

        return result.affectedRows > 0;
    }

};

module.exports = registroService;
