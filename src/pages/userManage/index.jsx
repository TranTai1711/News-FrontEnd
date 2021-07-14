import { Avatar, Button, Container, Grid, TableHead, TextField, CircularProgress } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { SearchRounded } from '@material-ui/icons';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { GlobalState } from '../../GlobalState'


const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    top: {
        marginTop: '20px'
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    }
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};



const columns = [
    { id: 'email', label: 'Email' },
    { id: 'password', label: 'Password' },
    { id: 'name', label: 'Name' },
    { id: 'role', label: 'Role' },
    { id: 'createdAt', label: 'Date created' },
    { id: 'action', label: 'Action', align: 'center' },
];

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

export default function UserManage() {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [isLoading, setIsLoading] = useState(false);

    const [users, setUsers] = useState([]);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        setIsLoading(true)
        axios.get('/user/users')
            .then(res => {
                console.log({ res });
                setUsers(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err.message))
    }, [])

    const handelOnDelete = (id) => {
        axios.delete(`/api/posts/${id}`)
            .then(res => {
                setUsers(users.filter(item => (item._id !== id)))
            })
            .catch(err => console.log(err.message));
    }




    return (
        <Container
            style={{ marginTop: '20px' }}
        >
            {isLoading ? (
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    style={{ minHeight: '500px' }}
                >
                    <CircularProgress />
                </Grid>
            ) : (
                <Fragment>

                    <Grid
                        container
                        direction='row'
                        justifyContent='space-between'
                        spacing={3}
                    >
                        <Grid
                            item
                        >
                            <h2>User Manage</h2>
                        </Grid>
                        <Grid >
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <SearchRounded />
                                </Grid>
                                <Grid item>
                                    <TextField id="input-with-icon-grid" label="Search" />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                        <Table className={classes.table} aria-label="custom pagination table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : users
                                ).map((row) => (
                                    <TableRow key={row._id}>
                                        <TableCell component="th" scope="row">
                                            {row.email}
                                        </TableCell>
                                        <TableCell>
                                            {row.password}
                                        </TableCell>
                                        <TableCell>
                                            {row.name}
                                        </TableCell>
                                        <TableCell>
                                            {row.role === 1 ? ("Admin") : ("Customer")}
                                        </TableCell>
                                        <TableCell>
                                            {moment(row.createdAt).format('l')}
                                        </TableCell>
                                        <TableCell
                                            align='center'
                                        >
                                            <Button
                                                variant='outlined'
                                                color='secondary'
                                                onClick={() => handelOnDelete(row._id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        count={users.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Fragment>
            )}
        </Container>
    );
}
