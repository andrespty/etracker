import { CategoryActions } from "../actions/category.actions"
import { RootActions } from "../store"
export const CategoryReducer = (state: ICategory[]=[], action: RootActions ) => {
    
    switch (action.type) {
        case CategoryActions.UPDATE:
            let prevState = [...state]
            let index = prevState.findIndex((category) => category.id === action.payload.id)
            prevState[index] = { ...prevState[index], ...action.payload }
            return [...prevState]

        case CategoryActions.SET:
            return action.payload
            
        case CategoryActions.CREATE:
            return [{...action.payload}, ...state]
    
        case CategoryActions.DELETE:
            let newState = [...state]
            let deleteIndex = newState.findIndex((category) => category.id === action.payload)
            newState.splice(deleteIndex, 1)
            return [...newState]

        default:
            return state
    }
}