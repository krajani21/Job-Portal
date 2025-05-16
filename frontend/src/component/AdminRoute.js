import React from 'react'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({children}) => {
    const {user} = useSelector((state) => state.user);

    //role should be 1 to indicate admin
    return user?.role === 1 ? children : <Navigate to = "/" />
    
}

export default AdminRoute;