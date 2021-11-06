import { createReducer , on } from "@ngrx/store";
import { userUpdateSuccess } from "./user.actions";
import { initialState } from "./user.state";

export const USER_STATE_NAME = 'user';

const _userReducer = createReducer(
  initialState,
   on(userUpdateSuccess, (state, action) => {
         const updatedUser = action.updatedUser;
       return {
         ...state,
         user: updatedUser,
     };
     }), 
);

export function userReducer(state, action){
  return _userReducer(state,action);
}
