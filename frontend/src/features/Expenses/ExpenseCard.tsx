import React from 'react'
import { Box, Text, Flex, Spacer, Collapse, useDisclosure, Tag, Center, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import MoreIcon from '../../Assets/MoreIcon'
// import EditExpense from './EditExpense'
import { withModal } from '../../Containers/withModal'
import DeleteExpense from './DeleteExpense'
import { formatDate } from '../../utils/formatDate'

const MenuItemWithModal = withModal(MenuItem)

function ExpenseCard(props: IExpense) {

  const { id, name, amount, date, categories, paymentMethod } = props

  const { isOpen, onToggle, onClose } = useDisclosure()

  React.useEffect(() => {
    return () => {
      if (isOpen) onClose()
    }
  })

  return (
    <Box>
      <Box 
        minW={100}
        w='350px'
        borderWidth='1px'
        borderRadius='lg'
        p={3}
        onClick={onToggle}
        cursor='pointer'
        boxShadow={isOpen ? 'lg' : ''}
      >
          <Flex>

              <Text>
                  {name}
              </Text>

              <Spacer />

              <Text textAlign={'left'}>
                  ${amount.toFixed(2)}
              </Text>
          </Flex>
      </Box>

      <Collapse in={isOpen}>
        <Box
          borderWidth='0px 0px 1px 0px'
          p={2}  
        >

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
      </Collapse>

    </Box>
  )
}

export default ExpenseCard