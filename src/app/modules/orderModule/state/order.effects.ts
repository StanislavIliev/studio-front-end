import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, exhaustMap , switchMap } from "rxjs/operators";
import { Router } from "@angular/router";
import { OrderService } from "src/app/services/orderService";
import { updateOrderSuccess ,allOrdersStart, allOrdersSuccess,deleteOrderStart , deleteOrderSuccess , 
  orderDetailsStart, orderDetailsSuccess, updateOrderStart ,myOrdersStart,myOrdersSuccess} from "./order.actions";


@Injectable()
export class OrderEffects{
  constructor(
    private actions$: Actions,
    private orderService : OrderService,
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

detailsOrder$ = createEffect(() => {
  return this.actions$.pipe
  (ofType(orderDetailsStart),
  exhaustMap((action) => {
    return this.orderService.getOrderById(action.id).pipe(map((data) => {
      this.router.navigate(['/order-details']);
      console.log(data);
      localStorage.setItem('order', JSON.stringify(data));            
     return orderDetailsSuccess({ order: data , message : 'success' });
    })
    );
  })
  );
 });
 
allOrders$ = createEffect(() => {
  return this.actions$.pipe
  (ofType(allOrdersStart),
  exhaustMap((action) => {
    return this.orderService.getAllOrders().pipe(map((data) => {
        console.log(data);
        localStorage.setItem('orders', JSON.stringify(data)); 
        return allOrdersSuccess({ orders : data ,message: 'Success' });
    })
    );
  })
  );
 });  

 myOrders$ = createEffect(() => {
  return this.actions$.pipe
  (ofType(myOrdersStart),
  exhaustMap((action) => {
    return this.orderService.getMyOrders(action.id).pipe(map((data) => {
        console.log(data);
        localStorage.setItem('myorders', JSON.stringify(data)); 
        return myOrdersSuccess({ orders : data , message: 'Success' });
    })
    );
  })
  );
 });

 deleteOrder$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(deleteOrderStart),
    switchMap((action) => {
      return this.orderService.deleteOrderById(action.id).pipe(
        map((data) => {
          this.router.navigate(['/']);
          return deleteOrderSuccess({ id: action.id ,message: 'Success' });
        })
      );
    })
  );
});

}




