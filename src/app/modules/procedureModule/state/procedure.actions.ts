import { createAction, props } from "@ngrx/store";
import { Procedure } from "src/app/models/procedure";
import { ProcedureAndUserId } from '../../../models/procedureAndUserId';

export const ADD_PROCEDURE_START = '[user] add procedure start';
export const ADD_PROCEDURE_SUCCESS = '[user] add procedure success';
export const ADD_PROCEDURE_FAIL = '[user] add procedure fail';

export const addProcedureStart = createAction(ADD_PROCEDURE_START, props<{newProcedure: Procedure}>());
export const addProcedureSuccess = createAction(ADD_PROCEDURE_SUCCESS, props<{ procedure : Procedure}>());
export const addProcedureFail = createAction(ADD_PROCEDURE_FAIL, props<{message: string}>());

export const ALL_PROCEDURES_START = '[user] all procedures start';
export const ALL_PROCEDURES_SUCCESS = '[user] all procedures success';
export const ALL_PROCEDURES_FAIL = '[user] all procedures fail';

export const allProceduresStart = createAction(ALL_PROCEDURES_START);
export const allProceduresSuccess = createAction(ALL_PROCEDURES_SUCCESS, props<{ procedures : Procedure[]}>());
export const allProceduresFail = createAction(ALL_PROCEDURES_FAIL, props<{message: string}>());

export const UPDATE_PROCEDURE_START = '[user] update procedure start';
export const UPDATE_PROCEDURE_SUCCESS = '[user] update procedure success';
export const UPDATE_PROCEDURE_FAIL = '[user] update procedure fail';

export const updateProcedureStart = createAction(UPDATE_PROCEDURE_START, props<{procedure: Procedure}>());
export const updateProcedureSuccess = createAction(UPDATE_PROCEDURE_SUCCESS, props<{procedure: Procedure }>());
export const updateProcedureFail = createAction(UPDATE_PROCEDURE_FAIL, props<{message: string}>());


export const ADD_TO_CART_PROCEDURE_START = '[user] add to cart procedure start';
export const ADD_TO_CART_PROCEDURE_SUCCESS = '[user] add to cart procedure success';
export const ADD_TO_CART_PROCEDURE_FAIL = '[user] add to cart procedure fail';

export const addProcedureToCartStart = createAction(ADD_TO_CART_PROCEDURE_START, props<{ procedureAndUserId: ProcedureAndUserId }>());
export const addProcedureToCartSuccess = createAction(ADD_TO_CART_PROCEDURE_SUCCESS, props<{ procedure: ProcedureAndUserId , message: string}>());
export const addProcedureToCartFail = createAction(ADD_TO_CART_PROCEDURE_FAIL, props<{message: string}>());

export const DELETE_PROCEDURE_START = '[user] delete procedure start';
export const DELETE_PROCEDURE_SUCCESS = '[user] delete procedure success';
export const DELETE_PROCEDURE_FAIL = '[user] delete procedure fail';

export const deleteProcedureStart = createAction(DELETE_PROCEDURE_START, props<{ id: string}>());
export const deleteProcedureSuccess = createAction(DELETE_PROCEDURE_SUCCESS, props<{ id: string}>());
export const deleteProcedureFail = createAction(DELETE_PROCEDURE_FAIL, props<{message: string}>());

export const dummyAction = createAction('[dummy action]');
