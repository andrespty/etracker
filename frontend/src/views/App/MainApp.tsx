import React from 'react'
import { Box } from '@chakra-ui/react'
import AppHeader from './AppHeader'
import { Routes, Route } from 'react-router-dom'
import Expenses from '../../features/Expenses/Expenses'
import UserSettings from '../../features/User/UserSettings'

function MainApp() {
  return (
    <Box>
        <AppHeader />
        
        <Routes>

            <Route path='user' element={<UserSettings />}/>
            <Route index element={<Expenses />}/>

        </Routes>

    </Box>
  )
}

export default MainApp