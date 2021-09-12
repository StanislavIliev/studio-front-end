import { User } from "src/app/models/user";

export interface AuthState {
 user: User | null;
 isLogged: boolean;
}
export const initialState: AuthState= {
  user: null,
  isLogged: false,
};
