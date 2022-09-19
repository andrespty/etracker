import React from 'react'
import { Box, Center, Tag, IconButton, Heading, Text, Flex, Spacer } from '@chakra-ui/react'
import InputForm from '../../Components/InputForm'
import { useAddExpense } from './useAddExpense'
import InputNumber from '../../Components/InputNumber'
import SelectPayment from '../../Components/PaymentMethodPicker/SelectPayment'
import CustomDatePicker from '../../Components/DatePicker/CustomDatePicker'
import CategorySelector from '../../Components/CategorySelector/CategorySelector'
import OnBoardingFlow from '../../Containers/OnBoardingFlow'
import { ArrowForwardIcon, ArrowBackIcon, CheckIcon } from '@chakra-ui/icons'
import { useUser } from '../../Store/hooks/useUser'
import { useCategories } from '../../Store/hooks/useCategories'
import PaymentForm from '../../Components/PaymentMethodPicker/PaymentForm'

interface IAccept{
    onClose?: () => void
}

function AddExpense({ onClose }: IAccept) {

    const [ index, setIndex ] = React.useState(0)
    const { expense, setExpense, submit, isLoading } = useAddExpense(() => onClose ? onClose() : {})
    const { categories } = useCategories()
    const { userData } = useUser()

    const next = () => setIndex(index + 1)
    const prev = () => setIndex(index - 1)

    return (
        <Box h={'40vh'}>
            <OnBoardingFlow
                currentIndex={index}
            >
                <Box h='100%'>

                    <Center mb={10}>
                        <Heading size='3xl' >${parseFloat(expense.amount || '0').toFixed(2)}</Heading>
                    </Center>

                    <InputNumber 
                        label='Amount'
                        value={`$${expense.amount}`}
                        onChange={str => setExpense({amount: str || ''})}
                        placeholder='$0.00'
                        variant={'outline'}
                    />

                    <Center position='absolute' bottom={5} left={0} w='100%' >
                        <IconButton 
                            isDisabled={expense.amount === ''}
                            size='lg'
                            colorScheme={'green'}
                            icon={<ArrowForwardIcon fontSize='xl' />} 
                            onClick={next} 
                            aria-label='' 
                        />
                    </Center>
                </Box>
                <Box>
                    <InputForm 
                        label='Expense name'
                        value={expense.name}
                        onChange={(str) => setExpense({name: str})}
                        placeholder='Expense'
                        variant={'outline'}
                    />
                   
                    <CustomDatePicker 
                        label='Date'
                        calendarProps={{
                            value: expense.date,
                            onChange: (date) => setExpense({date: date?.toString()})
                        }}
                    />
                   
                    <Center gap={5} position='absolute' bottom={5} left={0} w='100%'>
                        <IconButton icon={<ArrowBackIcon fontSize={'xl'}/>} onClick={prev} aria-label='' size='lg' />
                        <IconButton 
                            isDisabled={expense.name === '' || expense.date === ''}
                            icon={<ArrowForwardIcon fontSize={'xl'}/>} onClick={next} aria-label='' size='lg' colorScheme={'green'} />
                    </Center>
                </Box>

                <Box>

                    <PaymentForm 
                        defaultOption={expense.paymentID}
                        onChange={(paymentID: number) => setExpense({paymentID: paymentID})}
                    />

                    <CategorySelector 
                        onChange={(list:number[]) => setExpense({ categoriesIDs: list})} 
                    />

                    <Center gap={5} position='absolute' bottom={5} left={0} w='100%'>
                        <IconButton icon={<ArrowBackIcon fontSize={'xl'}/>} onClick={prev} aria-label='' size={'lg'} />
                        <IconButton 
                            isDisabled={expense.paymentID === 0 || expense.categoriesIDs.length === 0} 
                            icon={<ArrowForwardIcon fontSize={'xl'}/>} onClick={next} aria-label='' size='lg' colorScheme={'green'} 
                        />
                    </Center>
                </Box>

                <Box>

                    <Heading size={'lg'}>Review</Heading>
                    
                    <Flex alignItems={'center'}>
                        <Text fontSize={'3xl'}>{expense.name}</Text>
                        <Spacer />
                        <Text fontSize={'4xl'}>${expense.amount}</Text>
                    </Flex>

                    <Flex alignItems={'center'}>
                        <Text fontSize={'xl'}>
                            {
                                userData.paymentMethods.map((p) => expense.paymentID === p.id ? p.name : '')
                            }
                        </Text>
                        <Spacer />
                        <Text fontSize={'xl'}>{expense.date}</Text>
                    </Flex>
                    
                    <Center mt={2}>
                    <Flex gap={3}>
                        {
                            categories.map((p) => {
                                if (expense.categoriesIDs.includes(p.id)){
                                    return <Tag colorScheme={'green'}>{p.name}</Tag>
                                }
                            })
                        }
                    </Flex>
                    </Center>

                    <Center gap={5} position='absolute' bottom={5} left={0} w='100%'>
                        <IconButton icon={<ArrowBackIcon fontSize={'xl'}/>} onClick={prev} aria-label='' size={'lg'} />
                        <IconButton icon={<CheckIcon fontSize={'xl'} />} onClick={submit} aria-label='' size='lg' colorScheme={'green'} isLoading={isLoading} />
                    </Center>
                </Box>

            </OnBoardingFlow>
        </Box>
    )
}


export default AddExpense