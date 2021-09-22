import {Product} from './product';
import {Procedure} from './procedure';

export interface Cart {
  id?: string;
  procedures?: Procedure [];
  products?: Product [];

  
}
