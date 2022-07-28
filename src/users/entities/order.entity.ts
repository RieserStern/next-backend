import { User } from './user.entity';
import { Product } from '../../products/entities/product.entity';

export class Order {
  user: User;
  date: Date;
  products: Product[];
}
