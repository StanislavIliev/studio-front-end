import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cartService';
import {HttpClient} from '@angular/common/http';
import { Cart } from '../../../models/cart';
import {Product} from '../../../models/product';
import {User} from '../../../models/user';
import {Procedure} from '../../../models/procedure';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

   user: User = JSON.parse(localStorage.getItem('user'));
   cart: Cart = new Cart();

   constructor(private cartService: CartService,
               private authService: AuthService,
               private http: HttpClient,
               private router: Router) {
     this.getCartByUserId();
  }

  ngOnInit(): void {
    }

  getCartByUserId(): void{
     const userId = this.user.id;
     this.cartService.getCart(userId)
      .subscribe((response) => {
        this.cart = response;
        console.log(this.cart);
      });
  }

  deleteProcedureFromCart(procedure: Procedure): void {
    const procedureAndUserId = {
      userId: this.user.id,
      itemId: procedure.id
    };
    this.cartService.deleteProcedureFromCart(procedureAndUserId)
      .subscribe((resp) => {
        console.log(resp);
      });
    this.router.navigate(['/cart']);
  }

  deleteProductFromCart(product: Product ): void {
    const productAndUserId = {
      userId: this.user.id,
      itemId: product.id
    };
    this.cartService.deleteProductFromCart(productAndUserId)
      .subscribe((resp) => {
        console.log(resp);
      });

    this.router.navigate(['/cart']);
  }

  emptyCart(): void {
    const productAndUserId = {
      userId: this.user.id,
      itemId: null
    };
    this.cartService.deleteProductFromCart(productAndUserId)
      .subscribe((resp) => {
        console.log(resp);
      });
  }

  getSubtotal(): any{
    this.cartService.getSubTotalCart(this.user.id)
      .subscribe((resp) => {
        console.log(resp);
      });
  }
  }
