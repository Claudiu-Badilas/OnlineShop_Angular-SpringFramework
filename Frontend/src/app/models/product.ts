import { Category } from './category';

export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;

  constructor(res: Product) {
    this.id = res.id;
    this.name = res.name;
    this.description = res.description;
    this.price = res.price;
    this.image = res.image;
    this.category = res.category;
  }
}
