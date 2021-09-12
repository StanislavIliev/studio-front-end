import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Order} from '../../../models/order';
import {User} from '../../../models/user';
import {OrderService} from '../../../services/orderService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.scss']
})
export class OrderUpdateComponent implements OnInit {

  updateOrderForm: FormGroup;
  order: Order = new Order();
  user: User = JSON.parse(localStorage.getItem('user'));

  constructor(
    private orderService: OrderService ,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.updateOrderForm = new FormGroup({
      description: new FormControl(null),
      procedure: new FormControl(null),
      product: new FormControl(null),
      user: new FormControl(this.user)
    });
  }

  updateOrder(): any {
    const updatedOrder = {...this.updateOrderForm.value};
    console.log(updatedOrder);
    this.orderService.updateOrderForm(updatedOrder)
      .subscribe((response) => {
        this.order = response;
        console.log(this.order);
        this.router.navigate(['/']);
      });
  }


}
