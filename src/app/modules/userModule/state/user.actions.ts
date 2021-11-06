import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user";


export const USER_UPDATE_START = '[user] update user start';
export const USER_UPDATE_SUCCESS = '[user] update user success';
export const USER_UPDATE_FAIL = '[user] update user fail';

export const userUpdateStart = createAction(USER_UPDATE_START , props<{ updatedUser : User }>());
export const userUpdateSuccess = createAction(USER_UPDATE_SUCCESS , props<{ message:string , updatedUser : User }>());;
export const userUpdateFail = createAction(USER_UPDATE_FAIL , props<{ message : string }>());;
