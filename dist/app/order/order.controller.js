"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const product_service_1 = require("../modules/product.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, productId, price, quantity } = req.body;
    // Decrease the product quantity in the product collection
    const productUpdateResult = yield product_service_1.ProductService.updateProductQuantity(productId, -quantity);
    if (!productUpdateResult) {
        return res.status(404).json({
            success: false,
            message: "Insufficient quantity available in inventory",
        });
    }
    // Create the order
    const result = yield order_service_1.OrderService.createOrder({
        email,
        productId,
        price,
        quantity,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Order created successfully",
        data: result,
    });
});
const getAllOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderService.getAllOrder();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Order is retrieved successfully",
        data: result,
    });
}));
const getOrderByemail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    const result = yield order_service_1.OrderService.getorderEmail(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Orders fetched successfully for user email!",
        data: result,
    });
}));
exports.OrderController = {
    createOrder,
    getAllOrder,
    getOrderByemail,
};
