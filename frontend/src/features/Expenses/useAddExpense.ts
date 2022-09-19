import { useState } from "react"
import { createNewExpense } from '../../Store/thunks/expenses.thunks'
import { useAppDispatch } from '../../Store/hooks/hooks'

export interface IAdd {
    name: string,
    date: string,
    amount: string,
    categoriesIDs: number[],
    paymentID: number
}

export const useAddExpense = (onClose: () => void) => {
    const [ expense, modify ] = useState<IAdd>({
        name: '',
        amount: '',
        date: '',
        categoriesIDs: [],
        paymentID: 0
    })
    const [ isLoading, setLoading ] = useState(false)
    const setExpense = (mod: Partial<IAdd>) => {
        modify(prevState => ({...prevState, ...mod }))
    }

    const dispatch = useAppDispatch()

    const submit = () => {
        console.log(expense)
        let formattedDate = new Date(expense.date)
        let final = `${formattedDate.getFullYear()}-${formattedDate.getMonth() + 1}-${formattedDate.getDate()}`
        dispatch(createNewExpense({...expense, date: final}, setLoading, modify, onClose))
    }

    return { expense, setExpense, submit, isLoading }
}