import { createReducer, on } from "@ngrx/store";
import { initialState } from "./cart.state";
import { deleteProcedureFromCartSuccess,emptyCartSuccess , deleteProductFromCartSuccess, cartLoadSuccess ,updateCartSuccess } from './cart.actions';


const _cartReducer = createReducer(
   initialState,
  on(updateCartSuccess, (state, action) => {
  return {
    ...state,
    cart: action.message,
};
}),
on(cartLoadSuccess, (state, action) => {
  return {
    ...state,
    procedures: action.cart.procedures,
    id: action.cart.id,
    products: action.cart.products,
};
}),
on(deleteProcedureFromCartSuccess, (state, action) => {
  const updatedProcedures = state.procedures.filter((procedure) =>{
      return procedure.id !== action.id;
  });
return {
  ...state,
  procedures: updatedProcedures,
};
}),
on(deleteProductFromCartSuccess, (state,action) => {
  const updatedProducts = state.products.filter((product) =>{
      return product.id !== action.id;
  });
return {
  ...state,
  products: updatedProducts,
};
}),
on(emptyCartSuccess, (state,action) => {
return {
  ...state,
  products: null,
  id: null,
  procedures: null
};
})
 );

export function cartReducer(state, action) {
  return _cartReducer(state, action);

}
