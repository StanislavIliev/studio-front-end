import { createReducer , on } from "@ngrx/store";
import { autoLogout, loginFail, loginStart, loginSuccess, registerSuccess } from "./auth.actions";
import { initialState } from "./auth.state";

export const AUTH_STATE_NAME = 'auth';

const _authReducer = createReducer(
  initialState,
  on(loginStart, (state, action) => {
    return {
      ...state,
      isLogged: false,
  };
  }), 
  on(loginSuccess, (state, action) => {
  return {
    ...state,
    isLogged: true,
};
}),
on(loginFail, (state, action) => {
  return {
    ...state,
    isLogged: false,
};
}),
on(registerSuccess, (state, action) => {
  return {
    ...state,
    user: action.user,
  };
}),
);

export function authReducer(state, action){
  return _authReducer(state,action);
}
