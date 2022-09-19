import React from 'react'
import { Box, Select, FormControl, FormLabel, InputProps } from '@chakra-ui/react'
import { useUser } from '../../Store/hooks/useUser'

interface IPayment {
    onChange?: (paymentID: number) => void
    variant?: InputProps['variant']
}

function SelectPayment({ onChange, ...props }: IPayment) {

    const { userData } = useUser()


    return (
        <FormControl>
            <FormLabel mb={0.5}>Payment</FormLabel>
            <Select 
                onChange={(val) => {
                    if (onChange){
                        if (val.target.value){
                            onChange(parseInt(val.target.value))
                        }
                        else {
                            onChange(0)
                        }
                    }
                }}
                placeholder='Choose Payment Method'
                {...props}
            >
                {
                    userData.paymentMethods.map((payment) => (
                        <option value={payment.id} key={payment.id}>{payment.name}</option>
                    ))
                }
            </Select>
        </FormControl>
    )
}

export default SelectPayment