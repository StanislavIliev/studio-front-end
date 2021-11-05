import { createReducer, on } from "@ngrx/store";
import { deleteProductSuccess, allProductsSuccess, addProductSuccess, updateProductSuccess } from "./product.actions";
import { initialState } from "./product.state";

const _productReducer = createReducer(
  initialState,
  on(allProductsSuccess, (state, action) => {
  return {
    ...state,
    products: action.products,
};
}),
on(deleteProductSuccess, (state, action) => {
  const updatedProducts = state.products.filter((product) =>{
      return product.id !== action.id;
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
