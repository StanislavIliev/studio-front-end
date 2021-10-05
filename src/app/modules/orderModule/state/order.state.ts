import { Product } from "src/app/models/product";
import { Procedure } from "src/app/models/procedure";
import { User } from "src/app/models/user";

export interface OrderState{
    id: string;
    user: User;
    products: Product[];
    procedures: Procedure[];
}

export const initialState: OrderState = {
    id: null,
    user: null,
    products: null,
    procedures: null
 };
