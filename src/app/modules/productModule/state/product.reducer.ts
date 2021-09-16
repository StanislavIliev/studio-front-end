import { createReducer, on } from "@ngrx/store";
import { deleteProductSuccess, allProductsSuccess, addProductSuccess, updateProductSuccess } from "./product.actions";
import { initialState } from "./product.state";


export const PRODUCT_STATE_NAME = 'product';

const _productReducer = createReducer(
  initialState,
//   on(addProductSuccess, (state, action ) => {
//     let product = { ...action.product };
//   return {
//     ...state,
//     products: [
//       ...state.products,
//     product
//   ],
// };
// }), 
on(updateProductSuccess, (state, action) => {
      const updatedProducts = state.products.map((product)=>{
        return action.product.id === product.id ? action.product : product;
      });
    return {
      ...state,
      products: updatedProducts,
  };
  }), 
  on(allProductsSuccess, (state, action) => {
  return {
    ...state,
    products: action.products,
};
}),
on(deleteProductSuccess, (state, { id }) => {
  const updatedProducts = state.products.filter((product) =>{
      return product.id !== id;
  });
return {
  ...state,
  products: updatedProducts,
};
})
);

export function productReducer(state, action) {
  return _productReducer(state, action);

}
