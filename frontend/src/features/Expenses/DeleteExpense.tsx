import React from 'react'
import { Box, Heading, Text, Button, ButtonGroup, Flex, Spacer } from '@chakra-ui/react'
import { useExpenses } from '../../Store/hooks/useExpenses'

interface IDelete {
  onClose?:() => void,
  expenseID?: number
}

function DeleteExpense({ onClose, expenseID }: IDelete) {

  const { getExpenseByID, deleteExpenseByID } = useExpenses()
  const expense = getExpenseByID(expenseID || 0)
  const handle_delete = () => {
    deleteExpenseByID(expenseID || 0)
    if (onClose){ onClose() }
  }

  return (
    <Box>
      <Text>Are you sure you want to delete this expense?</Text>

      <Flex mx={5} mt={8}>
        <Text fontSize='2xl'>{expense?.name}</Text>
        <Spacer />
        <Text fontSize='2xl'>${expense?.amount.toFixed(2)}</Text>
      </Flex>

      <Flex mx={5} mb={8}>
        <Text fontSize='lg'>{expense?.paymentMethod.name}</Text>
        <Spacer />
        <Text fontSize='lg'>{`${expense?.date}`}</Text>
      </Flex>
      

      <Flex justifyContent='right'>
        <ButtonGroup mt={10}>
          <Button onClick={onClose}>Cancel</Button>
          <Button colorScheme='red' onClick={handle_delete}>Delete</Button>
        </ButtonGroup>
      </Flex>
    </Box>
  )
}

export default DeleteExpense