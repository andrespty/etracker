import { RootState } from "../store"

export const getCategories = (state: RootState) => {
    return state.categories
}