interface IExpense {
    id: number,
    name: string,
    amount: number,
    date: Date | string,
    categories: ICategory[],
    paymentMethod: IPaymentMethod,

}

interface IPaymentMethod {
    id: number,
    name: string,
    creator: number,
    bgColor: string,
    color: string
}

interface ICategory {
    id: number,
    name: string,
    creator: number,
    bgColor: string,
    color: string
}