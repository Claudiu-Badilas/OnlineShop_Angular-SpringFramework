import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Role } from 'src/app/shared/enum/role.enum';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() products: Product[];
  @Input() isUserAdmin: boolean;
  @Output() viewDetailsClicked = new EventEmitter<Product>();
  @Output() addToCartClicked = new EventEmitter<Product>();
  @Output() editClicked = new EventEmitter<Product>();
  @Output() deleteClicked = new EventEmitter<Product>();

  constructor() {}

  ADMIN = Role.ADMIN;
  page = 1;
  pageSize = 9;

  onViewDetails(product: Product) {
    this.viewDetailsClicked.emit(product);
  }
  onAddToCart(product: Product) {
    this.addToCartClicked.emit(product);
  }
  onEdit(ev, product: Product) {
    this.editClicked.emit(product);
  }
  onDelete(ev, product: Product) {
    this.deleteClicked.emit(product);
  }
}
