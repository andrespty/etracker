import React from 'react'
import { Box, IconButton, IconButtonProps } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

function AbsoluteButton(props: IconButtonProps) {
  return (
    <Box 
        position={'fixed'}
        boxShadow='md'
        right={5}
        bottom={5}
        borderRadius='50%'

    >

        <IconButton 
            icon={<AddIcon />} 
            colorScheme={'green'}
            borderRadius='50%'
            size='lg'
            {...props}
        />

    </Box>
  )
}

export default AbsoluteButton