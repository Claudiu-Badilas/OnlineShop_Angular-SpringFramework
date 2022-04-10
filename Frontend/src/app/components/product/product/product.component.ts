import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ConfirmService } from 'src/app/services/confirm.service';
import { Role } from 'src/app/shared/enum/role.enum';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() products: Product[];
  @Input() isAdminUser: boolean;
  @Output() viewDetailsClicked = new EventEmitter<Product>();
  @Output() addToCartClicked = new EventEmitter<Product>();
  @Output() editClicked = new EventEmitter<Product>();
  @Output() deleteClicked = new EventEmitter<Product>();

  constructor(private confirmService: ConfirmService) {}

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
    this.confirmService
      .confirm('Confirm delete product', 'This cannot be undone')
      .subscribe((result) => {
        if (result) {
          this.deleteClicked.emit(product);
        }
      });
  }
}
