import { Product } from "src/app/models/product";
import { Procedure } from "src/app/models/procedure";

export interface OrderState{
    id: string;
    products: Product[];
    procedures: Procedure[];
}

export const initialState: OrderState = {
    id: null,
    products: null,
    procedures: null
 };
