import { ThunkAction, AnyAction } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../store"
import { fetch_url } from "../../App"
import { getUserData } from "../selectors/user.selectors"
import { setExpenses, deleteExpenseInState } from "../actions/expenses.action"
import { createExpense } from '../actions/expenses.action'
import { IAdd } from '../../features/Expenses/useAddExpense'

interface IExpenseResponse extends Omit<IExpense, 'amount'> {
    amount: string,
}

export const getExpensesQuery = (month: number, year: number, paymentMethods: number = 0): ThunkAction<void, RootState, unknown, AnyAction>  => async (dispatch, getState) => {

    const user = getUserData(getState())

    axios.get(`${fetch_url}/expense/${user.id}/${month+1}/${year}/${paymentMethods}/`)
    .then((response):JSONResponse<IExpenseResponse[]> => response.data)
    .then(json => {
        let expenses;
        console.log(json.data)
        expenses = json.data.map((expense) => ({...expense, amount: parseFloat(expense.amount)}))
        dispatch(setExpenses(expenses))
    })
    .catch(e => console.log(e))
}

export const createNewExpense = (expense: IAdd, setLoading: (s: boolean) => void, modify: (i:IAdd) => void, onClose: () => void): ThunkAction<void, RootState, unknown, AnyAction>  => async (dispatch, getState) => {
    const user = getUserData(getState())
    const body = {...expense, creator: user.id}
    setLoading(true)
    axios.post(`${fetch_url}/expense/`, {...body})
    .then((response) => response.data)
    .then(json => {
        console.log(json)

        dispatch(createExpense({...json.data, amount: parseFloat(json.data.amount)}))
        modify({
            name: '',
            amount: '',
            date: '',
            categoriesIDs: [],
            paymentID: 0
        })
        setLoading(false)
        onClose()
    })
}

export const deleteExpense = (expenseID: number): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatchEvent, getState) => {
    axios.delete(`${fetch_url}/expense/${expenseID}/`)
    .then(res => res.data)
    .then(json => {
        if (json.data && json.data.deleted){
            console.log(json)
            dispatchEvent(deleteExpenseInState(expenseID))
        }
    })
}