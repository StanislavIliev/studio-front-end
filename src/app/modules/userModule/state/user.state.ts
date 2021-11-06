import { User } from "src/app/models/user";

export interface UserState {
 user: User | null;
 isLogged: boolean;
}
export const initialState: UserState= {
  user: null,
  isLogged: false,
};
