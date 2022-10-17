import React from 'react'
import { Box, Heading, Center, Button, Accordion } from '@chakra-ui/react'
import RegularList from '../../Containers/RegularList'
import ExpenseCard from './ExpenseCard'
import MonthPicker from '../../Components/MonthPicker'
import YearPicker from '../../Components/YearPicker'
import PaymentMethodPicker from '../../Components/PaymentMethodPicker/PaymentMethodPicker'
import { useExpenses } from '../../Store/hooks/useExpenses'
import AbsoluteButton from '../../Components/AbsoluteButton'
import { withModal } from '../../Containers/withModal'
import AddExpense from './AddExpense'

const AddExpenseButton = withModal(AbsoluteButton)
const ButtonWithAddExpense = withModal(Button)

function Expenses() {

    const { expenses, setState } = useExpenses() 

    return (
        <Center
            mt={5}
            p={2}
            flexDir='column'
            
        >
            <Box  mb={16}>

                <Center gap={3}>
                    <MonthPicker onChange={(month:number) => setState({month})} />
                    
                    <YearPicker onChange={(year:number) => setState({year})} />
                </Center>

                <Center>
                    <Box m={5} mb={10}>
                        <Heading size={'4xl'}>${expenses.total.toFixed(2)}</Heading>
                    </Box>
                </Center>

                <Center>

                    <Box w='250px'>
                        <PaymentMethodPicker 
                            onChange={(paymentID: number) => setState({paymentID})} 
                            defaultOption='All'
                        />
                    </Box>

                </Center>

                <Accordion allowToggle>
                <RegularList 
                    items={expenses.expenses}
                    resourceName='expense'
                    renderItem={(expense, key) => (
                        // <Box key={key} my={2}>
                            <ExpenseCard {...expense} />
                        // </Box>
                    )}
                    emptyComponent={() => (
                        <Box mt={10}>
                            <Heading>No expenses yet</Heading>
                            <Center mt={5}>
                                <ButtonWithAddExpense colorScheme={'green'} title='Add Expense' body={AddExpense} closeOnOverlayClick={true}>
                                    Add Expense
                                </ButtonWithAddExpense>
                            </Center>
                        </Box> 
                    )}
                />
                </Accordion>

            </Box>
            <AddExpenseButton 
                aria-label='Add Expense' 
                title='Add Expense'
                body={AddExpense}
                closeOnOverlayClick ={true}
            />
        </Center>
    )
}

export default Expenses