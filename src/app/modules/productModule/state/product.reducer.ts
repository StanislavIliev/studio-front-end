import { createReducer, on } from "@ngrx/store";
import { addProductSuccess, allProductsSuccess, updateProductSuccess } from "./product.actions";
import { initialState, productAdapter } from "./product.state";

const _productReducer = createReducer(initialState,
    on(addProductSuccess, (state, action) => {
      return productAdapter.addOne(action.product , state);

    }),
    // on(updateProductSuccess , (state, action) => {
    //     return productAdapter.updateOne(action.product, state);
    // }),
    on(allProductsSuccess, (state, action) => {
    return productAdapter.setAll(action.products,state);
    })
);

export function productReducer(state, action) {
    return _productReducer(state, action);
}
