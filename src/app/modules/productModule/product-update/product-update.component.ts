import { Component, OnInit , OnDestroy} from '@angular/core';
import { FormControl, FormGroup , Validators } from '@angular/forms';
import { Product } from '../../../models/product';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { updateProductStart } from "../state/product.actions";
import { Subscription } from 'rxjs';
import { getProductById } from '../state/product.selector';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit , OnDestroy {
 
  updateProductForm: FormGroup;
  product: Product;
  productSubscription: Subscription;

  constructor(
    private r: ActivatedRoute,
    private store: Store<AppState>
  ) {
    
  }


  ngOnInit(): void {
    this.r.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.productSubscription = this.store
        .select(getProductById, { id })
        .subscribe((data) => {
          this.product = data;
          this.parseProductInfo();
        });
    });
  }

  parseProductInfo(): any{
    this.updateProductForm = new FormGroup({
      id: new FormControl(this.product.id),
      description: new FormControl(this.product.description, [Validators.required, Validators.pattern('[A-Za-z0-9 ]+')]),
      price: new FormControl(this.product.price, [Validators.required, Validators.pattern('[0-9]+')]),
      name: new FormControl(this.product.name, [Validators.required, Validators.pattern('[A-Za-z0-9 ]+')])
    });

  }

  updateProduct(): any {
    if (!this.updateProductForm.valid) {
      return;
    }
    const description = this.updateProductForm.value.description;
    const price = this.updateProductForm.value.price;
    const name = this.updateProductForm.value.name;
    const product: Product = {
      id: this.product.id,
      description,
      price,
      name
    };
    this.store.dispatch(updateProductStart({ product }));
}

  ngOnDestroy() {
  if (this.productSubscription) {
    this.productSubscription.unsubscribe();
  }
}
}