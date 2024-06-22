import { TOrder } from "./order.interface";
import { Order } from "./order.model";


const createOrder=async(payload:TOrder)=>{
    const result=(await Order.create(payload))
    return result;
}
const getAllOrder=async()=>{
    const result=await Order.find();
    return result;
}

const getOrderByEmail = async (email: string) => {
    const regex = new RegExp(email, "i"); 
    const result = await Order.find({ email: regex });
    return result;
  };
export const OrderService={
    createOrder,getAllOrder,getOrderByEmail
}