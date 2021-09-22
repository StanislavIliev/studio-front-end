import {User} from './user';

export interface Order {
  id?: string;
  description?: string;
  price?: number;
  procedure?: string;
  product?: string;
  username?: User;

}
