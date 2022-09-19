interface IUser {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    paymentMethods: IPaymentMethod[]
}

interface IUserStatus{
    isLoading: boolean,
    isLoggedIn: boolean
}

interface IUserStateGlobal <T, U> {
    data: T,
    status: U
}

interface IUserState extends IUserStateGlobal<IUser, IUserStatus> {}

// For Redux updates
type IUserPayloadStatus = Partial<IUserStatus>
type IUserPayloadData = Partial<IUser>
interface IUserPayload extends IUserStateGlobal<IUserPayloadData, IUserPayloadStatus> {}