import { createAction, props } from "@ngrx/store";
import { Order } from "src/app/models/order";

export const UPDATE_ORDER_START = '[auth] update order start';
export const UPDATE_ORDER_SUCCESS = '[auth] update order success';
export const UPDATE_ORDER_FAIL = '[auth] update order fail';

export const updateOrderStart = createAction(UPDATE_ORDER_START, props<{order: Order}>());
export const updateOrderSuccess = createAction(UPDATE_ORDER_SUCCESS, props<{order: Order ,message: string }>());
export const updateOrderFail = createAction(UPDATE_ORDER_FAIL, props<{message: string}>());

export const ADD_ORDER_START = '[auth] add order start';
export const ADD_ORDER_SUCCESS = '[auth] add order success';
export const ADD_ORDER_FAIL = '[auth] add order fail';

export const addOrderStart = createAction(ADD_ORDER_START, props<{order: Order}>());
export const addOrderSuccess = createAction(ADD_ORDER_SUCCESS, props<{order: Order ,message: string }>());
export const addOrderFail = createAction(ADD_ORDER_FAIL, props<{message: string}>());

export const ALL_ORDERS_START = '[auth] all orders start';
export const ALL_ORDERS_SUCCESS = '[auth] all orders success';
export const ALL_ORDERS_FAIL = '[auth] all orders fail';

export const allOrdersStart = createAction(ALL_ORDERS_START);
export const allOrdersSuccess = createAction(ALL_ORDERS_SUCCESS, props<{orders: any ,message: string }>());
export const allOrdersFail = createAction(ALL_ORDERS_FAIL, props<{message: string}>());
