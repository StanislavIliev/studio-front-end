import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Product } from "src/app/models/product";

export interface ProductState extends EntityState<Product>{
}
export const productAdapter =  createEntityAdapter<Product>();

export const initialState: ProductState = productAdapter.getInitialState();

