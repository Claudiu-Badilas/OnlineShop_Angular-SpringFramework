import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Category } from '../../../models/category';
import { Product } from 'src/app/models/product';

import { AppState } from 'src/app/store/app.state';
import * as fromPlatform from '../../../platform-state/platform.reducer';
import * as PlatformActions from '../../../platform-state/platform.actions';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  selectedCategory: any;
  edited: boolean = false;
  selectedFile: any = '/assets/images/no-image.png';
  categories$: Observable<Category[]>;
  errorMessage$: Observable<string>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(PlatformActions.loadCategories());
    this.categories$ = this.store.select(fromPlatform.getAllCategories);

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
      price: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  saveProduct(product: Product) {
    const payload: Product = product;
    payload.image = this.selectedFile;
    payload.category = this.selectedCategory;
    console.log(product);

    this.store.dispatch(PlatformActions.saveProduct({ product }));
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedFile = reader.result;
    };
  }

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
