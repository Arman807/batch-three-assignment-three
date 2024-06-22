"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const variantSchema = zod_1.default.object({
    type: zod_1.default.string().nonempty(),
    value: zod_1.default.string().nonempty(),
});
const inventorySchema = zod_1.default.object({
    quantity: zod_1.default.number().int().nonnegative(),
    inStock: zod_1.default.boolean(),
});
const productValidation = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().nonempty(),
        description: zod_1.default.string().nonempty(),
        price: zod_1.default.number().positive(),
        category: zod_1.default.string().default("Electronics"),
        tags: zod_1.default.array(zod_1.default.string().nonempty()),
        variants: zod_1.default.array(variantSchema),
        inventory: inventorySchema,
    })
});
exports.ProductValidation = {
    productValidation
};
