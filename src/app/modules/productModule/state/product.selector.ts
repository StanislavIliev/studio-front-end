import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/store/router/custom-serializer";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { productAdapter, ProductState } from "./product.state";

export const PRODUCT_STATE_NAME = 'products';

const getProductState = createFeatureSelector<ProductState>(PRODUCT_STATE_NAME);

export const productSelectors = productAdapter.getSelectors();
export const getProductEntities = createSelector(getProductState , productSelectors.selectEntities);
export const getProducts = createSelector(getProductState, productSelectors.selectAll);

export const getProductById = createSelector(
  getProductEntities , getCurrentRoute,(products, route: RouterStateUrl) => {
    return products ? products[route.params['id']] : null;
});
