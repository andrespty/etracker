import { Dispatch } from "@reduxjs/toolkit";

export enum ExpensesActions {
    CREATE  = 'CREATE_EXPENSE',
    UPDATE  = 'UPDATE_EXPENSE',
    DELETE  = 'DELETE_EXPENSE',
    SET     = 'SET_EXPENSES'
}

export type ExpensesActionTypes = 
    ExpensesCreate  | 
    ExpensesUpdate  |
    ExpenseDelete   |
    ExpensesSet     

interface ExpensesCreate {
    type: ExpensesActions.CREATE,
    payload: IExpense
}
interface ExpensesUpdate {
    type: ExpensesActions.UPDATE,
    payload: Partial<IExpense>
}
interface ExpenseDelete{
    type: ExpensesActions.DELETE,
    payload: IExpense['id']
}
interface ExpensesSet {
    type: ExpensesActions.SET,
    payload: IExpense[]
}

export const createExpense = (payload: IExpense) => {
    return (dispatchEvent: Dispatch<ExpensesActionTypes>) => {
        dispatchEvent({
            type: ExpensesActions.CREATE,
            payload: payload
        })
    }
}

export const updateExpense = (payload: Partial<IExpense>) => {
    return (dispatchEvent: Dispatch<ExpensesActionTypes>) => {
        dispatchEvent({
            type: ExpensesActions.UPDATE,
            payload: {...payload}
        })
    }
}

export const deleteExpenseInState = (payload: IExpense['id']) => {
    return (dispatchEvent: Dispatch<ExpensesActionTypes>) => {
        dispatchEvent({
            type: ExpensesActions.DELETE,
            payload: payload
        })
    }
}

export const setExpenses = (payload: IExpense[]) => {
    return (dispatchEvent: Dispatch<ExpensesActionTypes>) => {
        dispatchEvent({
            type: ExpensesActions.SET,
            payload: payload
        })
    }
}