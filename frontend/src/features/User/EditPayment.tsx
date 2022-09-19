import React from 'react'
import { Box, Text, Heading, ButtonGroup, Button, Flex, Input } from '@chakra-ui/react'
import { useUser } from '../../Store/hooks/useUser'

interface IEdit {
    id: number,
    onClose:() => void
}

function EditPayment({ id, onClose }: IEdit) {

    const { getPaymentFromID, updatePayment } = useUser()
    const [ state, setState ] = React.useState(getPaymentFromID(id))


    return (
        <Box>
            <Heading size='lg'>Edit</Heading>

                <Text>Edit payment method</Text>

                <Input 
                    value={state.name} 
                    onChange={(e) => {setState(prev => ({...prev, name: e.target.value}))}}    
                />

                <Flex justifyContent={'right'}>
                    <ButtonGroup mt={5}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={() => {updatePayment(id, state.name); onClose()}} colorScheme={'green'}>Save</Button>
                    </ButtonGroup>
                </Flex>
        </Box>
    )
}

export default EditPayment