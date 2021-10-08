import { Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order';
import { User } from '../../../models/user';
import { AppState } from 'src/app/store/app.state';
import { Store ,ActionsSubject } from '@ngrx/store';
import { myOrdersStart ,orderDetailsStart , MY_ORDERS_SUCCESS } from '../state/order.actions';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {

  user: User = JSON.parse(localStorage.getItem('user'));
  orders: Order [];
 
  constructor(
      private store: Store<AppState>,
      private actionListener: ActionsSubject,
    ) {
     // const id = this.user.id;
     // this.store.dispatch(myOrdersStart({ id }));

  }

  ngOnInit(): void {
    this.actionListener.pipe(ofType(MY_ORDERS_SUCCESS)).subscribe((data:any)=>{
      console.log(data.orders);
      this.orders= data.orders;
    });
     this.getCurrentOrders();
  }
 
   getCurrentOrders(){
      const ordersDataString = localStorage.getItem('myorders'); 
      this.orders = JSON.parse(ordersDataString);
      console.log(this.orders);
      return this.orders;
    }
 
    orderDetails(id: string){
     this.store.dispatch(orderDetailsStart({ id }));
    }
}
