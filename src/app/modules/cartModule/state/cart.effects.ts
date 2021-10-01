import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { CartService } from "src/app/services/cartService";
import { cartLoadStart , cartLoadSuccess, deleteProcedureFromCartStart ,deleteProcedureFromCartSuccess ,
  deleteProductFromCartStart ,deleteProductFromCartSuccess ,emptyCartStart , emptyCartSuccess } from "./cart.actions";
import { map , switchMap ,exhaustMap } from 'rxjs/operators';
import { User } from '../../../models/user';
import { Cart } from '../../../models/cart';
import { ItemDeleteAndUserId } from "src/app/models/itemDeleteAndUserId";

@Injectable()
export class CartEffects{
  constructor(
    private actions$: Actions,
    private cartService : CartService,
    private router: Router
    ){}

       
    loadCart$ = createEffect(() => {
      return this.actions$.pipe
      (ofType(cartLoadStart),
      exhaustMap((action) => {
        return this.cartService.getCart(action.id).pipe(map((data) => {
            console.log(data);
            localStorage.setItem('cart', JSON.stringify(data));            
            return cartLoadSuccess({ cart: data ,message: 'Success' });
        })
        );
      })
      );
     });

     
     deleteProcedureFromCart$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(deleteProcedureFromCartStart),
        switchMap((action) => {
          const user: User = JSON.parse(localStorage.getItem('userData'));
          const userId = user.id;
          const itemId = action.id
          const itemDeleteAndUserId :ItemDeleteAndUserId = { itemId , userId };
          console.log(itemDeleteAndUserId);
          return this.cartService.deleteItemFromCart(itemDeleteAndUserId).pipe(
            map((data) => {
              this.router.navigate(['/cart']);
              return deleteProcedureFromCartSuccess({ id: data ,message: 'Success' });
            })
          );
        })
      );
    });

    deleteProductFromCart$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(deleteProductFromCartStart),
        switchMap((action) => {
          const user: User = JSON.parse(localStorage.getItem('userData'));
          const userId = user.id;
          const itemId = action.id
          const itemDeleteAndUserId : ItemDeleteAndUserId = { itemId , userId };
          console.log(itemDeleteAndUserId);
          return this.cartService.deleteItemFromCart(itemDeleteAndUserId).pipe(
            map((data) => {
              this.router.navigate(['/cart']);
              return deleteProductFromCartSuccess({ id: data ,message: 'Success' });
            })
          );
        })
      );
    });

    emptyCart$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(emptyCartStart),
        switchMap((action) => {
          const user: User = JSON.parse(localStorage.getItem('userData'));
          return this.cartService.emptyCart(user).pipe(
            map((data) => {
              this.router.navigate(['/cart']);
              return emptyCartSuccess({ auth: data ,message: 'Success' });
            })
          );
        })
      );
    });

}
