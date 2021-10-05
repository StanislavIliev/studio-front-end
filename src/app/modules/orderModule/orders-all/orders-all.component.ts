import { Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order';
import { OrderService } from '../../../services/orderService';
import { User } from '../../../models/user';
import { AppState } from 'src/app/store/app.state';
import { Store ,ActionsSubject } from '@ngrx/store';
import { allOrdersStart, ALL_ORDERS_SUCCESS } from '../state/order.actions';
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
     private orderService: OrderService,
     private store: Store<AppState>,
     private actionListener: ActionsSubject,
     ){
   this.store.dispatch(allOrdersStart());
 }

 ngOnInit(): void {
   this.actionListener.pipe(ofType(ALL_ORDERS_SUCCESS)).subscribe((data:any)=>{
     console.log(data);
     this.orders= data;
   });
    this.getCurrentOrders();
 }

  getCurrentOrders(){
     const ordersDataString = localStorage.getItem('order'); 
     this.orders = JSON.parse(ordersDataString);
     console.log(this.orders);
     return this.orders;
   }
}
