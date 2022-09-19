import React from 'react'
import { Box, FormControl, FormLabel } from '@chakra-ui/react'
import { useCategories } from '../../Store/hooks/useCategories'
import CreatableSelect from 'react-select/creatable'
import { CSSObject } from '@emotion/react'

interface ICategorySelector{
    onChange: (list:number[]) => void
}

function CategorySelector({ onChange }:ICategorySelector) {

    const { categories, isLoading, handle_new_category } = useCategories()


    return (
        <Box>
            <FormControl>
                <FormLabel mb={0.5}>Categories</FormLabel>
                <CreatableSelect
                    closeMenuOnSelect={false}
                    isMulti
                    isLoading={isLoading}
                    options={categories.map(category => ({ value: category.id ,label:category.name }))}
                    styles={{control: styles}}
                    onCreateOption={handle_new_category}
                    onChange={(e) => {onChange(e.map(e => e.value))}}
                />
            </FormControl>
        </Box>
    )
}


const styles = (base: CSSObject):CSSObject => ({
    ...base,
    border: '1px solid #CBD5E0',
    outline: '2px solid transparent',
    borderRadius: 'var(--chakra-radii-md)',
    borderColor: 'inherit'
})


export default CategorySelector