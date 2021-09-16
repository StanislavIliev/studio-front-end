import { Product } from "src/app/models/product";

export interface ProductState{
    products: Product[];
}

export const initialState: ProductState = {
    products: null
 };
