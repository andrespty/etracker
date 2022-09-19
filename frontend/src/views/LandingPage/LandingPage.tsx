import React from 'react'
import { Box, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function LandingPage() {

  const navigate = useNavigate()

  const handle_click = () => {
    navigate('/login')
  }

  return (
    <Box>
      <Button onClick={handle_click}>Login</Button>
    </Box>
  )
}

export default LandingPage