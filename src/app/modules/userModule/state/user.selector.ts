import { createFeatureSelector, createSelector } from "@ngrx/store";
import { USER_STATE_NAME } from "./user.reducer";
import { UserState } from "./user.state";

const getUserState = createFeatureSelector<UserState>(USER_STATE_NAME);

export const isAuthenticated = createSelector(getUserState , (state) => {
    return state.isLogged;
  });
  
  export const getToken = createSelector(getUserState, (state) => {
    return state.user ? state.user.token : null;
  });