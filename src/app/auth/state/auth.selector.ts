import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AUTH_STATE_NAME } from "./auth.reducer";
import { AuthState } from "./auth.state";

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState , (state) => {
  return state.user ? true : false;
});

export const getToken = createSelector(getAuthState, (state) => {
  return state.user ? state.user.token : null;
});