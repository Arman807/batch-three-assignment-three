/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const product_route_1 = require("./app/modules/product.route");
const order_router_1 = require("./app/order/order.router");
const notfound_1 = __importDefault(require("./app/middleWare/notfound"));
const globalErrorHandler_1 = __importDefault(require("./app/middleWare/globalErrorHandler"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use("/api", product_route_1.ProductRoutes);
exports.app.use("/api/orders", order_router_1.OrderRoutes);
exports.app.get("/", (req, res) => {
    res.send("Hello World!");
});
exports.app.use(globalErrorHandler_1.default);
exports.app.use(notfound_1.default);
