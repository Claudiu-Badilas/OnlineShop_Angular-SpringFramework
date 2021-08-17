import { Category } from './category';

export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;

  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    image: string,
    category: Category
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.category = category;
  }
}
