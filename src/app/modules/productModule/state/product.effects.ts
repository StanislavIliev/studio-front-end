import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, exhaustMap, switchMap} from "rxjs/operators";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { EMPTY } from "rxjs";
import { ProductService } from "src/app/services/productService";
import { addProductStart, addProductSuccess,allProductsStart, allProductsSuccess, deleteProductStart, deleteProductSuccess
   , updateProductStart, updateProductSuccess , dummyAction } from "./product.actions";
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
      this.router.navigate(['/product-all']);
     return updateProductSuccess({ product: action.product });
    })
    );
  })
  );
 });

 deleteProduct$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(deleteProductStart),
    switchMap((action) => {
      return this.productService.deleteProductById(action.id).pipe(
        map((data) => {
          this.router.navigate(['/product-all']);
          return deleteProductSuccess({ id: action.id });
        })
      );
    })
  );
});


}
