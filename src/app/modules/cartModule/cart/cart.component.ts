import { Component, OnInit} from '@angular/core';
import { CartService } from '../../../services/cartService';
import { Cart } from '../../../models/cart';
import { Product } from '../../../models/product';
import { User } from '../../../models/user';
import { Procedure } from '../../../models/procedure';
import { Store ,ActionsSubject } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { cartLoadStart,CART_LOAD_SUCCESS,cartPlaceOrderStart,
   deleteProcedureFromCartStart,emptyCartStart,  deleteProductFromCartStart } from '../state/cart.actions';
import { ofType } from '@ngrx/effects';

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
      private actionListener: ActionsSubject,
      ){
        
    const id = this.user.id;
    this.store.dispatch(cartLoadStart({ id }));
  }

  ngOnInit(): void {
    this.actionListener.pipe(ofType(CART_LOAD_SUCCESS)).subscribe((data:any)=>{
      console.log(data.cart);
      this.cart= data.cart;
    });
     this.getCurrentCart();
     this.getSubtotal();
  }

 getCurrentCart(){
      const cartDataString = localStorage.getItem('cart'); 
      this.cart = JSON.parse(cartDataString);
      console.log(this.cart);
      return this.cart;
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
       var total = 0;
       this.cart.products.forEach(element => {
         total += element.price;
       });
       this.cart.procedures.forEach(element => {
        total += element.price;
      });
     console.log(total);
    return total;
  }

  placeOrder(): void {
    const cart= this.cart;
    this.store.dispatch(cartPlaceOrderStart({ cart }));
 }

}
