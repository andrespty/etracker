import { Box, Alert, AlertIcon, AlertTitle, AlertDescription, AlertProps, ScaleFade, CloseButton } from '@chakra-ui/react'

interface IAlert {
    title: string,
    status: "info" | "warning" | "success" | "error" | "loading",
    description?: string,
    variant?: "subtle" | "left-accent" | "top-accent" | "solid"
    colorScheme?: AlertProps["colorScheme"],
    alertProps?: AlertProps,

    isOpen: boolean,
    onClose?: ()=>void
}

function AlertAbsolute({ 
    title, 
    description, 
    status, 
    variant, 
    isOpen,
    onClose,
    colorScheme, 
    alertProps 
}: IAlert) {
  return (
    <Box 
        position={'fixed'}
        top={2}
        left={'50%'}
        transform="translateX(-50%)"
    >
        <ScaleFade in={isOpen}>
            <Alert
                status={status}
                variant={variant}
                colorScheme={colorScheme}
                {...alertProps}
            >
                <AlertIcon />
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>{description}</AlertDescription>

                {
                    onClose 
                    ? 
                        <CloseButton 
                            alignSelf='flex-start'
                            position='relative'
                            right={-1}
                            top={-1} 
                            onClick={onClose} 
                        />
                    : null
                }

            </Alert>
        </ScaleFade>
    </Box>
  )
}

export default AlertAbsolute