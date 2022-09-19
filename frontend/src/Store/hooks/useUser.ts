import { useAppSelector, useAppDispatch } from "./hooks";
import { getUserData, getUserStatus } from "../selectors/user.selectors";
import { userLogout } from "../actions/user.actions";
import { deletePaymentInBack, editPaymentInBack } from "../thunks/user.thunks";

export const useUser = () => {
    const userData = useAppSelector(getUserData)
    const userStatus = useAppSelector(getUserStatus)

    const dispatch = useAppDispatch()

    const logOut = () => dispatch(userLogout())

    const getPaymentFromID = (id: number) => {
        return userData.paymentMethods.filter(p => p.id === id)[0]
    }

    const deletePayment = (id: number) => {
        dispatch(deletePaymentInBack(id))
    }

    const updatePayment = (id: number, name:string) => {
        dispatch(editPaymentInBack(id, name))
    }
    
    return { userData, userStatus, logOut, getPaymentFromID, deletePayment, updatePayment }
}