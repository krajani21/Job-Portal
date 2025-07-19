import React, { useEffect } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { jobLoadAction } from '../../redux/actions/jobActions';
import LoadingBox from '../../component/LoadingBox';
import ErrorBoundary from '../../component/ErrorBoundary';



const DashJobs = () => {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(jobLoadAction())
    }, []);


    const { jobs, loading } = useSelector(state => state.loadJobs);
    let data = [];
    data = (jobs !== undefined && jobs.length > 0) ? jobs : []


    //delete job by Id
    const deleteJobById = (e, id) => {
        console.log(id)
    }

    const columns = [

        {
            field: '_id',
            headerName: 'Job ID',
            width: 150,
            editable: true,
        },
        {
            field: 'title',
            headerName: 'Job name',
            width: 150,
        },
        {
            field: 'jobType',
            headerName: 'Category',
            width: 150,
            valueGetter: (data) => data.row?.jobType?.jobTypeName ?? "N/A"

        },
        {
            field: 'user',
            headerName: 'User',
            width: 150,
            valueGetter: (data) => data.row?.user?.firstName ?? "N/A"

        },
        {
            field: 'available',
            headerName: 'available',
            width: 150,
            renderCell: (values => (
                values.row.available ? "Yes" : "No"
            ))

        },

        {
            field: 'salary',
            headerName: 'Salary',
            type: Number,
            width: 150,
            renderCell: (values => (
                "$" + values.row.salary
            ))

        },

        {
            field: "Actions",
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Button variant="contained"><Link style={{ color: "black", textDecoration: "none" }} to={`/admin/edit/job/${values.row._id}`}>Edit</Link></ Button>
                    < Button onClick={(e) => deleteJobById(e, values.row._id)} variant="contained" color="error">Delete</ Button>
                </Box>
            )
        }
    ];


    return (
        <ErrorBoundary>
        {loading ? (
            <LoadingBox />
        ) : (
        <Box >

            <Typography variant="h4" sx={{ color: "black", pb: 3 }}>
                Jobs list
            </Typography>
            <Box sx={{ pb: 2, display: "flex", justifyContent: "right", gap: 2 }}>
                <Button variant='contained' color="primary" startIcon={<AddIcon />}> <Link style={{ color: "black", textDecoration: "none" }} to="/">Homepage</Link></Button>
                <Button variant='contained' color="success" startIcon={<AddIcon />}> <Link style={{ color: "black", textDecoration: "none" }} to="/admin/job/create">Create Job</Link></Button>
            </Box>
            <Paper sx={{ bgcolor: "secondary.midNightBlue" }} >

                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        sx={{

                            '& .MuiTablePagination-displayedRows': {
                                color: 'black',
                            },
                            color: 'black',
                            [`& .${gridClasses.row}`]: {
                                bgcolor: (theme) =>
                                    // theme.palette.mode === 'light' ? grey[200] : grey[900],
                                    theme.palette.secondary.main
                            },
                            button: {
                                color: '#ffffff'
                            }

                        }}
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </Box>
            </Paper>

        </Box>
        )}
        </ErrorBoundary>
    )
}

export default DashJobs