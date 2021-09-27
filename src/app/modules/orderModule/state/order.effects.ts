import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, exhaustMap, switchMap} from "rxjs/operators";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { OrderService } from "src/app/services/orderService";
import { updateOrderSuccess , updateOrderStart } from "./order.actions";
import { Order } from "src/app/models/order";


@Injectable()
export class OrderEffects{
  constructor(
    private actions$: Actions,
    private orderService : OrderService,
    private store: Store<AppState>,
    private router: Router
    ){}

updateOrder$ = createEffect(() => {
 return this.actions$.pipe
 (ofType(updateOrderStart),
 exhaustMap((action) => {
   return this.orderService.addOrderForm(action.order).pipe(map((data) => {
    const order = {...action.order,id: data.id};
    this.router.navigate(['/']); 
    return updateOrderSuccess({ order : order, message: 'Success' });
   })
   );
 })
 );
});

}




