import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ProductService } from '../../../services/product.service';
import { Category } from '../../../models/category';
import { Product } from 'src/app/models/product';

import { AppState } from 'src/app/store/app.state';
import * as ProductActions from '../product-state/product.actions';
import * as fromCategories from '../category-state/category.reducer';
import * as CategoriesActions from '../category-state/category.actions';

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
    this.store.dispatch(CategoriesActions.loadCategories());
    this.categories$ = this.store.select(fromCategories.getAllCategories);

    this.errorMessage$ = this.store.select(fromCategories.getError);

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

    this.store.dispatch(ProductActions.saveProduct({ product }));
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
