import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};
const getProduct = async () => {
  const result = await Product.find();
  return result;
};
const getProductbyId = async (_id: string) => {
  const result = await Product.findById(_id);
  return result;
};
const updateProduct = async (id: string, updateData: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(id, updateData, { new: true });
  return result;
};
const deleteProduct = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};
const searchProducts = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, "i");
  const result = await Product.find({
    $or: [
      { name: regex },
      { description: regex },
      { category: regex },
      { tags: regex },
    ],
  });
  return result;
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

export const ProductService = {
  createProduct,
  getProduct,
  getProductbyId,
  updateProduct,
  deleteProduct,
  searchProducts,
  updateProductQuantity,
};
