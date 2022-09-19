import { Dispatch } from "@reduxjs/toolkit";

export enum CategoryActions {
    SET    = 'SET_CATEGORIES',
    CREATE = 'CREATE_CATEGORY',
    UPDATE = 'UPDATE_CATEGORY',
    DELETE = 'DELETE_CATEGORY',
}

type CategoryPayload = Partial<ICategory>

interface CategoryUpdate {
    type: CategoryActions.UPDATE,
    payload: CategoryPayload
}

interface CategorySet {
    type: CategoryActions.SET,
    payload: ICategory[]
}

interface CategoryCreate{
    type: CategoryActions.CREATE,
    payload: ICategory
}

interface CategoryDelete {
    type: CategoryActions.DELETE,
    payload: number
}

export const updateCategory = (payload: CategoryPayload) => {
    return (dispatch: Dispatch<CategoryActionTypes>) => {
        dispatch({
            type: CategoryActions.UPDATE,
            payload: {...payload}
        })
    }
}

export const setCategories = (payload: ICategory[]) => {
    return (dispatch: Dispatch<CategoryActionTypes>) => {
        dispatch({
            type: CategoryActions.SET,
            payload: payload
        })
    }
}

export const createCategory = (payload: ICategory) => {
    return (dispatch: Dispatch<CategoryActionTypes>) => {
        dispatch({
            type: CategoryActions.CREATE,
            payload: payload
        })
    }
}

export const deleteCategory = (payload: number) => {
    return (dispatch: Dispatch<CategoryActionTypes>) => {
        dispatch({
            type: CategoryActions.DELETE,
            payload: payload
        })
    }
}

export type CategoryActionTypes = 
    CategoryUpdate | 
    CategorySet | 
    CategoryCreate |
    CategoryDelete