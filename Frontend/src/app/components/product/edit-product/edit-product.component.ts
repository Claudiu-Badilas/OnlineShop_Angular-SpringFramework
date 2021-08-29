import { Product } from './../../../models/product';
import { ProductTypeAction } from './../utils/product-type-action.util';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/app.state';
import * as ProductActions from '../product-state/product.actions';
import * as fromProduct from './../product-state/product.reducer';
import * as fromCategories from '../category-state/category.reducer';
import * as CategoriesActions from '../category-state/category.actions';

import { Category } from 'src/app/models/category';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/shared/enum/notification-type.enum';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  productForm: FormGroup;
  categories$: Observable<Category[]>;
  product$: Observable<Product>;
  errorMessage$: Observable<string>;

  product: Product;
  typeAction: string;
  selectedCategory: Category;
  edited: boolean = false;
  selectedFile: any = '/assets/images/no-image.png';
  isEditMode: boolean;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(CategoriesActions.loadCategories());
    this.categories$ = this.store.select(fromCategories.getAllCategories);

    this.product$ = this.store.select(fromProduct.getCurrentProduct);
    this.product$.subscribe((product) => {
      this.product = product;
    });

    this.store.select(fromProduct.getTypeAction).subscribe((typeAction) => {
      this.typeAction = typeAction;
    });

    this.isEditMode = this.typeAction === ProductTypeAction.UPDATE;

    if (this.isEditMode) {
      this.selectedFile = this.product.image;
      this.selectedCategory = this.product.category;
    }

    this.productForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
      price: [null, priceRangeValidator],
      image: [null, imageValidator],
      category: [null, Validators.required],
    });
  }

  editProduct(originalProduct: Product) {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        if (this.typeAction === ProductTypeAction.UPDATE) {
          const payload = this.productForm.value;
          payload.id = this.product.id;
          payload.image = this.selectedFile;
          payload.category = this.selectedCategory;

          console.log(this.productForm.value);

          const product = { ...originalProduct, ...this.productForm.value };

          this.store.dispatch(ProductActions.editProduct({ product }));
        } else if (this.typeAction === ProductTypeAction.SAVE) {
          const payload: Product = originalProduct;
          payload.image = this.selectedFile;
          payload.category = this.selectedCategory;
          console.log(originalProduct);

          this.store.dispatch(
            ProductActions.saveProduct({ product: originalProduct })
          );
        }
        this._notificationService.notify(
          NotificationType.WARNING,
          ' Your product form is not completed!'
        );
      }
      this._notificationService.notify(
        NotificationType.WARNING,
        ' Your product form is not completed!'
      );
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedFile = reader.result;
    };
  }

  blur(): void {}

  handleCategory(event: any) {
    const categoryName = event.target.value;
    this.categories$.subscribe((categories) => {
      this.selectedCategory = categories.find(
        (category) => category.name === categoryName
      );
    });
  }

  addSelect() {
    this.edited = true;
  }
}

function priceRangeValidator(
  p: AbstractControl
): { [key: string]: boolean } | null {
  if (p.value !== null && (isNaN(p.value) || p.value < 0)) {
    return { range: true };
  }

  return null;
}

function imageValidator(): { [key: string]: boolean } | null {
  if (this.selectedFile !== '/assets/images/no-image.png') {
    return { image: true };
  }

  return null;
}
