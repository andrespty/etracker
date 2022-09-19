import { ComponentType } from "react"
import { ModalProps, useDisclosure } from "@chakra-ui/react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react"

interface IModal<T> {
    title: string,
    body: ComponentType<T>,
    closeOnOverlayClick?: ModalProps['closeOnOverlayClick']
    otherProps?: AdditionalProps
}

interface IInject {
    isOpen?: boolean,
    onClose?: () => void,
    onOpen?: () => void,
    otherProps?: AdditionalProps
}

export function withModal<T> (Component: ComponentType<T>) {
    return (props: T & IModal<IInject>) => {

        const { isOpen, onClose, onOpen } = useDisclosure() 

        return (
            <>
            <Component 
                {...props} 
                onClick={onOpen}
            />
            <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={props.closeOnOverlayClick}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>{props.title}</ModalHeader>
                    <ModalBody>
                        <props.body onClose={onClose} {...props.otherProps} />
                    </ModalBody>
                </ModalContent>
            </Modal>
            </>
        )
    }
}