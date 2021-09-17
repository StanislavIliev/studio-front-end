import { Procedure } from "src/app/models/procedure";

export interface ProcedureState{
    procedures: Procedure[];
}

export const initialState: ProcedureState = {
    procedures: null
 };
