import * as moment from 'moment';
import { Product } from './product';
import { User } from './user';

export class Order {
  id: number;
  date: moment.Moment;
  totalPrice: number;
  status: string;
  user: User;
  products: Product[];

  constructor(res: Order) {
    this.id = res.id;
    this.date = moment.utc(res.date);
    this.totalPrice = res.totalPrice;
    this.status = res.status;
    this.user = res.user;
    this.products = res.products;
  }
}
