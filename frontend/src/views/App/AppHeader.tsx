import React from 'react'
import { useHideOnScroll } from '../../hooks/useHideOnScroll'
import { Box, SlideFade, Heading, Button, Spacer, Flex, ButtonGroup, useBreakpointValue, IconButton, Text } from '@chakra-ui/react'
import { useUser } from '../../Store/hooks/useUser'
import { useAppDispatch } from '../../Store/hooks/hooks'
import { getExtraUserInfo } from '../../Store/thunks/user.thunks'
import { useNavigate } from 'react-router-dom'
import { SettingsIcon, HamburgerIcon } from '@chakra-ui/icons'
import { withDrawer } from '../../Containers/withDrawer'
import Settings from 'react-multi-date-picker/plugins/settings'

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
              <Button onClick={() => navigate('/app/categories')} >Categories</Button>

              <Button onClick={() => navigate('/app/user')} rightIcon={<SettingsIcon />} >{userData.first_name}</Button>
            </ButtonGroup>
        }

        </Flex>
      </Box>
  )
}

export default AppHeader

const MenuBody = () => {

  const navigate = useNavigate()

  return (
    <Flex flexDir={'column'}>
      {/* <Button onClick={() => navigate('/app/categories')} >Categories</Button>

      <Button onClick={() => navigate('/app/user')} rightIcon={<SettingsIcon />} >Settings</Button> */}

      <Text 
        onClick={() => navigate('/app/categories')} 
        cursor='pointer'
      >
        Categories
      </Text>

      <Text 
        onClick={() => navigate('/app/user')}
        cursor='pointer'
      >
        <SettingsIcon />
        Settings
      </Text>

    </Flex>
  )
}