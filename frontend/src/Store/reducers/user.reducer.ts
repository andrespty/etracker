import { getPayloadFromToken } from "../../utils/getPayloadFromToken";
import { UserActions } from "../actions/user.actions";
import { RootActions } from "../store";

const initialUser = (): IUserState => {
    let token = localStorage.getItem('access')
    if (token){
        let user = getPayloadFromToken(token)
        return {
            data: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email:user.email,
                paymentMethods:[]
            },
            status:{
                isLoading: false,
                isLoggedIn: true
            }
        }
    }
    else {
        return {
            data:{
                id:0,
                first_name: "",
                last_name: "",
                email: "",
                paymentMethods: []
            },
            status:{
                isLoading: false,
                isLoggedIn: false
            }
        }
    }
}

export const UserReducer = (state: IUserState = initialUser(), action: RootActions) => {

    switch (action.type) {
        case UserActions.UPDATE_STATUS:
            return {
                ...state,
                status:{
                    ...state.status,
                    ...action.payload
                }
            }
        case UserActions.UPDATE_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload
                }
            }
        case UserActions.LOGOUT:
            localStorage.clear()
            return initialUser()
        
        case UserActions.ALL:
            return {
                ...state,
                data: {...state.data, ...action.payload.data},
                status: {...state.status, ...action.payload.status}
            }
        case UserActions.DELETEPAYMENT:
        
            let pms = [...state.data.paymentMethods]
            let index = pms.findIndex((p) => p.id === action.payload)
            pms.splice(index, 1)

            return {
                ...state,
                data:{
                    ...state.data,
                    paymentMethods: [...pms]
                }
            }
        case UserActions.UPDATE_PAYMENT:
            let ps = [...state.data.paymentMethods]
            let indexps = ps.findIndex((p) => p.id === action.payload.id)
            ps.splice(indexps, 1, action.payload)


            return {
                ...state,
                data:{
                    ...state.data,
                    paymentMethods:[...ps]
                }
            }
        default:
            return state;
    }
}

