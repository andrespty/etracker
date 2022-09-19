import React from 'react'
import DatePicker, { CalendarProps, DatePickerProps } from "react-multi-date-picker"
import "react-multi-date-picker/styles/layouts/mobile.css"
import './DatePicker.css'
import { FormControl, FormLabel, FormControlProps } from '@chakra-ui/react'

export interface ICustomDatePicker {
  label: string,
  calendarProps: CalendarProps & DatePickerProps,
  formControlProps? : FormControlProps
}

function CustomDatePicker({ label, calendarProps, formControlProps }: ICustomDatePicker) {

  return (
    <FormControl {...formControlProps} >
      <FormLabel mb={0.5}>{label}</FormLabel>
      <DatePicker 
        numberOfMonths={1}
        format='MM/DD/YYYY'
        value={calendarProps.value}
        onChange={calendarProps.onChange}
        inputMode='none'
        className={'rmdp-mobile purple'}

        // Input styles
        style={datePickerInputStyles}
     
        {...calendarProps}
      />

    </FormControl>
  )
}


export const datePickerInputStyles: React.CSSProperties = {
  outline:'2px solid transparent',
  outlineOffset: '2px',
  position:'relative',
  height: "var(--chakra-sizes-10)",
  // border:'1px solid',
  background:'inherit',
  borderRadius: "var(--chakra-radii-md)",
  borderColor:'inherit',
  fontSize: 'var(--chakra-fontSizes-md)',
  padding: "3px 10px",
  transitionProperty: 'var(--chakra-transition-property-common)',
  transitionDuration: 'var(--chakra-transition-duration-normal)',
  width:'100%',
  minWidth:'200px'
}

export default CustomDatePicker