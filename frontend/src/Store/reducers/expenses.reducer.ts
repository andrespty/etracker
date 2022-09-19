import { ExpensesActions } from "../actions/expenses.action";
import { RootActions } from "../store";

interface IExpenseState{
    total: number,
    expenses: IExpense[]
}

const initialState: IExpenseState = {
    total: 0.00,
    expenses: []
}

export const ExpensesReducer = (state: IExpenseState=initialState, action: RootActions) => {
    switch (action.type) {
        case ExpensesActions.CREATE:
            return {
                total: state.total + action.payload.amount,
                expenses:[...state.expenses, {...action.payload}]
            };
    
        case ExpensesActions.UPDATE:
            let prevState = [...state.expenses]
            let index = prevState.findIndex((expense) => expense.id === action.payload.id)
            prevState[index] = { ...prevState[index], ...action.payload }

            return {
                total: getNewTotalAmount(prevState),
                expenses:[...prevState]
            };

        case ExpensesActions.DELETE:
            let newState = [...state.expenses]
            let deleteIndex = newState.findIndex((expense) => expense.id === action.payload)
            newState.splice(deleteIndex, 1)
            return {
                total: getNewTotalAmount(newState),
                expenses: [...newState]
            }
        
        
        case ExpensesActions.SET:
        return {
            total: getNewTotalAmount(action.payload),
            expenses:action.payload
        };

        default:
            return state
    }
}

const getNewTotalAmount = (expenses: IExpense[]): number => {
    let amount = 0;
    expenses.forEach(expense => {
        amount += expense.amount
    })
    return amount
}