import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./hooks";
import { getExpenses } from "../selectors/expenses.selectors";
import { getExpensesQuery, deleteExpense } from "../thunks/expenses.thunks";

export const useExpenses = () => {

    const [ state, modifyState ] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        paymentID: 0
    })

    const expenses = useAppSelector(getExpenses)

    const dispatch = useAppDispatch()

    const setState = (modification: {month?: number, year?: number, paymentID?: number}) => {
        modifyState(prevState => ({...prevState, ...modification}))
    }

    const getExpenseByID = (id: number) => {
        const res = expenses.expenses.filter((expense) => expense.id === id )
        if (res.length === 0){
            return null
        }
        else {
            return res[0]
        }
    }

    const deleteExpenseByID = (id: number) => {
        dispatch(deleteExpense(id))
    }
    
    useEffect(() => {

        const makeQuery = () => {
            dispatch(getExpensesQuery(state.month, state.year, state.paymentID))
        }

        makeQuery()

    }, [state, dispatch])
    

    return { expenses, setState, getExpenseByID, deleteExpenseByID }
}
