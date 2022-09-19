import React from 'react'
import { Box, Heading, Text, Flex, 
    Spacer, IconButton, ButtonGroup, 
    useDisclosure, Modal, ModalBody, ModalContent, ModalOverlay, ModalCloseButton, Button  } from '@chakra-ui/react'
import { useUser } from '../../Store/hooks/useUser'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import RegularList from '../../Containers/RegularList'
import DeletePayment from './DeletePayment'
import EditPayment from './EditPayment'

function UserSettings() {

    const { userData, logOut } = useUser()
    const [ isEdit, setIsEdit ] = React.useState(0)
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [ ModalComponent, setModalComponent ] = React.useState(<DeletePayment id={isEdit} onClose={onClose} />)


    const handle_open = (id: number, isEdit: boolean) => {
        setIsEdit(id)
        setModalComponent(isEdit ? <EditPayment id={id} onClose={onClose} /> : <DeletePayment id={id} onClose={onClose} />)
        onOpen()
    }

    const handle_close = () => {
        setIsEdit(0)
        onClose()
    }

    return (
        <Box m={5}>
            <Flex>
                <Heading>{userData.first_name} {userData.last_name}</Heading>
                <Spacer />
                <Button onClick={logOut}>
                    Log Out
                </Button>
            </Flex>
            
            <Box mt={10}>
                <Heading size={'md'} >Payment Methods:</Heading>

                <RegularList 
                    items={userData.paymentMethods}
                    resourceName=''
                    renderItem={(payment, key) => (
                        <Flex key={key} maxW={'500px'} borderWidth='1px' alignItems={'center'} p={3} borderRadius='lg' mt={2}>
                            <Text>{payment.name}</Text>
                            <Spacer />
                            <ButtonGroup size='sm' variant='ghost' >
                                <IconButton onClick={() => handle_open(payment.id, true)} icon={<EditIcon />} aria-label='edit button' />
                                <IconButton onClick={() => handle_open(payment.id, false)} icon={<DeleteIcon />} aria-label='delete button' />
                            </ButtonGroup>
                        </Flex>
                    )}
                    emptyComponent={() => (
                        <Text>No Payment Methods</Text>
                    )}
                />
            </Box>
            
            <Modal isOpen={isOpen} onClose={handle_close}>
                <ModalOverlay />
                <ModalContent>
                    {/* <ModalHeader>
                        {

                        }
                    </ModalHeader> */}
                    <ModalCloseButton />
                    <ModalBody>
                        {ModalComponent}
                    </ModalBody>
                </ModalContent>
            </Modal>

        </Box>
    )
}

export default UserSettings