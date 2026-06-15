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

export async function findItem(id) {
    const { rows } = await pool.query('SELECT * FROM inventory WHERE id = $1', [id]);
    return rows[0];
}

export async function editItem(id, category, itemName, quantity, rating, notes, proof) {
    await pool.query('UPDATE inventory SET category_id = $2, name = $3, quantity = $4, rating = $5, notes = $6, proof = $7 WHERE inventory.id = $1', [id, category, itemName, quantity, rating, notes, proof] )
}

export async function deleteItem(id) {
    await pool.query('DELETE FROM inventory WHERE id = $1', [id])
}