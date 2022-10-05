import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import LogIn from "./views/Auth/LogIn";
import SignUp from "./views/Auth/SignUp";
import PrivateRoute from "./Containers/PrivateRoute";
import MainApp from "./views/App/MainApp";

export const fetch_url = 'http://127.0.0.1:8000'
// export const fetch_url = 'http://expensesapi.andrespty.com'
// export const fetch_url = 'http://3.129.200.60:8000'


function App() {
  return (
    <Box h={'100vh'}>
      <Routes>


        <Route
          path='/'
          element={
            <PrivateRoute reverse={true} redirect='/app'>
              <LogIn />
            </PrivateRoute>
          }
        />

        <Route 
          path='/app/*'
          element={
            <PrivateRoute redirect="/">
              <MainApp />
            </PrivateRoute>
          }
        />

        <Route 
          path='/login'
          element={
            <PrivateRoute reverse={true} redirect='/'>
              <LogIn />
            </PrivateRoute>
          }
        />

        <Route 
          path='/signup'
          element={
            <PrivateRoute reverse={true} redirect='/' >
              <SignUp />  
            </PrivateRoute>
          }
        />

      </Routes>
    </Box>
  );
}

export default App;
