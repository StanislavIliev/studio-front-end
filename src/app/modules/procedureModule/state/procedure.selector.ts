import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProcedureState } from "./procedure.state";

export const PROCEDURE_STATE_NAME = 'procedures';

const getProcedureState = createFeatureSelector<ProcedureState>(PROCEDURE_STATE_NAME);

export const getProcedureById = createSelector(getProcedureState, (state, props) => {
    return state.procedures.find((procedure) => procedure.id === props.id);
  });