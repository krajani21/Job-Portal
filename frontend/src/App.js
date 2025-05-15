import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/login';
import UserDashboard from './pages/user/userDashboard';

const App = () => {
  return(
    <>
    <ToastContainer/>
    <ThemeProvider theme = {theme}>
      <CssBaseline/>

        <BrowserRouter>
          <Routes>
            <Route path = "/" element = {<Home/>}/>
            <Route path = "/search/location/:location" element = {<Home/>}/>
            <Route path = "/search/:keyword" element = {<Home/>}/>
            <Route path = "/login" element = {<Login/>}/>
            <Route path = "/user/dashboard" element = {<UserDashboard/>}/>
            <Route path = "*" element = {<NotFound/>}/>

          </Routes>
        </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App;