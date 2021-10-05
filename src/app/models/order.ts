import { User } from './user';
import { Product } from './product';
import { Procedure } from './procedure';

export interface Order {
  id?: string;
  price?: number;
  products?: Product [],
  procedures?: Procedure [],
  user?: User;
}
