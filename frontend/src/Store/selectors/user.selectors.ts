import { RootState } from "../store"

export const getUserData = (state: RootState): IUser => {
    return state.user.data
}

export const getUserStatus = (state: RootState): IUserStatus => {
    return state.user.status
}
