import { ComponentType } from "react"
import { ModalProps, useDisclosure } from "@chakra-ui/react"
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'

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

export function withDrawer<T> (Component: ComponentType<T>) {
    return (props: T & IModal<IInject>) => {

        const { isOpen, onClose, onOpen } = useDisclosure() 

        return (
            <>
            <Component 
                {...props} 
                onClick={onOpen}
            />
            <Drawer isOpen={isOpen} onClose={onClose} closeOnOverlayClick={props.closeOnOverlayClick}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{props.title}</DrawerHeader>
                    <DrawerBody>
                        <props.body onClose={onClose} {...props.otherProps} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            </>
        )
    }
}