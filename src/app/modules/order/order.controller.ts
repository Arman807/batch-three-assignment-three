import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { ProductService } from "../product/product.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const createOrder = async (req: Request, res: Response) => {
  const { email, productId, price, quantity } = req.body;

  // Decrease the product quantity in the product collection
  const productUpdateResult = await ProductService.updateProductQuantity(
    productId,
    -quantity
  );

  if (!productUpdateResult) {
    return res.status(404).json({
      success: false,
      message: "Insufficient quantity available in inventory",
    });
  }

  // Create the order
  const result = await OrderService.createOrder({
    email,
    productId,
    price,
    quantity,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order created successfully",
    data: result,
  });
};
const getOrders = catchAsync(async (req: Request, res: Response) => {
  const email = req.query.email as string;

  let result;
  if (email) {
    if (!email) {
      throw new AppError(httpStatus.NOT_FOUND, "Order not found");
    }
    result = await OrderService.getOrderByEmail(email);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Orders fetched successfully for user email!",
      data: result,
    });
  } else {
    result = await OrderService.getAllOrder();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Orders fetched successfully!",
      data: result,
    });
  }
});

export const OrderController = {
  createOrder,
  getOrders,
};
