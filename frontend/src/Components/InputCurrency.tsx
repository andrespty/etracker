import React from 'react'
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
    FormControl, FormLabel, NumberInputProps } from "@chakra-ui/react"

interface IInputForm {
    label: string,
    value: string,
    onChange: (str: string) => void
    type?: "text" | "email" | "password"
    isRequired?: boolean,
    isDisabled?: boolean,
    placeholder: string
}
function InputNumber({ label, value, isRequired, placeholder, ...props }: IInputForm) {
    return (
        <FormControl isRequired={isRequired} mb={2}>
            <FormLabel my={0}>{label}</FormLabel>
            <NumberInput min={0} value={value} {...props} >
                <NumberInputField 
                    placeholder={placeholder} 
                    pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </FormControl>
    )
}



export default InputNumber
