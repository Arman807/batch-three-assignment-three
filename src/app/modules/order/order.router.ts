import express from "express";
import { OrderController } from "./order.controller";
import validateRequest from "../../middleWare/validateRequest";
import orderValidation from "./order.validation";

const router = express.Router();
router.post(
  "/orders",
  validateRequest(orderValidation),
  OrderController.createOrder
);
router.get("/orders", OrderController.getOrders);

export const OrderRoutes = router;
