import { createReducer, on } from "@ngrx/store";
import { initialState } from "./cart.state";
import { deleteProcedureFromCartSuccess, deleteProductFromCartSuccess, updateCartSuccess } from './cart.actions';


const _cartReducer = createReducer(
   initialState,
  on(updateCartSuccess, (state, action) => {
  return {
    ...state,
    cart: action.message,
};
}),
// on(deleteProcedureFromCartSuccess, (state, { id }) => {
//   const updatedProcedures = state.procedures.filter((procedure) =>{
//       return procedure.id !== id;
//   });
// return {
//   ...state,
//   procedures: updatedProcedures,
// };
// }),
// on(deleteProductFromCartSuccess, (state, { id }) => {
//   const updatedProducts = state.products.filter((product) =>{
//       return product.id !== id;
//   });
// return {
//   ...state,
//   products: updatedProducts,
// };
// })
 );

export function cartReducer(state, action) {
  return _cartReducer(state, action);

}
