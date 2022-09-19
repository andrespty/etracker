import React from 'react'
import { useAuth } from './useAuth'
import { Box, Hide, Flex, Heading, Button, Center, Text, Link } from '@chakra-ui/react'
import { Link as RLink } from 'react-router-dom'
import InputForm from '../../Components/InputForm'
import { AuthErrorTypes } from '../../Interfaces/errors.d'
import AlertAbsolute from '../../Components/AlertAbsolute'

const SignUpForm = () => {
    const { state, setState, submit, error, isLoading } = useAuth(false)

    return (
        <Box>
            <AlertAbsolute 
                title={
                    error === AuthErrorTypes.EMAIL
                    ?   "An account with this email already exists"
                    :   error === AuthErrorTypes.PASSWORD
                        ?   "Password must have 6 - 20 characters"
                        :   ""
                }
                status='error'
                isOpen={error === AuthErrorTypes.EMAIL || error === AuthErrorTypes.PASSWORD}
                alertProps={{borderRadius:6}}
            />

            <Heading>Sign Up</Heading>
            <Text>
                Already have an account? 
                <Link ml={1} as={RLink} to='/login' color='green.500'>
                    Log In
                </Link>
            </Text>

            <form onSubmit={submit}>
                <Box my={3}>
                    <InputForm 
                        isRequired={true}
                        label='Email'
                        value={state.email}
                        placeholder='Enter your email'
                        onChange={(str) => setState({email: str})}
                        inputProps={{focusBorderColor:'green.400'}}
                        containerProps={{
                            isInvalid: error === AuthErrorTypes.EMAIL
                        }}
                    />
                </Box>
                <Flex dir='row' gap={2}>
                    <Box w='100%' >
                        <InputForm 
                            isRequired={true}
                            label='First Name'
                            value={state.first_name}
                            placeholder='Enter your name'
                            onChange={(str) => setState({first_name: str})}
                            inputProps={{focusBorderColor:'green.400'}}
                        />
                    </Box>
                    <Box w='100%'>
                        <InputForm 
                            isRequired={true}
                            label='Last Name'
                            value={state.last_name}
                            placeholder='Enter your lastname'
                            onChange={(str) => setState({last_name: str})}
                            inputProps={{focusBorderColor:'green.400'}}
                        />
                    </Box>
                </Flex>
                <Box my={3}>
                    <InputForm 
                        isRequired={true}
                        label='Password'
                        value={state.password}
                        type='password'
                        placeholder='Enter password'
                        onChange={(str) => setState({password: str})}
                        inputProps={{focusBorderColor:'green.400'}}
                        containerProps={{
                            isInvalid: error === AuthErrorTypes.PASSWORD
                        }}
                    />
                </Box>
                <Center>
                    <Button 
                        colorScheme='green' 
                        type='submit' 
                        w={'50%'} 
                        isLoading={isLoading}
                    >
                        Sign Up
                    </Button>
                </Center>
            </form>

        </Box>
    )
}

function SignUp() {
    return (
        <Flex minH='100vh'>
            
            <Box flex={1} p={5} >
                <Center>
                    <Box w={{base:'95%', md:'80%'}}>
                        <SignUpForm />
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

export default SignUp