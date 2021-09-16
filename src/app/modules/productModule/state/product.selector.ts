import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "src/app/store/router/custom-serializer";
import { getCurrentRoute } from "src/app/store/router/router.selector";
import { ProductState } from "./product.state";

export const PRODUCT_STATE_NAME = 'products';

const getProductState = createFeatureSelector<ProductState>(PRODUCT_STATE_NAME);

