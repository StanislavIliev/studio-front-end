import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./product.state";

export const PRODUCT_STATE_NAME = 'products';

const getProductState = createFeatureSelector<ProductState>(PRODUCT_STATE_NAME);

export const getProductById = createSelector(getProductState, (state, props) => {
    return state.products.find((product) => product.id === props.id);
  });
