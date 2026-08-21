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
  idParamSchema,
  createProductSchema,
  updateProductSchema,
} from "../middlewares/validator.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", validate(idParamSchema), getProductById);
router.post("/", validate(createProductSchema), createProduct);
router.put("/:id", validate(updateProductSchema), updateProduct);
router.delete("/:id", validate(idParamSchema), deleteProduct);
router.delete("/", deleteAllProducts);

export default router;
