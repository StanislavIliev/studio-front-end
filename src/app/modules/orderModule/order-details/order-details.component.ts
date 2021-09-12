import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../../models/order';
import { OrderService } from '../../../services/orderService';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  @Input()
  order: Order;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
