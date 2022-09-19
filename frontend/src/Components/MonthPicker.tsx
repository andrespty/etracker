import React from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'

interface IMonthPicker {
    onChange?: (month: number) => void
}

function MonthPicker({ onChange }: IMonthPicker) {

    const [ month, setMonth ] = React.useState(new Date().getMonth())

    const handle_change = (m: number) => {
        if (onChange){
            onChange(m)
        }
        setMonth(m)
    }

  return (
    <Menu>
        <MenuButton as={Button} variant='outline' w={'150px'}>
            {Months[month]}
        </MenuButton>
        <MenuList>
            {
                Months.map((m, key) => (
                    <MenuItem 
                        key={key}
                        fontWeight={m === Months[month] ? 800 : ''}
                        onClick={() => handle_change(key)}
                    >
                        {m}
                    </MenuItem>
                ))
            }
        </MenuList>
    </Menu>
  )
}

export default MonthPicker

const Months =[
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November', 
    'December'
]