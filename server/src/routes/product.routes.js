import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
} from "../controllers/product.controller.js";
import {
  validate,
  objectIdSchema,
  createProductSchema,
  updateProductSchema,
} from "../middlewares/validator.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", validate(objectIdSchema), getProductById);
router.post("/", validate(createProductSchema), createProduct);
router.put("/:id", validate(updateProductSchema), updateProduct);
router.delete("/:id", validate(objectIdSchema), deleteProduct);
router.delete("/", deleteAllProducts);

export default router;
