import React from 'react'
import { Menu, MenuList, MenuButton, MenuItem, Button } from '@chakra-ui/react'
import { useUser } from '../../Store/hooks/useUser'

interface IPaymentPicker {
  defaultOption: string
  onChange?: (paymentID: number) => void
}

function PaymentMethodPicker({ onChange, defaultOption }:IPaymentPicker) {

    const { userData } = useUser()
    const [ payment, setPayment ] = React.useState({
      value: '',
      id: 0
    })

    const handle_change = ({value, id}: {value: string, id: number}) => {
      if (onChange){
        onChange(id)
      }
      setPayment({value, id})
    }

  return (
    <Menu matchWidth>
        <MenuButton as={Button} variant='outline' w='100%' >
            {payment.value ? payment.value : defaultOption}
        </MenuButton>
        <MenuList>
          <MenuItem 
            onClick={() => handle_change({
              value: '',
              id: 0
            })} 
            fontWeight={payment.value === '' ? 800 : ''}
          >
            {defaultOption}
          </MenuItem>
          {
            userData.paymentMethods.map((p, key) => (
              <MenuItem 
                key={key} 
                onClick={() => handle_change({
                  value: p.name,
                  id: p.id
                })} 
                fontWeight={payment.value === p.name ? 800 : ''}
              >
                {p.name}
              </MenuItem>
            ))
          }
        </MenuList>
    </Menu>
  )
}

export default PaymentMethodPicker

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