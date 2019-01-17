import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Product } from '../../product';
import * as fromProduct from '../../state';
import * as productActions from '../../state/product.actions';

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;

  componentActive = true;

  constructor(private store: Store<fromProduct.State>) { }

  ngOnInit() {
    // dispatch the action so that the effect fetches the products from the server
    this.store.dispatch(new productActions.Load());

    // subscribe to the various pieces of state:
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));
    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
  }

  onDisplayCodeToggle(showCodes: boolean) {
    this.store.dispatch(new productActions.ToggleProductCode(showCodes));
  }

  onNewProductClick() {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  onProductSelectionChange(product: Product) {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

  onProductSaved(product: Product) {
    if (product.id === 0) {
      this.store.dispatch(new productActions.CreateProduct(product));
    } else {
      this.store.dispatch(new productActions.UpdateProduct(product));
    }
  }

  onProductDeleted(productId: number) {
    this.store.dispatch(new productActions.DeleteProduct(productId));
  }

  onCurrentProductCleared() {
    this.store.dispatch(new productActions.ClearCurrentProduct());
  }

}
