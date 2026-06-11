import pool from "./pool.js";

export async function selectInventoryFromCategory(category) {
    const { rows } = await pool.query('SELECT inventory.* FROM inventory JOIN categories ON inventory.category_id = categories.id WHERE categories.category = ($1)', [category]);
    return rows;
}