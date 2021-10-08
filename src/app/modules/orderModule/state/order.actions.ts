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

export const ORDER_DETAILS_START = '[auth] order details start';
export const ORDER_DETAILS_SUCCESS = '[auth] order details success';
export const ORDER_DETAILS_FAIL = '[auth] order details fail';

export const orderDetailsStart = createAction(ORDER_DETAILS_START, props<{id: string}>());
export const orderDetailsSuccess = createAction(ORDER_DETAILS_SUCCESS, props<{order: Order ,message: string }>());
export const orderDetailsFail = createAction(ORDER_DETAILS_FAIL, props<{message: string}>());

export const DELETE_ORDER_START = '[auth] delete order start';
export const DELETE_ORDER_SUCCESS = '[auth] delete order success';
export const DELETE_ORDER_FAIL = '[auth] delete order fail';

export const deleteOrderStart = createAction(DELETE_ORDER_START, props<{id: string}>());
export const deleteOrderSuccess = createAction(DELETE_ORDER_SUCCESS, props<{id: string ,message: string }>());
export const deleteOrderFail = createAction(DELETE_ORDER_FAIL, props<{message: string}>());

export const MY_ORDERS_START = '[auth] my orders start';
export const MY_ORDERS_SUCCESS = '[auth] my orders success';
export const MY_ORDERS_FAIL = '[auth] my orders fail';

export const myOrdersStart = createAction(MY_ORDERS_START, props<{id: string}>());
export const myOrdersSuccess = createAction(MY_ORDERS_SUCCESS, props<{orders: any ,message: string }>());
export const myOrdersFail = createAction(MY_ORDERS_FAIL, props<{message: string}>());
