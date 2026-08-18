import { Product } from "../models/product.model.js";

export async function getAllProducts() {
  return await Product.find();
}

export async function getProductById(id) {
  const product = await Product.findById(id);
  
  if (!product) {
    const error = new Error(`Product with ID "${id}" not found`);
    error.statusCode = 404;
    throw error;
  }
  return product;
}

export async function createProduct(productData) {
  return await Product.create(productData);
}

export async function updateProduct(id, updateData) {
  const product = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    const error = new Error(`Product with ID "${id}" not found`);
    error.statusCode = 404;
    throw error;
  }
  return product;
}

export async function deleteProduct(id) {
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    const error = new Error(`Product with ID "${id}" not found`);
    error.statusCode = 404;
    throw error;
  }
  return { message: "Product deleted successfully" };
}

export async function deleteAllProducts() {
  await Product.deleteMany({});
  return { message: "All products deleted successfully" };
}
