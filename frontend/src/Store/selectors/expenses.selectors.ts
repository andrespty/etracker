import { RootState } from "../store";

export const getExpenses = (state: RootState) => {
    return state.expenses
}