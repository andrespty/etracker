import React from 'react'
import { Box, Text, Heading, ButtonGroup, Button, Flex } from '@chakra-ui/react'
import { useUser } from '../../Store/hooks/useUser'

interface IEdit {
    id: number,
    onClose:() => void
}

function DeletePayment({ id, onClose }: IEdit) {

    const { deletePayment } = useUser()

    return (
        <Box>
            <Heading size='lg'>Delete</Heading>
            <Text mt={3}>
                Are you sure you want to delete this payment method?
            </Text>
            <Text mt={2}>
                Deleting this payment method results in deleting expenses that used this payment method.
            </Text>

            <Flex justifyContent={'right'}>
                <ButtonGroup mt={5}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={() =>{deletePayment(id); onClose()}} colorScheme={'red'}>Delete</Button>
                </ButtonGroup>
            </Flex>
        </Box>
    )
}

export default DeletePayment