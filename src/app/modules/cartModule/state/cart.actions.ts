import { createAction, props } from "@ngrx/store";
import { Cart } from "src/app/models/cart";
import { User } from "src/app/models/user";

export const CART_LOAD_START = '[auth] cart load start';
export const CART_LOAD_SUCCESS = '[auth] cart load success';
export const CART_LOAD_FAIL = '[auth] cart load fail';

export const cartLoadStart = createAction(CART_LOAD_START, props<{id: string}>());
export const cartLoadSuccess = createAction(CART_LOAD_SUCCESS, props<{ cart : Cart , message: string}>());
export const cartLoadFail = createAction(CART_LOAD_FAIL, props<{message: string}>());

export const DELETE_PROCEDURE_FROM_CART_START = '[auth] delete procedure from cart start';
export const DELETE_PROCEDURE_FROM_CART_SUCCESS = '[auth] delete procedure from cart success';
export const DELETE_PROCEDURE_FROM_CART_FAIL = '[user] delete procedure from cart fail';

export const deleteProcedureFromCartStart = createAction(DELETE_PROCEDURE_FROM_CART_START, props<{ id: string}>());
export const deleteProcedureFromCartSuccess = createAction(DELETE_PROCEDURE_FROM_CART_SUCCESS, props<{ id: string ,message: string}>());
export const deleteProcedureFromCartFail = createAction(DELETE_PROCEDURE_FROM_CART_FAIL, props<{message: string}>());

export const DELETE_PRODUCT_FROM_CART_START = '[auth] delete product from cart start';
export const DELETE_PRODUCT_FROM_CART_SUCCESS = '[auth] delete product from cart success';
export const DELETE_PRODUCT_FROM_CART_FAIL = '[auth] delete product from cart fail';

export const deleteProductFromCartStart = createAction(DELETE_PRODUCT_FROM_CART_START, props<{ id: string}>());
export const deleteProductFromCartSuccess = createAction(DELETE_PRODUCT_FROM_CART_SUCCESS, props<{ id: string , message: string}>());
export const deleteProductFromCartFail = createAction(DELETE_PRODUCT_FROM_CART_FAIL, props<{message: string}>());


export const EMPTY_CART_START = '[auth] empty cart start';
export const EMPTY_CART_SUCCESS = '[auth] empty cart success';
export const EMPTY_CART_FAIL = '[auth] empty cart fail';

export const emptyCartStart = createAction(EMPTY_CART_START, props<{ auth: User}>());
export const emptyCartSuccess = createAction(EMPTY_CART_SUCCESS, props<{ auth: User , message: string}>());
export const emptyCartFail = createAction(EMPTY_CART_FAIL, props<{message: string}>());


export const CART_PLACE_ORDER_START = '[auth] cart place order start';
export const CART_PLACE_ORDER_SUCCESS = '[auth] cart place order success';
export const CART_PLACE_ORDER_FAIL = '[auth] cart place order fail';

export const cartPlaceOrderStart = createAction(CART_PLACE_ORDER_START, props<{ cart: Cart }>());
export const cartPlaceOrderSuccess = createAction(CART_PLACE_ORDER_SUCCESS, props<{ cart: Cart , message: string}>());
export const cartPlaceOrderFail = createAction(CART_PLACE_ORDER_FAIL, props<{message: string}>());

export const UPDATE_DGALAL = '[auth] delete product from cart fail';

export const updateCartSuccess = createAction(UPDATE_DGALAL, props<{message: string}>());

 