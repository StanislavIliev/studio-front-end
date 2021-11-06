import { User } from "src/app/models/user";

export interface UserState {
 user: User | null;
}

export const initialState: UserState= {
  user: null
};
