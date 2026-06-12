import pool from "./pool.js";

export async function selectInventoryFromCategory(category) {
    const { rows } = await pool.query('SELECT inventory.* FROM inventory JOIN categories ON inventory.category_id = categories.id WHERE categories.category = ($1)', [category]);
    return rows;
}

export async function getCategoryNameById(id) {
    const result = await pool.query('SELECT category FROM categories WHERE id = $1', [id]);
    return result.rows[0].category; // Returns string from object
}

export async function addNewItem(category, itemName, quantity, rating, notes, proof) {
    await pool.query('INSERT INTO inventory (category_id, name, quantity, rating, notes, proof) VALUES ($1, $2, $3, $4, $5, $6)', [category, itemName, quantity, rating, notes, proof])
}