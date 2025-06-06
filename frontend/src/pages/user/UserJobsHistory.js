import { Typography, Box, Button } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import CardElement from '../../component/CardElement'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'

const UserJobsHistory = () => {
    const { user } = useSelector(state => state.userProfile);

    return (
        <>
            <Box>
                <Typography variant="h4" sx={{ color: "#fafafa" }}> Jobs History</Typography>
                <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                    <Button variant='contained' color="primary" startIcon={<AddIcon />}> <Link style={{ color: "black", textDecoration: "none" }} to="/">Homepage</Link></Button>
                </Box>
                <Box>
                    {
                        user && user.jobsHistory.map((history, i) => (
                            <CardElement
                                key={i}
                                id={history._id}
                                jobTitle={history.title}
                                description={history.description}
                                category=''
                                location={history.location}
                            />
                        ))
                    }
                </Box>
            </Box>
        </>
    )
}

export default UserJobsHistory