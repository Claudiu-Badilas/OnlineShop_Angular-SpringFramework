import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @Input() categories: Category[];
  @Input() selectedCategory: Category;
  @Output() emittedCategory = new EventEmitter<Category>();

  constructor() {}

  onCategoryChanged(category: Category) {
    this.emittedCategory.emit(category);
  }
}
