import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Product } from '../../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  @Input() displayCode: boolean;
  @Input() errorMessage: string;
  @Input() products: Product[];
  @Input() selectedProduct: Product | null;

  @Output() productSelectionChange = new EventEmitter<Product>();
  @Output() displayCodeToggle = new EventEmitter<boolean>();
  @Output() newProductClick = new EventEmitter<void>();

  pageTitle = 'Products';

  checkChanged(value: boolean): void {
    this.displayCodeToggle.emit(value);
  }

  newProduct(): void {
    this.newProductClick.emit();
  }

  onProductSelected(product: Product): void {
    this.productSelectionChange.emit(product);
  }

}
