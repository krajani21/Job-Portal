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
import UserJobsHistory from './pages/user/UserJobsHistory';
import UserInfoDashboard from './pages/user/UserInfoDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './component/AdminRoute';
import SingleJob from './pages/user/SingleJob';
import DashUsers from './pages/admin/DashUsers';
import DashJobs from './pages/admin/DashJobs';



//high order component
const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobsHistory);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);
const AdminDashboardHOC = Layout(AdminDashboard);
const DashUsersHOC = Layout(DashUsers);
const DashJobsHOC = Layout(DashJobs);


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
            <Route path = "/job/:id" element = {<SingleJob/>}/>
            <Route path = "/admin/dashboard" element = {<AdminRoute><AdminDashboardHOC/></AdminRoute>} />
            <Route path = "/admin/users" element = {<AdminRoute><DashUsersHOC/></AdminRoute>} />
            <Route path = "/admin/jobs" element = {<AdminRoute><DashJobsHOC/></AdminRoute>} />
            <Route path = "/user/dashboard" element = {<UserRoute><UserDashboardHOC/></UserRoute>} />
            <Route path = "/user/jobs" element = {<UserRoute><UserJobsHistoryHOC/></UserRoute>} />
            <Route path = "/user/info" element = {<UserRoute><UserInfoDashboardHOC/></UserRoute>} />
            <Route path = "*" element = {<NotFound/>}/>

          </Routes>
        </BrowserRouter>
      </ProSidebarProvider>

    </ThemeProvider>
    </>
  )
}

export default App;