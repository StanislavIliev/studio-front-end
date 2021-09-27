import { Component, OnInit} from '@angular/core';
import { CartService } from '../../../services/cartService';
import { Cart } from '../../../models/cart';
import { Product } from '../../../models/product';
import { User } from '../../../models/user';
import { Procedure } from '../../../models/procedure';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { cartLoadStart, deleteProcedureFromCartStart,emptyCartStart,  deleteProductFromCartStart } from '../state/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

   user: User = JSON.parse(localStorage.getItem('userData'));
   cart: Cart;

   constructor(
      private cartService: CartService,
      private store: Store<AppState>,
      ){
      this.getCartByUserId();
      this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  ngOnInit(): void {
    }

  getCartByUserId(): void{
    const id = this.user.id;
      this.store.dispatch(cartLoadStart({ id }));
      
    }

  deleteProcedureFromCart(procedure: Procedure): void {
    const id = procedure.id;
    this.store.dispatch(deleteProcedureFromCartStart({ id }));
  }

  deleteProductFromCart(product: Product): void {
  const id = product.id;
  this.store.dispatch(deleteProductFromCartStart({ id }));
}

  emptyCart(): void {
     const auth =this.user;
    this.store.dispatch(emptyCartStart({ auth }));
  }

  getSubtotal(): any{
    this.cartService.getSubTotalCart(this.user.id)
      .subscribe((resp) => {
        console.log(resp);
      });
  }
  }
