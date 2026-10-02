const pool = require("../config/database");

const produtoService = {

    async listarTodos() {
        const [rows] = await pool.query(
            "SELECT * FROM produto ORDER BY id_produto"
        );

        return rows;
    },

    async buscarPorId(id) {
        const [rows] = await pool.query(
            `
            SELECT *
            FROM produto
            WHERE id_produto = ?
            `,
            [id]
        );

        return rows[0];
    },

    async criar(nome, preco, estoque) {
        const [result] = await pool.query(
            `
            INSERT INTO produto
            (nome, preco, estoque)
            VALUES (?, ?, ?)
            `,
            [nome, preco, estoque]
        );

        return this.buscarPorId(result.insertId);
    },

    async atualizar(id, nome, preco, estoque) {
        const [result] = await pool.query(
            `
            UPDATE produto
            SET nome = ?,
                preco = ?,
                estoque = ?
            WHERE id_produto = ?
            `,
            [nome, preco, estoque, id]
        );

        if (result.affectedRows === 0) {
            return null;
        }

        return this.buscarPorId(id);
    },

    async deletar(id) {
        const [result] = await pool.query(
            `
            DELETE FROM produto
            WHERE id_produto = ?
            `,
            [id]
        );

        return result.affectedRows > 0;
    }

};

module.exports = produtoService;
