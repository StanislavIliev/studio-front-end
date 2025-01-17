import { Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order';
import { User } from '../../../models/user';
import { AppState } from 'src/app/store/app.state';
import { Store ,ActionsSubject } from '@ngrx/store';
import { allOrdersStart,orderDetailsStart , ALL_ORDERS_SUCCESS } from '../state/order.actions';
import { ofType } from '@ngrx/effects';
 
@Component({
  selector: 'app-orders-all',
  templateUrl: './orders-all.component.html',
  styleUrls: ['./orders-all.component.scss']
})
export class OrdersAllComponent implements OnInit {
 
  user: User = JSON.parse(localStorage.getItem('userData'));
  orders: Order [];
  
  constructor(
     private store: Store<AppState>,
     private actionListener: ActionsSubject,
     ){
   this.store.dispatch(allOrdersStart());
 }

 ngOnInit(): void {
   this.actionListener.pipe(ofType(ALL_ORDERS_SUCCESS)).subscribe((data:any)=>{
     this.orders= data.orders;
   });
    this.getCurrentOrders();
 }

  getCurrentOrders(){
     const ordersDataString = localStorage.getItem('orders'); 
     this.orders = JSON.parse(ordersDataString);
     return this.orders;
   }

   orderDetails(id: string){
    this.store.dispatch(orderDetailsStart({ id }));
   }
}
