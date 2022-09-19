import React from 'react'
import { FormControl, FormLabel, Input, FormControlProps, InputProps } from '@chakra-ui/react'

interface IInputForm {
    label: string,
    value: string,
    onChange: (str: string) => void
    type?: "text" | "email" | "password"
    isRequired?: boolean,
    isDisabled?: boolean,
    size?: InputProps['size'],
    variant?: InputProps['variant'],
    placeholder?: string,
    containerProps?: FormControlProps,
    inputProps?: InputProps
}

function InputForm({ 
    label, 
    value, 
    isRequired=false, 
    onChange, 
    type='text',
    isDisabled = false,
    size='md', 
    variant='filled',
    placeholder,
    containerProps,
    inputProps
}:IInputForm) {

    return (
        <FormControl isRequired={isRequired} isDisabled={isDisabled} {...containerProps} >
            <FormLabel mb={0.5}>{label}</FormLabel>
            <Input 
                placeholder={placeholder}
                type={type}
                value={value}
                size={size}
                variant={variant}
                onChange={e => onChange(e.target.value)}
                {...inputProps}
            /> 
        </FormControl>
    )
}

export default InputForm