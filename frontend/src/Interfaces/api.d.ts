
interface JSONResponse<T> {
    success: boolean,
    data: T,
}

interface AuthJSONResponse {
    refresh: string,
    access: string,
    paymentMethods: IPaymentMethod[]
}

interface NewAuthJSONResponse extends AuthJSONResponse {
    email: string,
    first_name: string,
    last_name: string,
    id: number,
    token: {
        refresh: string,
        access: string
    },
    
}

interface ErrorAuth {
    success: boolean,
    error: AuthErrorTypes
}