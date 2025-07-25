import React, { useEffect } from 'react'
import { Box, Button, IconButton, Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { allUserAction } from '../../redux/actions/userActions';

const DashUsers = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allUserAction());
    }, []);


    const { users, loading } = useSelector(state => state.allUsers);
    let data = [];
    data = (users !== undefined && users.length > 0) ? users : []

    const deleteUserById = (e, id) => {
        console.log(id);
    }

    const columns = [

        {
            field: '_id',
            headerName: 'User ID',
            width: 150,
            editable: true,
        },

        {
            field: 'email',
            headerName: 'E_mail',
            width: 150,
        },

        {
            field: 'role',
            headerName: 'User status',
            width: 150,
            renderCell: (params) => (
                params.row.role === 1 ? "Admin" : "Regular user"
            )
        },

        {
            field: 'createdAt',
            headerName: 'Creation date',
            width: 150,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
            )
        },

        {
            field: "Actions",
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Button variant="contained"><Link style={{ color: "black", textDecoration: "none" }} to={`/admin/edit/user/${values.row._id}`}>Edit</Link></ Button>
                    < Button onClick={(e) => deleteUserById(e, values.row._id)} variant="contained" color="error">Delete</ Button>
                </Box>
            )
        }
    ];

    return (
        <>
            <Box >

                <Typography variant="h4" sx={{ color: "black", pb: 3 }}>
                    All users
                </Typography>
                <Box sx={{ pb: 2, display: "flex", justifyContent: "right", gap: 2 }}>
                    <Button variant='contained' color="primary" startIcon={<AddIcon />}> <Link style={{ color: "black", textDecoration: "none" }} to="/">Homepage</Link></Button>
                    <Button variant='contained' color="success" startIcon={<AddIcon />}> Create user</Button>
                </Box>
                <Paper sx={{ bgcolor: "secondary.midNightBlue" }} >
                    {/* box is used to grab ID of the user */}
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
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
                            getRowId={(row) => row._id}
                            rows={data}
                            columns={columns}
                            pageSize={3}
                            rowsPerPageOptions={[3]}
                            checkboxSelection
                            slots={{ toolbar: GridToolbar }}
                        />
                    </Box>
                </Paper>

            </Box>
        </>
    )
}

export default DashUsers