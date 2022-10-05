import React from 'react'
import { Box, Text, Flex, Spacer, Tag, Center, IconButton, Menu, MenuButton, MenuList, MenuItem, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react'
import MoreIcon from '../../Assets/MoreIcon'
// import EditExpense from './EditExpense'
import { withModal } from '../../Containers/withModal'
import DeleteExpense from './DeleteExpense'
import { formatDate } from '../../utils/formatDate'

const MenuItemWithModal = withModal(MenuItem)

function ExpenseCard(props: IExpense) {

  const { id, name, amount, date, categories, paymentMethod } = props

  return (
    <AccordionItem isFocusable={false}
      minW={100}
      w='350px'
      borderWidth='1px'
      borderRadius='lg'
      my={2} 
    >
      <AccordionButton _expanded={{ fontWeight:'bold', fontSize:'lg' }}>
        <Box flex={1} maxW={300} >
          <Flex alignItems='center'>

            <Text textAlign={'left'}>
              {name}
            </Text>

            <Spacer />

            <Text textAlign={'left'} ml={1}>
                ${amount.toFixed(2)}
            </Text>
          </Flex>
        </Box>
      </AccordionButton>

      <AccordionPanel mt={-2} >
        <Box px={2}>

          <Flex alignItems={'center'}>

            <Text fontWeight={600}>
              Payment Method
            </Text>

            <Spacer />

            <Menu>
              <MenuButton as={IconButton} variant='ghost' size='sm' icon={<MoreIcon/>} aria-label='' />
              <MenuList>
                {/* <MenuItemWithModal 
                  title='Edit'
                  body={EditExpense}
                  otherProps={{
                    expenseID: id
                  }}
                >
                  Edit
                </MenuItemWithModal> */}
                <MenuItemWithModal 
                  title='Delete Expense?'
                  body={DeleteExpense}
                  otherProps={{
                    expenseID: id
                  }}
                >
                  Delete
                </MenuItemWithModal>
              </MenuList>
            </Menu>
          </Flex>

          <Flex>

            <Text align={'center'}>
              {paymentMethod.name}
            </Text>

            <Spacer /> 

            <Text>
              {formatDate(date.toString())}
            </Text>
          </Flex>

          <Center>
            <Flex wrap={'wrap'} maxW='300px'>
              {
                categories.map((category, key) => (
                  <Tag
                    key={key}
                    colorScheme='green'
                    size='lg'
                    fontWeight={'bold'}
                    borderRadius='md'
                    m={0.5}
                    py={1}
                    px={2}
                  >
                    {category.name}
                  </Tag>
                ))
              }
            </Flex>
          </Center>

        </Box>
      </AccordionPanel>

    </AccordionItem>
  )
}

export default ExpenseCard