import { useState } from 'react'
import { useAppSelector, useAppDispatch } from './hooks'
import { getCategories } from '../selectors/category.selector'
import { createNewCategory } from '../thunks/categories.thunks'

export const useCategories = () => {
    
    const [ isLoading, setLoading ] = useState(false)

    const categories = useAppSelector(getCategories)
    const dispatch = useAppDispatch()

    const handle_new_category = (inputVal: string) => {
        setLoading(true)
        dispatch(createNewCategory(inputVal, setLoading))
    }

    return { categories, isLoading, handle_new_category }
}