import { Product } from './../../../models/product';
import { ProductTypeAction } from './../utils/product-type-action.util';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/app.state';
import * as fromPlatform from '../../../store/platform-state/platform.reducer';
import * as PlatformActions from '../../../store/platform-state/platform.actions';

import { Category } from 'src/app/models/category';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/shared/enum/notification-type.enum';
import { ConfirmService } from 'src/app/services/confirm.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  categories$ = this.store.select(fromPlatform.getAllCategories);
  product$ = this.store.select(fromPlatform.getSelectedProduct);

  productForm: FormGroup;
  product: Product;
  typeAction: string;
  selectedCategory: Category;
  edited: boolean = false;
  selectedFile: any = '/assets/images/no-image.png';

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private _notificationService: NotificationService,
    private confirmService: ConfirmService
  ) {}

  ngOnInit(): void {
    this.product$.subscribe((product) => {
      if (!!product) this.product = product;
    });

    this.store.select(fromPlatform.getTypeAction).subscribe((typeAction) => {
      this.typeAction = typeAction;
    });

    if (this.typeAction === ProductTypeAction.EDIT) {
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
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      price: [null, priceRangeValidator(0, 100)],
      image: [null, imageValidator(this.selectedFile)],
      category: [null, Validators.required],
    });
  }

  editProduct(originalProduct: Product) {
    this.confirmService
      .confirm('Confirm save changes', 'This cannot be undone', 'Save')
      .subscribe((result) => {
        if (result) {
          this.updateProduct(originalProduct);
        }
      });
  }

  updateProduct(originalProduct: Product) {
    const payload: Product = originalProduct;
    payload.image = this.selectedFile;
    payload.category = this.selectedCategory;
    console.log(originalProduct);

    this.store.dispatch(
      PlatformActions.saveProduct({ product: originalProduct })
    );
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        if (this.typeAction === ProductTypeAction.EDIT) {
          const payload = this.productForm.value;
          payload.id = this.product.id;
          payload.image = this.selectedFile;
          payload.category = this.selectedCategory;

          console.log(this.productForm.value);

          const product = { ...originalProduct, ...this.productForm.value };

          this.store.dispatch(PlatformActions.editProduct({ product }));
        } else if (this.typeAction === ProductTypeAction.SAVE) {
          const payload: Product = originalProduct;
          payload.image = this.selectedFile;
          payload.category = this.selectedCategory;
          console.log(originalProduct);

          this.store.dispatch(
            PlatformActions.saveProduct({ product: originalProduct })
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
}
function priceRangeValidator(min: number, max: number): ValidatorFn {
  return (p: AbstractControl): { [key: string]: boolean } | null => {
    if (
      p.value !== null &&
      (isNaN(p.value) || p.value < min || p.value > max)
    ) {
      return { range: true };
    }
    return null;
  };
}
function imageValidator(defaultImage: any): ValidatorFn {
  return (i: AbstractControl): { [key: string]: boolean } | null => {
    if (defaultImage === i) {
      return { image: true };
    }
    return null;
  };
}
