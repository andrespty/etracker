
interface JSONResponse<T> {
    success: boolean,
    data: T,
}

interface AuthJSONResponse {
    refresh: string,
    access: string,
    paymentMethods: IPaymentMethod[]
}

interface ErrorAuth {
    success: boolean,
    error: AuthErrorTypes
}