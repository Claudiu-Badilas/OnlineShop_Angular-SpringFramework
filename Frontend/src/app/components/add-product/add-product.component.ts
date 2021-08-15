import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  validMessage: string;
  selectedCategory: Category;
  showMessage: boolean = false;
  category: Category;
  categories: any = [];
  edited: boolean = false;
  selectedFile: any;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(20.0, Validators.required),
      image: new FormControl(null),
      category: new FormControl(null),
    });

    this.route.paramMap.subscribe(() => {
      this.getCategories();
    });
  }

  createProduct() {
    if (this.productForm.valid) {
      this.validMessage = 'Product successfully saved!';
      const id = this.category.id;

      const payload = this.productForm.value;
      payload.image = this.selectedFile;
      payload.category = this.category;
      console.log(this.productForm.value);
      this.productService.createProduct(this.productForm.value).subscribe(
        (data) => {
          this.productForm.reset(data);
          this.showMessage = true;
          setTimeout(() => {
            this.router.navigate([`/products/category/${id}`]);
          }, 2000);
          return true;
        },
        (error) => {
          console.error(error);
        },
        () => console.log(this.validMessage)
      );
    } else {
      this.validMessage = 'Please fill out the form!';
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

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      },
      () => console.log('Categories successfully found!')
    );
  }

  handleCategory(event: any) {
    this.selectedCategory = event.target.value;
    console.log(`category-name: ${this.selectedCategory}`);
    for (let i = 0; i < this.categories.length; i++) {
      if (this.selectedCategory === this.categories[i].name) {
        this.category = new Category(
          this.categories[i].id,
          this.categories[i].name
        );
      }
    }
  }

  addSelect() {
    this.edited = true;
  }
}
