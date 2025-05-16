import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Login from './pages/login';
import UserDashboard from './pages/user/userDashboard';
import UserRoute from './component/userRoute';
import Layout from './pages/global/Layout';

//high order component
const UserDashboardHOC = Layout(UserDashboard);




const App = () => {
  return(
    <>
    <ToastContainer/>
    <ThemeProvider theme = {theme}>
      <CssBaseline/>
      <ProSidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path = "/" element = {<Home/>}/>
            <Route path = "/search/location/:location" element = {<Home/>}/>
            <Route path = "/search/:keyword" element = {<Home/>}/>
            <Route path = "/login" element = {<Login/>}/>
            <Route path = "/user/dashboard" element = {<UserRoute><UserDashboardHOC/></UserRoute>} />
            <Route path = "*" element = {<NotFound/>}/>

          </Routes>
        </BrowserRouter>
      </ProSidebarProvider>

    </ThemeProvider>
    </>
  )
}

export default App;