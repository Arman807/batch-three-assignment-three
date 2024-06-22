"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post("/products", product_controller_1.ProductController.createProduct);
router.get("/products", product_controller_1.ProductController.searchProducts);
router.get("/products", product_controller_1.ProductController.getProuduct);
router.get("/products/:_id", product_controller_1.ProductController.getProuductByid);
router.put("/products/:id", product_controller_1.ProductController.updateProduct);
router.delete("/products/:id", product_controller_1.ProductController.deleteProduct);
exports.ProductRoutes = router;
