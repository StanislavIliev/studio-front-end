import { Order } from "src/app/models/order";


export interface OrderState{
    orders: Order[];
}

export const initialState: OrderState = {
    orders: null
 };
