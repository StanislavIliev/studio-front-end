import { createReducer, on } from "@ngrx/store";
import { updateOrderStart, updateOrderSuccess } from "./order.actions";
import { initialState } from "./order.state";

const _orderReducer = createReducer(
  initialState,
 on(updateOrderStart, (state, action) => {
      const updatedOrder = action.order;
    return {
      ...state,
      order: updatedOrder,
  };
  }), 
);

export function orderReducer(state, action) {
  return _orderReducer(state, action);

}
