import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, exhaustMap, switchMap} from "rxjs/operators";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { EMPTY } from "rxjs";
import { ProductService } from "src/app/services/productService";
import { addProductStart, addProductSuccess,allProductsStart, allProductsSuccess, dummyAction, updateProductStart, updateProductSuccess } from "./product.actions";
import { Product } from "src/app/models/product";


@Injectable()
export class ProductEffects{
  constructor(
    private actions$: Actions,
    private productService : ProductService,
    private store: Store<AppState>,
    private router: Router
    ){}


allProducts$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(allProductsStart),
    exhaustMap(() => {
      return this.productService.getAllProducts().pipe(
        map((response: Product[]) => {
          let allproducts: Product[] = [];
          allproducts = Object.keys(response)
            .map(key => {
              let newProduct = response[key];
              newProduct["productId"] = key;
              return response[key];
            })
          return allProductsSuccess({
            products: allproducts
          });
        })
      );
    }),
    catchError(() => {
      return EMPTY;
    })
  );
});


addProduct$ = createEffect(() => {
 return this.actions$.pipe
 (ofType(addProductStart),
 exhaustMap((action) => {
   return this.productService.addProductForm(action.newProduct).pipe(map((data) => {
    const product = {...action.newProduct,id: data.name};
    this.router.navigate(['/product-all']); 
    return addProductSuccess({ product });
   })
   );
 })
 );
});

updateProduct$ = createEffect(() => {
  return this.actions$.pipe
  (ofType(updateProductStart),
  switchMap((action) => {
    return this.productService.updateProduct(action.product).pipe(map((data) => {
     return updateProductSuccess({ product: action.product });
    })
    );
  })
  );
 });

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

//
//  getsinglePost$ = createEffect(() => {
//    return this.actions$.pipe(ofType(ROUTER_NAVIGATION),
//    filter((r: RouterNavigatedAction) => {
//     return r.payload.routerState.url.startsWith('/product/details');
//    }), map((r : RouterNavigatedAction) => {
//      return r.payload.routerState['params']['id'];
//    }),
//    withLatestFrom(this.store.select(getProducts)),
//    switchMap(([id, products]) => {
//      if(!products.length){
//      return this.productService.getProductById(id).pipe(
//        map((product) => {
//        const productData = [{...product,id}];
//        return allProductsSuccess({ products : productData});
//      })
//      );
//     }
//     return of(dummyAction());
//    })
//    );
//  });
}
