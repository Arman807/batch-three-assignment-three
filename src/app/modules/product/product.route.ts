import express from "express";
import { ProductController } from "./product.controller";


const router = express.Router();

router.post("/products", ProductController.createProduct);
router.get("/products", ProductController.getProductOrSearch);

router.get("/products/:id", ProductController.getProuductByid);
router.put("/products/:id", ProductController.updateProduct);
router.delete("/products/:id", ProductController.deleteProduct);

export const ProductRoutes = router;
