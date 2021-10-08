import { Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { deleteOrderStart } from '../state/order.actions';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  
  order: Order = JSON.parse(localStorage.getItem('order'));

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  
  deleteOrder(id: string) {
    if (confirm('Are you sure you want to delete')) {
      this.store.dispatch(deleteOrderStart({ id }));
    }
  }

}
