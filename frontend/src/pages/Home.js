import React, { useEffect, useState } from 'react';
import Navbar from '../component/NavBar';
import Header from '../component/Header';
import { Box, Card, Container, Pagination, Stack, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import {useDispatch, useSelector} from "react-redux";
import { jobLoadAction } from '../redux/actions/jobActions';
import {useParams} from "react-router-dom";
import CardElement from '../component/cardElement';



const Home = () =>{
    const {jobs, setUniqueLocation, pages, loading} = useSelector(state=>state.loadJobs);
    const {palette} = useTheme();
    const dispatch = useDispatch();
    const {keyword, location} = useParams();


    const [page, setPage] = useState(1);
    const [cat, setCat] = React.useState("");

    useEffect(() =>{
        dispatch(jobLoadAction(page, keyword, cat, location))

    }, [page, keyword, cat, location])


    return(
        <>
        <Box sx={{bgcolor:"#fafafa", minHeight: "100vh"}}>
            <Navbar/>
            <Header/>
            <Container>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                    <Box sx={{flex:2, p:2}}>
                        <Card sx={{pb:2}}>
                            <Typography component="h4" sx={{color:palette.secondary.main, fontWeight:600}}>
                                Filter job by category

                            </Typography>

                        </Card>

                    </Box>
                    <Box sx={{flex:5, p:2}}>
                        {
                            jobs && jobs.map((job,i) => (
                                <CardElement
                                    key={i}
                                    id={job._id}
                                    jobTitle={job.title}
                                    description={job.description}
                                    category={job.jobType ? job.jobType.jobTypeName : "No category"}
                                    location={job.location}
                                />
                            ))
                        }
                        <Stack>
                            <Pagination page={page} count={pages === 0 ? 1 : pages} onChange={(event, value) => setPage(value)} />
                        </Stack>

                    </Box>

                </Stack>
 
            </Container>

        </Box>
        </>
    )
}

export default Home;