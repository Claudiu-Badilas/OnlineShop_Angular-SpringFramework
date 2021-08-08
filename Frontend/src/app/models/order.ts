import {Product} from "./product";
import { User } from "./user";

export class Order {
  id: number;
  date: string;
  totalPrice: number;
  status: string;
  user: User;
  products: Product[];

}
