import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  filterAllProducts,
} from "../controllers/product.controller.js";
import { authenticate } from "../middlewares/auth.js";
import {
  validate,
  objectIdSchema,
  createProductSchema,
  updateProductSchema,
} from "../middlewares/validator.js";

const router = Router();

// Public Routes
router.get("/", getAllProducts);
router.get("/filter", filterAllProducts);
router.get("/:id", validate(objectIdSchema), getProductById);

// Authenticated / Protected Routes
router.post("/", authenticate, validate(createProductSchema), createProduct);
router.put("/:id", authenticate, validate(updateProductSchema), updateProduct);
router.patch("/:id", authenticate, validate(updateProductSchema), updateProduct);
router.delete("/:id", authenticate, validate(objectIdSchema), deleteProduct);
router.delete("/", authenticate, deleteAllProducts);

export default router;
