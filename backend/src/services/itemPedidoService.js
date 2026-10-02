const pool = require("../config/database");

const itemPedidoService = {

    async listarTodos() {

        const [rows] = await pool.query(`
            SELECT
                i.id_item,
                i.quantidade,
                i.id_pedido,
                p.status_atual
            FROM item_pedido i
            LEFT JOIN pedido p
                ON i.id_pedido = p.id_pedido
            ORDER BY i.id_item
        `);

        return rows;
    },

    async buscarPorId(id) {

        const [rows] = await pool.query(`
            SELECT
                i.id_item,
                i.quantidade,
                i.id_pedido,
                p.status_atual
            FROM item_pedido i
            LEFT JOIN pedido p
                ON i.id_pedido = p.id_pedido
            WHERE i.id_item = ?
        `, [id]);

        return rows[0];
    },

    async listarPorPedido(idPedido) {

        const [rows] = await pool.query(`
            SELECT
                i.id_item,
                i.quantidade,
                i.id_pedido
            FROM item_pedido i
            WHERE i.id_pedido = ?
            ORDER BY i.id_item
        `, [idPedido]);

        return rows;
    },

    async criar(quantidade, idPedido) {

        const [result] = await pool.query(`
            INSERT INTO item_pedido
            (quantidade, id_pedido)
            VALUES (?, ?)
        `, [
            quantidade,
            idPedido
        ]);

        return this.buscarPorId(result.insertId);
    },

    async atualizar(id, quantidade, idPedido) {

        const [result] = await pool.query(`
            UPDATE item_pedido
            SET
                quantidade = ?,
                id_pedido = ?
            WHERE id_item = ?
        `, [
            quantidade,
            idPedido,
            id
        ]);

        if (result.affectedRows === 0) {
            return null;
        }

        return this.buscarPorId(id);
    },

    async deletar(id) {

        const [result] = await pool.query(`
            DELETE FROM item_pedido
            WHERE id_item = ?
        `, [id]);

        return result.affectedRows > 0;
    }

};

module.exports = itemPedidoService;
