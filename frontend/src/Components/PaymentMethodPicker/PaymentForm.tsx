import React from 'react'
import { Box, FormControl, FormLabel } from '@chakra-ui/react'
import { useUser } from '../../Store/hooks/useUser'
import CreatableSelect from 'react-select/creatable'
import { CSSObject } from '@emotion/react'
import { useAppDispatch } from '../../Store/hooks/hooks'
import { createNewPayment } from '../../Store/thunks/user.thunks'

interface IPaymentPicker {
  defaultOption: number
  onChange?: (paymentID: number) => void
}

function PaymentMethodPicker({ onChange, defaultOption }:IPaymentPicker) {

    const { userData } = useUser()
    const [ payment, setPayment ] = React.useState({
      label: '',
      value: 0
    })

    interface IChange {
        label: string,
        value: number
    }

    const handle_change = (props: IChange | null) => {
        if (props){
            const { value, label } = props
            if (onChange && value){
              onChange(value)
            }
            setPayment({value:value || 0, label:label || ''})
        }
    }

    const dispatch = useAppDispatch()

    const handle_new_payment = (inputVal: string) => {
        dispatch(createNewPayment(inputVal, setPayment))

    }

  return (
    <Box>
      <FormControl>
        <FormLabel mb={0.5}>Payment Method</FormLabel>
        <CreatableSelect 
          options={userData.paymentMethods.map((p) => ({value:p.id, label: p.name}))}
          styles={{ control: styles }}
          onCreateOption={handle_new_payment}
          onChange={(e) => handle_change(e)}
          value={payment}
        />
      </FormControl>
    </Box>
  )
}

export default PaymentMethodPicker

const styles = (base: CSSObject):CSSObject => ({
  ...base,
  border: '1px solid #CBD5E0',
  outline: '2px solid transparent',
  borderRadius: 'var(--chakra-radii-md)',
  borderColor: 'inherit'
})

const fixedPayments: IPaymentMethod[] = [
  {
      "id":1,
      "name":"Credit Card",
      "creator":1,
      "bgColor":"",
      "color":""
  },
  {
      "id":2,
      "name":"Debit Card",
      "creator":1,
      "bgColor":"",
      "color":""
  },
  {
      "id":3,
      "name":"Cash",
      "creator":1,
      "bgColor":"",
      "color":""
  }
]