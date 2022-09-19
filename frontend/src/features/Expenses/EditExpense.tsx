import React from 'react'
import { Box } from '@chakra-ui/react'
import { useExpenses } from '../../Store/hooks/useExpenses'

interface IEdit {
  expenseID?: number,
  onClose?: () => void
}

function EditExpense({ expenseID, onClose }: IEdit) {

  const { getExpenseByID } = useExpenses()

  const expense = getExpenseByID(expenseID || 0)

  const [ state, setState ] = React.useState(expense)

  return (
    <Box>
      
    </Box>
  )
}

export default EditExpense