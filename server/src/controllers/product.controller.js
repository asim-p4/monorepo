import { asyncHandler } from "../middlewares/asyncHandler.js";
import * as productService from "../services/product.service.js";

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAllProducts(req.query.page);
  res.status(200).json(products);
});

export const filterAllProducts = asyncHandler(async (req, res) => {
  const products = await productService.filterAllProducts(req.query);
  res.status(200).json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  res.status(200).json(product);
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct({
    ...req.body,
    createdBy: req.user._id,
  });
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);
  res.status(200).json(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const result = await productService.deleteProduct(req.params.id);
  res.status(200).json(result);
});

export const deleteAllProducts = asyncHandler(async (_req, res) => {
  const result = await productService.deleteAllProducts();
  res.status(200).json(result);
});
