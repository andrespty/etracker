import { Dispatch } from "@reduxjs/toolkit"

export enum UserActions {
    UPDATE_STATUS   = "UserUpdateStatus",
    UPDATE_DATA     = "UserUpdateData",
    LOGOUT          = "UserLogout",
    ALL             = "UserUpdate",
    DELETEPAYMENT   = "DeletePayment",
    UPDATE_PAYMENT  = "UpdatePaymentMethod"        
}

interface UserStatusUpdatePayload {
    type: UserActions.UPDATE_STATUS,
    payload: IUserPayloadStatus
}
interface UserDataUpdatePayload {
    type: UserActions.UPDATE_DATA,
    payload: IUserPayloadData
}
interface UserLogout {
    type: UserActions.LOGOUT
}
interface UpdateUser {
    type: UserActions.ALL,
    payload: IUserPayload
}
interface DeletePayment{
    type: UserActions.DELETEPAYMENT,
    payload: number
}
interface UpdatePaymentMethod {
    type: UserActions.UPDATE_PAYMENT,
    payload: IPaymentMethod
}


export const updateUserStatus = (payload: IUserPayloadStatus) => {
    return (dispatch: Dispatch<UserActionTypes>) => {
        dispatch({
            type: UserActions.UPDATE_STATUS,
            payload: {...payload}
        })
    }
}

export const updateUserData = (payload: IUserPayloadData) => {
    return (dispatch: Dispatch<UserActionTypes>) => {
        dispatch({
            type: UserActions.UPDATE_DATA,
            payload: {...payload}
        })
    }
}

export const userLogout = () => {
    return (dispatch: Dispatch<UserActionTypes>) => {
        dispatch({
            type: UserActions.LOGOUT
        })
    }
}

export const updateUser = (payload: IUserPayload) => {
    return (dispatch: Dispatch<UserActionTypes>) => {
        dispatch({
            type: UserActions.ALL,
            payload: {...payload}
        })
    }
}

export const deletePaymentInState = (payload: number) => {
    return (dispatchEvent: Dispatch<UserActionTypes>) => {
        dispatchEvent({
            type: UserActions.DELETEPAYMENT,
            payload: payload
        })
    }
}

export const updatePaymentInState = (payload: IPaymentMethod) => {
    return (dispatchEvent: Dispatch<UserActionTypes>) => {
        dispatchEvent({
            type: UserActions.UPDATE_PAYMENT,
            payload: payload
        })
    }
}

export type UserActionTypes = 
    UserStatusUpdatePayload | 
    UserDataUpdatePayload | 
    UpdateUser |
    UserLogout  |
    DeletePayment|
    UpdatePaymentMethod