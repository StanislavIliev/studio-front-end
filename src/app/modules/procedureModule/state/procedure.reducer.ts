import { createReducer, on } from "@ngrx/store";
import { deleteProcedureSuccess, allProceduresSuccess, addProcedureSuccess, updateProcedureSuccess } from "./procedure.actions";
import { initialState } from "./procedure.state";


const _procedureReducer = createReducer(
  initialState,
//   on(addProcedureSuccess, (state, action ) => {
//     let procedure = { ...action.procedure };
//   return {
//     ...state,
//     procedures: [
//       ...state.procedures,
//     procedure
//   ],
// };
// }), 
// on(updateProcedureSuccess, (state, action) => {
//       const updatedProcedures = state.procedures.map((procedure)=>{
//         return action.procedure.id === procedure.id ? action.procedure : procedure;
//       });
//     return {
//       ...state,
//       procedures: updatedProcedures,
//   };
//   }), 
  on(allProceduresSuccess, (state, action) => {
  return {
    ...state,
    procedures: action.procedures,
};
}),
on(deleteProcedureSuccess, (state, { id }) => {
  const updatedProcedures = state.procedures.filter((procedure) =>{
      return procedure.id !== id;
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
