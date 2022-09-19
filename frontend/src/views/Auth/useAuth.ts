import { useState, useEffect } from 'react'
import axios from 'axios'
import { fetch_url } from '../../App'
import { useAppDispatch } from '../../Store/hooks/hooks'
import { updateUser } from '../../Store/actions/user.actions'
import { AuthErrorTypes } from '../../Interfaces/errors.d'
import { useNavigate } from "react-router-dom";
import { getPayloadFromToken } from '../../utils/getPayloadFromToken'

export const useAuth = (isLogIn: boolean) => {
    const [ state, modify ] = useState<AuthTypes>(initialState)
    const [ error, setError ] = useState<AuthErrorTypes>(AuthErrorTypes.NO_ERROR)
    const [ isLoading, setLoading ] = useState(false)


    let navigate = useNavigate();
    const dispatch = useAppDispatch()
    
    // Resetting when exiting views
    useEffect(() => {
      return () => {
        modify(initialState)
        setError(AuthErrorTypes.NO_ERROR)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setState = (update: Update<AuthTypes>) => {
        modify((prevState: AuthTypes) => ({...prevState, ...update}))
    }

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("Sending request...")
        
        const url = isLogIn ? `${fetch_url}/token/` : `${fetch_url}/users/create/`
        const data = isLogIn ? {email:state.email, password: state.password} : {...state}
        const isValidPwd = isValidPassword(state.password)

        if (!isValidPwd && !isLogIn){
            setError(AuthErrorTypes.PASSWORD)
            return
        }
        setError(AuthErrorTypes.NO_ERROR)
        setLoading(true)
        

        axios.post(url, {...data})
        .then((res): JSONResponse<AuthJSONResponse> => {console.log(res); return res.data})
        .then(json => {
            if (json.success){
                console.log(json)
                let auth = getPayloadFromToken(json.data?.access)
                localStorage.setItem('access', json.data?.access)
                localStorage.setItem('refresh', json.data?.refresh)
                setLoading(false)
                console.log(auth)
                dispatch(updateUser({
                    status: {isLoggedIn: true},
                    data:{
                        id: auth.id,
                        first_name: auth.first_name,
                        last_name: auth.last_name,
                        email: auth.email,
                        paymentMethods: json.data.paymentMethods
                    }
                }))
                navigate('/')
            }
            else {
                setError(AuthErrorTypes.WRONG)
                setLoading(false)
            }
        })
        .catch((e) => {
            const error: ErrorAuth = e.response.data
            setError(error.error)
            setLoading(false)
        })
    }

    return { state, setState, submit, error, setError, isLoading }
}

const initialState: AuthTypes = {
    email:"",
    first_name:"",
    last_name:"",
    password:"",
}

const isValidPassword = (inputtxt: string) => {
    var passw = /^(?=.*\d)(?=.*[a-z]).{6,20}$/;
    if(inputtxt.match(passw)) { 
        return true;
    }
    else{ 
        return false;
    }
}
