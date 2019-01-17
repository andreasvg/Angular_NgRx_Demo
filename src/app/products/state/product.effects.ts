import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { ProductService } from '../product.service';
import * as productActions from './product.actions';
import { Product } from '../product';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions,
              private productService: ProductService) {}

  @Effect()
  loadProducts$: Observable<Action> = this.actions$.pipe( // listen to all actions
    ofType(productActions.ProductActionTypes.Load), // but only take note of ProductActionTypes.Load actions
    mergeMap((action: productActions.Load) => this.productService.getProducts().pipe( // call the service to retrieve products
      map((products: Product[]) => (new productActions.LoadSuccess(products))),  // when we get the data, produce a new LoadSuccess action
      catchError(err => of(new productActions.LoadFail(err)))
    ))
  );

/*   @Effect()
  updateProduct$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.UpdateProduct),
    mergeMap((action: productActions.UpdateProduct) => this.productService.updateProduct(action.payload).pipe(
      map((product: Product) => (new productActions.UpdateProductSuccess(product))),
      catchError(err => of(new productActions.UpdateProductFail(err)))
    ))
  ); */

  @Effect()
  updateProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.UpdateProduct),
    map((action: productActions.UpdateProduct) => action.payload),
    mergeMap((product: Product) =>
      this.productService.updateProduct(product).pipe(
      map((updatedProduct: Product) => (new productActions.UpdateProductSuccess(updatedProduct))),
      catchError(err => of(new productActions.UpdateProductFail(err)))
    ))
  );

  @Effect()
  createProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.CreateProduct),
    map((action: productActions.CreateProduct) => action.payload),
    mergeMap((product: Product) =>
      this.productService.createProduct(product).pipe(
      map((createdProduct: Product) => (new productActions.CreateProductSuccess(createdProduct))),
      catchError(err => of(new productActions.CreateProductFail(err)))
    ))
  );

  @Effect()
  deleteProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.DeleteProduct),
    map((action: productActions.DeleteProduct) => action.payload),
    mergeMap((productId: number) =>
      this.productService.deleteProduct(productId).pipe(
      map(() => (new productActions.DeleteProductSuccess(productId))),
      catchError(err => of(new productActions.DeleteProductFail(err)))
    ))
  );
}
