import React from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'

interface IYearPicker {
    onChange?: (year: number) => void
}

function YearPicker({ onChange }: IYearPicker) {

    const years = getYearList(2022)
    const [ year, setYear ] = React.useState(new Date().getFullYear())

    const handle_change = (y: number) => {
        if (onChange){
            onChange(y)
        }
        setYear(y)
    }

  return (
    <Menu>
        <MenuButton as={Button} variant='outline' maxW={'100px'}>
            {year}
        </MenuButton>
        <MenuList>
            {
                years.map((y, key) => (
                    <MenuItem 
                        key={key}
                        fontWeight={year === y ? 800 : ''}
                        onClick={() => handle_change(y)}
                    >
                        {y}
                    </MenuItem>
                ))
            }
        </MenuList>
    </Menu>
  )
}

export default YearPicker

const getYearList = (lastYear: number) => {
    const thisYear = new Date().getFullYear()
    
    const diff = lastYear - thisYear;

    if (diff === 0) {
        return [thisYear];
    }

    const keys = Array(Math.abs(diff) + 1).keys()
    return Array.from(keys).map(x => {
        const increment = lastYear > thisYear ? x : -x;
        return thisYear + increment;
    });
}