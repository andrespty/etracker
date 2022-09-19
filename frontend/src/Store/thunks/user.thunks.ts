import { getUserData } from "../selectors/user.selectors"
import { ThunkAction, AnyAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import axios from "axios"
import { fetch_url } from "../../App"
import { updateUserData, deletePaymentInState, updatePaymentInState } from "../actions/user.actions"
import { setCategories } from "../actions/category.actions"

export const getExtraUserInfo = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch, getState) => {
    const user = getUserData(getState())

    axios.get(`${fetch_url}/firstLoad/${user.id}/`)
    .then(response => response.data)
    .then(json => {
        dispatch(updateUserData({ paymentMethods: json.data.paymentMethods }))
        dispatch(setCategories(json.data.categories))
    })
}

export const createNewPayment = (inputval: string, setPayment: ({label, value}: {label:string, value:number}) => void) : ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch, getState) => {
    const user = getUserData(getState())

    const body = {name:inputval, creator: user.id}

    axios.post(`${fetch_url}/payment/`, body)
    .then((res): JSONResponse<IPaymentMethod>=> res.data)
    .then(json => {
        console.log(json)
        dispatch(updateUserData({ paymentMethods: [json.data, ...user.paymentMethods]}))
        setPayment({ value: json.data.id, label: json.data.name })
    })
}

export const deletePaymentInBack = (id: number) : ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch, getState) => {

    axios.delete(`${fetch_url}/payment/${id}/`)
    .then((res) => res.data)
    .then(json => {
        console.log(json)
        dispatch(deletePaymentInState(id))
    })
}

export const editPaymentInBack = (id: number, name: string) : ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch, getState) => {
    axios.put(`${fetch_url}/payment/`, {id: id, name: name})
    .then((res): JSONResponse<IPaymentMethod> => res.data)
    .then(json => {
        console.log(json)
        dispatch(updatePaymentInState(json.data))
    })

}