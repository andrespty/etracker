import React from 'react'
import { useHideOnScroll } from '../../hooks/useHideOnScroll'
import { Box, SlideFade, Heading, Button, Spacer, Flex, ButtonGroup, useBreakpointValue, IconButton, Text } from '@chakra-ui/react'
import { useUser } from '../../Store/hooks/useUser'
import { useAppDispatch } from '../../Store/hooks/hooks'
import { getExtraUserInfo } from '../../Store/thunks/user.thunks'
import { useNavigate } from 'react-router-dom'
import { SettingsIcon, HamburgerIcon } from '@chakra-ui/icons'
import { withDrawer } from '../../Containers/withDrawer'

const IconButtonWithModal = withDrawer(IconButton)

function AppHeader() {

    const { show } = useHideOnScroll()
    const { userData } = useUser()
    const navigate = useNavigate()

    const isMobile = useBreakpointValue({base: true, md: false})

    const dispatch = useAppDispatch()
    React.useEffect(() => {
      dispatch(getExtraUserInfo())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <Box
        as={SlideFade}
        initial={show}
        in={show}
        offsetY='-20px'
        position='relative'
        zIndex={30}
        bg={'white'}
        py={2}
        px={4}
        boxShadow='md'
      >
        <Flex>
        <Heading onClick={() => navigate('/app')} cursor='pointer'>ETracker</Heading>

        <Spacer />

        {
          isMobile
          ?
            <IconButtonWithModal 
              variant='ghost'
              fontSize={'lg'}
              icon={<HamburgerIcon />} 
              aria-label='' 
              title=''
              body={MenuBody}
            />
          :
            <ButtonGroup variant='ghost'>
              <Button onClick={() => navigate('/app')} >Home</Button>
              
              <Button onClick={() => navigate('/app/categories')} >Categories</Button>

              <Button onClick={() => navigate('/app/user')} rightIcon={<SettingsIcon />} >{userData.first_name}</Button>
            </ButtonGroup>
        }

        </Flex>
      </Box>
  )
}

export default AppHeader

const MenuBody = ({ onClose }: {onClose?: () => void}) => {

  const navigate = useNavigate()
  const handle_nav = (str:string) => {
    navigate(str)
    if (onClose){
      onClose()
    }
  }

  return (
    <Flex flexDir={'column'}  position='fixed' bottom={20} gap={10}>
      {/* <Button onClick={() => navigate('/app/categories')} >Categories</Button>

      <Button onClick={() => navigate('/app/user')} rightIcon={<SettingsIcon />} >Settings</Button> */}

      <Text 
        onClick={() => handle_nav('/app')} 
        cursor='pointer'
        fontSize={'4xl'}
        _hover={{
          color: 'gray.500'
        }}
        transition={'color ease 0.2s'}
      >
        Home
      </Text>

      <Text 
        onClick={() => handle_nav('/app/categories')} 
        cursor='pointer'
        fontSize={'4xl'}
        _hover={{
          color: 'gray.500'
        }}
        transition={'color ease 0.2s'}
      >
        Categories
      </Text>

      <Flex 
          onClick={() => handle_nav('/app/user')}
          cursor='pointer'
          fontSize={'4xl'}
          _hover={{
            color: 'gray.500',
            // transition: 'color ease 0.2s'
          }}
          transition={'color ease 0.2s'}
          flexDir={'row'} 
          alignItems={'center'}
          gap={1}
        >
        <SettingsIcon />
        <Text>
          Settings
        </Text>
      </Flex>

    </Flex>
  )
}