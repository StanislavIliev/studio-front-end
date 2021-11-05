import { createReducer, on } from "@ngrx/store";
import { deleteProcedureSuccess, allProceduresSuccess, addProcedureSuccess, updateProcedureSuccess } from "./procedure.actions";
import { initialState } from "./procedure.state";


const _procedureReducer = createReducer(
  initialState,
  on(allProceduresSuccess, (state, action) => {
  return {
    ...state,
    procedures: action.procedures,
};
}),
on(deleteProcedureSuccess, (state, action) => {
  const updatedProcedures = state.procedures.filter((procedure) =>{
      return procedure.id !== action.id;
  });
return {
  ...state,
  procedures: updatedProcedures,
};
})
);

export function procedureReducer(state, action) {
  return _procedureReducer(state, action);

}
