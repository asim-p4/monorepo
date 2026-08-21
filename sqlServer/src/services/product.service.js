import { pool } from "../config/db.js";

export async function getAllProducts() {
  const [result] = await pool.query(`SELECT * FROM products`);
  return result;
}

export async function getProductById(id) {
  const [result] = await pool.query(`SELECT * FROM products WHERE id = ${id}`);
  return result;
}

export async function createProduct(data) {
  const { name, description, price } = data;
  const [result] = await pool.execute(
    `INSERT INTO products (name, description, price) VALUES(?,?,?)`,
    [name, description, price],
  );
  return result;
}

export async function updateProduct(id, data) {
  const { name, description, price } = data;

  const [result] = await pool.query(
    `UPDATE products 
             SET 
                 name = COALESCE(?, name),
                 description = COALESCE(?, description),
                 price = COALESCE(?, price),
                 updatedAt = NOW()
             WHERE id = ?`,
    [name, description, price, id],
  );

  return result;
}

export async function deleteProduct() {}

export async function deleteAllProducts() {}
