import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../Store/hooks/hooks'
import { getUserStatus } from '../Store/selectors/user.selectors'

interface IRoute {
    redirect: string,
    children: React.ReactElement
    reverse?: boolean,
}

function PrivateRoute({ children, reverse=false, redirect }: IRoute) {

    const { isLoggedIn }: IUserStatus = useAppSelector(getUserStatus)

    if (reverse){
        if (isLoggedIn) {
            return <Navigate to={redirect} />
        }
    }
    else {
        if (!isLoggedIn) {
            return <Navigate to={redirect} />
        }
    }

    
    return children
}

export default PrivateRoute