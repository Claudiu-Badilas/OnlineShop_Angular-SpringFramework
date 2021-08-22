import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  productForm: FormGroup;
  validMessage: string = '';
  imageSrc: string;
  id: number;
  product: any;
  showMessage: boolean = false;
  selectedFile: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.product = null;
    this.id = this.route.snapshot.params['id'];

    this.productService.getProductById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.product = data;
      },
      (error) => console.log(error)
    );

    this.productForm = new FormGroup({
      id: new FormControl(this.product.id),
      name: new FormControl(null),
      description: new FormControl(null),
      price: new FormControl(null),
      image: new FormControl(null),
      category: new FormControl(this.product.category),
    });
  }

  editProduct(id: number) {
    this.showMessage = true;
    if (this.productForm.valid) {
      this.validMessage = 'Product successfully updated!';
      const payload = this.productForm.value;
      payload.image = this.selectedFile;
      // payload.categoryType = this.categoryType;
      console.log(this.productForm.value);
      this.productService.updateProduct(id, this.productForm.value).subscribe(
        (data) => {
          this.productForm.reset(data);
          return true;
        },
        (error) => {
          console.error(error);
        },
        () => console.log('Products successfully found!')
      );
    } else {
      this.validMessage = 'Please fill out the form!';
    }

    // this.productService.updateProduct(this.id, this.product).subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.product = new Product();
    //   },
    //   (error) => console.log(error)
    // );
    // setTimeout(() => {
    //   this.router.navigate(['/products/category/', id]);
    // }, 2000)
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedFile = reader.result;
    };
  }
}
