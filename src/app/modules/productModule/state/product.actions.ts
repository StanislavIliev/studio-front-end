import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/models/product";


export const ADD_PRODUCT_START = '[user] add product start';
export const ADD_PRODUCT_SUCCESS = '[user] add product success';
export const ADD_PRODUCT_FAIL = '[user] add product fail';

export const addProductStart = createAction(ADD_PRODUCT_START, props<{newProduct: Product}>());
export const addProductSuccess = createAction(ADD_PRODUCT_SUCCESS, props<{ product : Product}>());
export const addProductFail = createAction(ADD_PRODUCT_FAIL, props<{message: string}>());

export const ALL_PRODUCTS_START = '[user] all products start';
export const ALL_PRODUCTS_SUCCESS = '[user] all products success';
export const ALL_PRODUCTS_FAIL = '[user] all products fail';

export const allProductsStart = createAction(ALL_PRODUCTS_START);
export const allProductsSuccess = createAction(ALL_PRODUCTS_SUCCESS, props<{ products : Product[]}>());
export const allProductsFail = createAction(ALL_PRODUCTS_FAIL, props<{message: string}>());

export const UPDATE_PRODUCT_START = '[user] update product start';
export const UPDATE_PRODUCT_SUCCESS = '[user] update product success';
export const UPDATE_PRODUCT_FAIL = '[user] update product fail';

export const updateProductStart = createAction(UPDATE_PRODUCT_START, props<{product: Product}>());
export const updateProductSuccess = createAction(UPDATE_PRODUCT_SUCCESS, props<{product: Product }>());
export const updateProductFail = createAction(UPDATE_PRODUCT_FAIL, props<{message: string}>());


export const DELETE_PRODUCT_START = '[user] delete product start';
export const DELETE_PRODUCT_SUCCESS = '[user] delete product success';
export const DELETE_PRODUCT_FAIL = '[user] delete product fail';

export const deleteProductStart = createAction(DELETE_PRODUCT_START, props<{ id: string}>());
export const deleteProductSuccess = createAction(DELETE_PRODUCT_SUCCESS, props<{ id: string}>());
export const deleteProductFail = createAction(DELETE_PRODUCT_FAIL, props<{message: string}>());

export const dummyAction = createAction('[dummy action]');
