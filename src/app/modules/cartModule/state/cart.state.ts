import { Procedure } from "src/app/models/procedure";
import { Product } from "src/app/models/product";

export interface CartState{
    procedures: Procedure[];
    products: Product[];
}

export const initialState: CartState = {
    procedures: null,
    products: null
 };
