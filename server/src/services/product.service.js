import { Product } from "../models/product.model.js";

export async function getAllProducts(page = 1) {
  const pageNum = parseInt(page, 10) || 1;
  const skip = 10 * (pageNum - 1);
  return await Product.find()
    .populate("createdBy", "name email")
    .skip(skip)
    .limit(10);
}

export async function filterAllProducts(query = {}) {
  const { min, max } = query;
  const filter = {};

  if (min !== undefined || max !== undefined) {
    filter.price = {};
    if (min !== undefined) filter.price.$gte = parseFloat(min);
    if (max !== undefined) filter.price.$lte = parseFloat(max);
  }

  return await Product.find(filter).populate("createdBy", "name email");
}

export async function getProductById(id) {
  const product = await Product.findById(id).populate("createdBy", "name email");
  if (!product) {
    const error = new Error(`Product with ID "${id}" not found`);
    error.statusCode = 404;
    throw error;
  }
  return product;
}

export async function createProduct(productData) {
  const product = await Product.create(productData);
  return await product.populate("createdBy", "name email");
}

export async function updateProduct(id, updateData) {
  const product = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).populate("createdBy", "name email");

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
