import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user";

export const LOGIN_START = '[login page] login start';
export const LOGIN_SUCCESS = '[login page] login success';
export const LOGIN_FAIL = '[login page] login fail';

export const AUTO_LOGIN_START = '[auth page] auto login start';
export const AUTO_LOGIN_SUCCESS = '[auth page] auto login success';
export const AUTO_LOGIN_FAIL = '[auth page] auto login fail';
export const LOGOUT_ACTION = '[auth page] log out';

export const autoLoginStart = createAction(AUTO_LOGIN_START);
export const autoLoginSuccess = createAction(AUTO_LOGIN_SUCCESS);
export const autoLoginFail = createAction(AUTO_LOGIN_FAIL,props<{message: string}>());
export const authLogout = createAction(LOGOUT_ACTION);

export const loginStart = createAction(LOGIN_START,props<{ auth: User }>());
export const loginSuccess = createAction(LOGIN_SUCCESS,props<{ user: User, message: string }>());
export const loginFail = createAction(LOGIN_FAIL,props<{ message: string}>());

export const REGISTER_START = '[auth] register start';
export const REGISTER_SUCCESS = '[auth] register success';
export const REGISTER_FAIL = '[auth] register fail';

export const registerStart = createAction(REGISTER_START, props<{user: User}>());
export const registerSuccess = createAction(REGISTER_SUCCESS, props<{user: User, message: string}>());
export const registerFail = createAction(REGISTER_FAIL, props<{message: string}>());


export const RESPONSE_PASSWORDS_START = '[auth] response password';
export const RESPONSE_PASSWORDS_SUCCESS = '[auth] response success';
export const RESPONSE_PASSWORDS_FAIL = '[auth] response fail';

export const responsePasswordStart = createAction(RESPONSE_PASSWORDS_START, props<{auth: User}>());
export const responsePasswordSuccess = createAction(RESPONSE_PASSWORDS_SUCCESS, props<{auth: User , message: string}>());
export const responsePasswordFail = createAction(RESPONSE_PASSWORDS_FAIL, props<{message: string}>());

export const EMAIL_FORGOTTEN_PASSWORD = '[auth] email forgotten password start';
export const EMAIL_FORGOTTEN_PASSWORD_SUCCESS = '[auth] email forgotten password success';
export const EMAIL_FORGOTTEN_PASSWORD_FAIL = '[auth] email forgotten password fail';

export const requestPaswordStart = createAction(EMAIL_FORGOTTEN_PASSWORD, props<{auth: User}>());
export const requestPaswordSuccess = createAction(EMAIL_FORGOTTEN_PASSWORD_SUCCESS, props<{auth: User ,message: string}>());
export const requestPaswordFail = createAction(EMAIL_FORGOTTEN_PASSWORD_FAIL, props<{message: string}>());

export const GET_ALL_USERS_START = '[user] get all users start';
export const GET_ALL_USERS_SUCCESS = '[user] get all users success';
export const GET_ALL_USERS_FAIL = '[user] get all users fail';

export const getAllUsersStart = createAction(GET_ALL_USERS_START);
export const getAllUsersSuccess = createAction(GET_ALL_USERS_SUCCESS, props<{users: User[] }>());
export const getAllUsersFail = createAction(GET_ALL_USERS_FAIL, props<{message: string}>());
