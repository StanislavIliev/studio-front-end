import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap , map, switchMap, tap, filter, withLatestFrom} from "rxjs/operators";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { RouterNavigatedAction,  ROUTER_NAVIGATION } from "@ngrx/router-store";
import { Update } from "@ngrx/entity";
import { of } from "rxjs";
import { ProductService } from "src/app/services/productService";
import { addProductStart, addProductSuccess, allProductsSuccess, dummyAction, updateProductStart, updateProductSuccess } from "./product.actions";
import { getProducts } from "./product.selector";
import { Product } from "src/app/models/product";

@Injectable()
export class ProductEffects{
  constructor(private actions$: Actions,
    private productService : ProductService,
    private store: Store<AppState>,
    private router: Router
    ){}

allProducts$ = createEffect(() => {
return this.actions$.pipe(
  ofType(allProductsSuccess),
  withLatestFrom(this.store.select(getProducts)),
  mergeMap(([action,products]) => {
    if(!products.length || products.length === 1){
return this.productService.getAllProducts().pipe(
  map((posts) => {
    return allProductsSuccess({ products });
  })
  );
}
return of(dummyAction());
})
);
});

addProduct$ = createEffect(() => {
 return this.actions$.pipe
 (ofType(addProductStart),
 mergeMap((action) => {
   return this.productService.addProductForm(action.newProduct).pipe(map((data) => {
    const product = {...action.newProduct,id: data.name};
    return addProductSuccess({ product });
   })
   );
 })
 );
});

// updateProduct$ = createEffect(() => {
//   return this.actions$.pipe
//   (ofType(updateProductStart),
//   switchMap((action) => {
//     return this.productService.updateProduct(action.product).pipe(map((data) => {
//       const updatedProduct: Update<Product> = {
//         id: action.product.id,
//         changes: {
//           ...action.product
//         }
//       }
//      return updateProductSuccess({ updatedProduct: updatedProcuct  , message : "Updated product!"});
//     })
//     );
//   })
//   );
//  });

//  updatePostRedirect$ = createEffect(() => {
//   return this.actions$.pipe(
//     ofType(...[updatePostSuccess,updatePost]),
//     tap((action) => {
//     //  this.store.dispatch(setErrorMessage({ message: '' }));
//       this.router.navigate(['/posts']);
//     })
//     );
// },
// { dispatch: false });


 getsinglePost$ = createEffect(() => {
   return this.actions$.pipe(ofType(ROUTER_NAVIGATION),
   filter((r: RouterNavigatedAction) => {
    return r.payload.routerState.url.startsWith('/product/details');
   }), map((r : RouterNavigatedAction) => {
     return r.payload.routerState['params']['id'];
   }),
   withLatestFrom(this.store.select(getProducts)),
   switchMap(([id, products]) => {
     if(!products.length){
     return this.productService.getProductById(id).pipe(
       map((product) => {
       const productData = [{...product,id}];
       return allProductsSuccess({ products : productData});
     })
     );
    }
    return of(dummyAction());
   })
   );
 });
}
