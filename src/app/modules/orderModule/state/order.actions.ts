import { createAction, props } from "@ngrx/store";
import { Order } from "src/app/models/order";

export const UPDATE_ORDER_START = '[user] update order start';
export const UPDATE_ORDER_SUCCESS = '[user] update order success';
export const UPDATE_ORDER_FAIL = '[user] update order fail';

export const updateOrderStart = createAction(UPDATE_ORDER_START, props<{order: Order}>());
export const updateOrderSuccess = createAction(UPDATE_ORDER_SUCCESS, props<{order: Order ,message: string }>());
export const updateOrderFail = createAction(UPDATE_ORDER_FAIL, props<{message: string}>());
