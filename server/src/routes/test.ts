import { Router } from "express";
import { testing } from "../controllers/testingController.js";


const router = Router();

router.get("/", testing)

export default router