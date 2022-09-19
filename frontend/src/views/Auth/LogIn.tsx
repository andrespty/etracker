import { useAuth } from './useAuth'
import { Box, Hide, Flex, Heading, Button, Center, Text, Link } from '@chakra-ui/react'
import InputForm from '../../Components/InputForm'
import AlertAbsolute from '../../Components/AlertAbsolute'
import { Link as RLink } from 'react-router-dom'
import { AuthErrorTypes } from '../../Interfaces/errors.d'

const LogInForm = () => {

    const { state, setState, submit, error, isLoading } = useAuth(true)
    
    return (
        <Box>

            <AlertAbsolute 
                isOpen={ error===AuthErrorTypes.WRONG || error === AuthErrorTypes.UNKNOWN }
                title={
                    error===AuthErrorTypes.WRONG ? "No credentials were found" :error === AuthErrorTypes.UNKNOWN ? "Try using another log in method" : ""
                }
                status='error'
                alertProps={{borderRadius:6}}
            />

            <Heading>Log In</Heading>
            <Text>
                New to ETracker? 
                <Link ml={1} as={RLink} to='/signup' color='green.500' >
                    Sign Up
                </Link>
            </Text>

            <form onSubmit={submit}>
                <Box my={5} >
                    <InputForm 
                        isRequired={true}
                        label='Email'
                        value={state.email}
                        placeholder='Enter Email'
                        onChange={(str) => setState({email: str})}
                        inputProps={{focusBorderColor:'green.400'}}
                        containerProps={{
                            isInvalid: error === AuthErrorTypes.WRONG
                        }}
                    />
                </Box>

                <Box my={5}>
                    <InputForm 
                        isRequired={true}
                        label='Password'
                        type='password'
                        value={state.password}
                        placeholder='Enter Password'
                        onChange={(str) => setState({password: str})}
                        containerProps={{
                            isInvalid: error === AuthErrorTypes.WRONG
                        }}
                        inputProps={{focusBorderColor:'green.400'}}
                    />
                </Box>

                <Center>
                    <Button 
                        colorScheme='green' 
                        type='submit' 
                        w={'50%'} 
                        isLoading={isLoading}
                    >
                        Log In
                    </Button>
                </Center>
            </form>

        </Box>
    )
}

const LogIn = () => {
    return (
        <Flex minH='100vh'>
            
            <Box flex={1} p={5} >
                <Center>
                    <Box w={{base:'95%', md:'80%'}}>
                        <LogInForm />
                    </Box>
                </Center>
            </Box>

            <Hide below='md'>
                <Box flex={1}>
                    
                </Box>
            </Hide>

        </Flex>
    )
}

export default LogIn