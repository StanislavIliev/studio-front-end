import { Procedure } from "src/app/models/procedure";
import { Product } from "src/app/models/product";

export interface CartState{
    id: string;
    procedures: Procedure[];
    products: Product[];
}

export const initialState: CartState = {
    id: null,
    procedures: null,
    products: null
 };
 