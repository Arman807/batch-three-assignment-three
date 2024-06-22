import httpStatus from "http-status";
import { ProductService } from "./product.service";
import { Request, Response } from "express";


import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Product } from "./product.model";
import AppError from "../../errors/AppError";

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductService.createProduct(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully!",
    data: result,
  });
});
const getProuduct = async (req: Request, res: Response) => {
  const result = await ProductService.getProduct();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products fetched successfully!",
    data: result,
  });
};
const getProuductByid = async (req: Request, res: Response) => {
  const { _id } = req.params;
  const result = await ProductService.getProductbyId(_id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product fetched successfully!",
    data: result,
  });
};
const updateProduct = async (req: Request, res: Response) => {
  const productId = req.params.id as string;
  const updateData = req.body;
  const result = await ProductService.updateProduct(productId, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully!",
    data: result,
  });
};

const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id as string;
 const result= ProductService.deleteProduct(productId);
 if(!result){
  throw new AppError(httpStatus.NOT_FOUND,'Product not found')
 }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully!",
    data: null,
  });
};
const searchProducts = async (req: Request, res: Response) => {
  const searchTerm = req.query.searchTerm as string;
  const result = await ProductService.searchProducts(searchTerm);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Products matching search term ${searchTerm} fetched successfully!`,
    data: result,
  });
};
const updateProductQuantity = async (
  productId: string,
  quantityChange: number
) => {
  const product = await Product.findById(productId);

  if (!product) {
    return null;
  }

  if (product.inventory.quantity + quantityChange < 0) {
    return null;
  }

  product.inventory.quantity += quantityChange; // quantityChange should be negative to reduce the quantity
  product.inventory.inStock = product.inventory.quantity > 0;
  await product.save();

  return product;
};

export const ProductController = {
  createProduct,
  getProuduct,
  getProuductByid,
  updateProduct,
  deleteProduct,
  searchProducts,
  updateProductQuantity,
};
