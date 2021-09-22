import { Component, OnInit } from '@angular/core';
import {Order} from '../../../models/order';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { OrderService } from '../../../services/orderService';
import { User } from '../../../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  addOrderForm: FormGroup;
  order: Order;
  user: User = JSON.parse(localStorage.getItem('user'));

  constructor(
    private orderService: OrderService ,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.addOrderForm = new FormGroup({
      description: new FormControl('' , [Validators.required, Validators.pattern('[A-Za-z0-9 ]+')]),
      procedure: new FormControl(null),
      product: new FormControl(null),
      user: new FormControl(this.user)
    });
  }

  addOrder(): any {
    const newOrder = {...this.addOrderForm.value};
    console.log(newOrder);
    this.orderService.addOrderForm(newOrder)
      .subscribe((response) => {
        this.order = response;
        console.log(this.order);
        this.router.navigate(['/orders-all']);
      });
  }

  getOrderById(orderId: string): void{
    this.orderService.getOrderById(orderId)
      .subscribe((response) => {
        this.order = response;
      });
  }
}
