import { Button, Container, Grid, IconButton, Checkbox, makeStyles, Table, TextField, Typography, Divider, TablePagination } from '@material-ui/core'
import { DeleteForever, More, PersonAdd, Search, Sort, VerticalAlignBottom, VerticalAlignTop } from '@material-ui/icons';
import { ReadMore } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles({
    top: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px'
    },
    mainContainer: {
        minHeight: '85vh',
        marginTop: '10px',
        backgroundColor: 'white',
    },
    btnSecondary: {
        margin: '5px',
        color: 'maroon',
        fontWeight: 'bolder',
        borderColor: 'maroon',
        fontSize: '0.7em'
    },
    btnPrimary: {
        margin: '5px',
        fontWeight: 'bolder',
        backgroundColor: 'maroon',
        color: 'white',
        fontSize: '0.7em'
    },
    gridItem: {
        border: '2px solid white',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    gridItemDataOdd: {
        borderRight: '1px solid white',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFFFFF',
        backgroundColor: 'black',
        padding: '5px'
    },
    gridItemDataEven: {
        border: '1px solid #DDA15E',
        borderRight: '1px solid white',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        backgroundColor: 'white',
        fontWeight: 'bolder',
        padding: '5px'
    }

})

const data = [
    {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'otienochris98@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    }, {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'otienochris98@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    },
    {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'otienochris98@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    }, {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'christopherochiengotieno@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    },
    {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'otienochris98@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    }, {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'otienochris98@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    },
    {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'otienochris98@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    }, {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'christopherochiengotieno@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    },
    {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'otienochris98@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    }, {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'otienochris98@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    },
    {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'otienochris98@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    }, {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'christopherochiengotieno@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    },
    {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'otienochris98@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    }, {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'otienochris98@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    },
    {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'otienochris98@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    }, {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'christopherochiengotieno@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    },
    {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'otienochris98@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    }, {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'otienochris98@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    },
    {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'otienochris98@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    }, {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'christopherochiengotieno@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    },
    {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'otienochris98@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    },
    {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'otienochris98@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    }, {
        firstName: 'Christopher',
        lastName: 'Otieno',
        email: 'christopherochiengotieno@gmail.com',
        isAccountDisabled: true,
        country: 'KE',
        role: 'ROLE_STUDENT',
        creationDate: '2022-09-01'
    }]

function UsersView({ users }) {

    const totalCount = users.length;
    const [stateUsers, setStateUsers] = useState(users);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {

        if (page == 0) {
            setStateUsers(users.slice(page, rowsPerPage));
        } else if ((totalCount - (page * rowsPerPage)) <= rowsPerPage) {
            setStateUsers(users.slice((page * rowsPerPage), totalCount))
        } else {
            setStateUsers(users.slice((page * rowsPerPage), (page * rowsPerPage) + rowsPerPage))
        }

    }, [page, rowsPerPage])


    const classes = useStyles();

    return (
        <div className={classes.mainContainer} style={{ padding: '10px' }}>

            <Grid container className={`${classes.top}`} >
                <Grid item xs='12' md='4' style={{ margin: '10px 0px' }}>
                    <Button className={`${classes.btnSecondary}`} variant='outlined' startIcon={<VerticalAlignTop fontSize='small' />}>Export</Button>
                    <Button className={`${classes.btnSecondary}`} variant='outlined' startIcon={<VerticalAlignBottom fontSize='small' />}>Import</Button>
                    <Button className={`${classes.btnPrimary}`} variant='outlined' startIcon={<PersonAdd fontSize='small' />}>Add user</Button>
                </Grid>
                <Grid item style={{ margin: '10px 0px' }}>
                    <TextField size='small' style={{ minWidth: '200px', margin: 'auto 5px', borderColor: 'black' }} variant='outlined' fullWidth InputProps={{
                        endAdornment: <Search />
                    }} />
                </Grid>
                <Grid item xs='12' style={{ margin: '10px 0px' }}>
                    <Button className={`${classes.btnSecondary}`} variant='outlined' startIcon={<Sort fontSize='small' />} >Sort By</Button>
                    <Button className={`${classes.btnPrimary}`} variant='outlined' startIcon={<DeleteForever fontSize='small' />}>Delete</Button>
                </Grid>

            </Grid>

            <div style={{ marginTop: '20px', height: '100%', maxHeight: '90vh', overflowY: 'scroll', overflowX: 'scroll', padding: '15px' }}>

                <div style={{ display: 'flex', alignItems: 'center', minWidth: '1100px', backgroundColor: '#283618', color: 'white', fontWeight: 'bolder', margin: '10px auto' }}>

                    <Checkbox style={{ color: 'white', minWidth: '50px', maxWidth: '50px' }} />
                    <Typography style={{ minWidth: '300px', maxWidth: '300px' }} >Full Name</Typography>
                    <Typography style={{ minWidth: '300px', maxWidth: '300px' }} >Email</Typography>
                    <Typography style={{ minWidth: '100px', maxWidth: '100px' }}>Country</Typography>
                    <Typography style={{ minWidth: '200px', maxWidth: '200px' }}>Role</Typography>
                    <Typography style={{ minWidth: '100px', maxWidth: '100px' }}>Enabled</Typography>
                    <Typography>More</Typography>
                </div>


                {stateUsers == undefined || stateUsers.length <= 0 ? <Typography variant='h5' style={{ fontWeight: 'bolder', margin: '10px' }}>Oops! its empty here</Typography> : stateUsers.map((user, idx) => <>

                    <div style={{ display: 'flex', alignItems: 'center', margin: '0px', padding: '0px' }}>
                        <Checkbox style={idx % 2 == 0 ? { color: 'black', width: '50px' } : { color: 'black', width: '50px' }} />
                        <Typography style={{ minWidth: '300px', maxWidth: '300px' }} className={idx % 2 ? classes.gridItemDataEven : classes.gridItemDataOdd}>{user.firstName} {user.lastName}</Typography>
                        <Typography style={{ minWidth: '300px', maxWidth: '300px' }} className={idx % 2 ? classes.gridItemDataEven : classes.gridItemDataOdd}>{user.email}</Typography>
                        <Typography style={{ minWidth: '100px', maxWidth: '100px' }} className={idx % 2 ? classes.gridItemDataEven : classes.gridItemDataOdd}>{user.country}</Typography>
                        <Typography style={{ minWidth: '200px', maxWidth: '200px' }} className={idx % 2 ? classes.gridItemDataEven : classes.gridItemDataOdd}>{user.role}</Typography>
                        <Checkbox size='small' checked={!user.isAccountDisabled} className={idx % 2 ? classes.gridItemDataEven : classes.gridItemDataOdd} style={idx % 2 == 0 ? { borderRadius: '0px', color: 'white', minWidth: '100px', maxWidth: '100px', padding: '7px' } : { borderRadius: '0px', color: 'black', minWidth: '100px', maxWidth: '100px', padding: '7px' }} />
                        <ReadMore fontSize='large' style={{ alignSelf: 'center', flexGrow: '1', justifySelf: 'center' }} className={idx % 2 ? classes.gridItemDataEven : classes.gridItemDataOdd} />
                    </div>
                </>)}
            </div>
            <TablePagination
                size='medium'
                style={{ margin: '10px 0px' }}
                component="div"
                count={totalCount}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}

export default UsersView