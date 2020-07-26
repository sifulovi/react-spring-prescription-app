import React, {Component} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import UserActions from "../service/UserActions";
import CustomDialog from "../common/CustomDialog";
import AlertMassage from "../common/AlertMassage";
import FormDialog from "../common/FormDialog";


const headCells = [
    {id: '0', numeric: false, disablePadding: true, label: ''},
    {id: '1', numeric: false, disablePadding: true, label: 'Prescription Id'},
    {id: '2', numeric: true, disablePadding: false, label: 'Prescription Date'},
    {id: '3', numeric: true, disablePadding: false, label: 'Next Visiting Date'},
    {id: '4', numeric: true, disablePadding: false, label: 'Patient Name'},
    {id: '5', numeric: true, disablePadding: false, label: 'Patient Age'},
    {id: '6', numeric: true, disablePadding: false, label: 'Actions'},
];

const useStyles = (theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
});

class PrescriptionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prescription: [],
            selected: [],
            page: 0,
            rowsPerPage: 5,
            showAlert: null,
            edit: false,
            prescriptionId: '',
            deleteConfirm: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleDeleteDialog = this.handleDeleteDialog.bind(this);
        this.setAlertState = this.setAlertState.bind(this);
        this.makeAlert = this.makeAlert.bind(this);
        this.handler = this.handler.bind(this);
        this.handleCustomDialog = this.handleCustomDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    };

    setAlertState(value) {
        // do not forget to bind getData in constructor
        this.setState({showAlert: value})
    };

    makeAlert(key, message) {
        this.setState({
            showAlert: {
                key: key,
                message: message
            }
        });
    };

    handleClick(event, name) {
        const selectedIndex = this.state.selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(this.state.selected, name);
        } else if (selectedIndex === 0) {
            this.state.selected = newSelected.concat(this.state.selected.slice(1));
        } else if (selectedIndex === this.state.selected.length - 1) {
            this.state.selected = newSelected.concat(this.state.selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            this.state.selected = newSelected.concat(
                this.state.selected.slice(0, selectedIndex),
                this.state.selected.slice(selectedIndex + 1),
            );
        }
        this.setState({
            selected: newSelected
        })

    };

    componentDidMount() {
        this.getList()
    };

    getList() {
        UserActions.getPrescriptions()
            .then(response => {
                this.setState({
                    prescription: response.data
                })
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
    };

    handleCustomDialog(value) {
        this.setState({
            deleteConfirm: value
        })
    }

    handleDeleteDialog(id) {
        this.setState({
            prescriptionId: id,
            deleteConfirm: true
        })

    };

    handleDelete() {
        UserActions.deletePrescriptions(this.state.prescriptionId)
            .then(response => {
                let message = "Successfully Delete Prescription";
                this.makeAlert('success', message);
                this.getList();
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleEdit(id) {
        this.setState({
            edit: true,
            prescriptionId: id
        })
        console.log(id)
    };

    handleChangePage(event, newPage) {
        this.setState({
            page: newPage
        })
    };

    handler(value) {
        this.getList();
        this.setState({
            edit: value
        });
    };

    handleChangeRowsPerPage(event) {
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0
        })
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                            Prescription List
                        </Typography>
                    </Toolbar>
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            aria-label="enhanced table"
                        >
                            <TableHead>
                                <TableRow>
                                    {headCells.map((headCell) => (
                                        <TableCell
                                            key={headCell.id}
                                            align={headCell.numeric ? 'right' : 'left'}
                                            padding={headCell.disablePadding ? 'none' : 'default'}
                                        >
                                            {headCell.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.prescription
                                    .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                    .map((row, index) => {
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow hover>
                                                <TableCell>
                                                </TableCell>
                                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                                    {row.prescriptionId}
                                                </TableCell>
                                                <TableCell align="right">{row.prescriptionDate}</TableCell>
                                                <TableCell align="right">{row.nextVisitDate}</TableCell>
                                                <TableCell align="right">{row.patientName}</TableCell>
                                                <TableCell align="right">{row.patientAge}</TableCell>
                                                <TableCell align="right">
                                                    <ButtonGroup color="primary"
                                                                 aria-label="outlined primary button group">
                                                        <Button
                                                            onClick={() => this.handleEdit(row.prescriptionId)}
                                                        ><EditIcon/></Button>
                                                        <Button
                                                            onClick={() => this.handleDeleteDialog(row.prescriptionId)}><DeleteIcon/></Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={this.state.prescription.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>

                {this.state.showAlert ? <AlertMassage showAlert={this.setAlertState}
                                                      message={[this.state.showAlert.key, this.state.showAlert.message]}/> : null}

                {this.state.edit ? <FormDialog prescriptionId={this.state.prescriptionId} action={this.handler}
                                               openDialog={this.state.edit}/> : null}

                {this.state.deleteConfirm ?
                    <CustomDialog
                        controller={this.handleCustomDialog}
                        handleDelete={this.handleDelete}
                        action={this.handleDeleteDialog}
                        />
                    : null
                }
            </div>
        );
    }
}

export default withStyles(useStyles)(PrescriptionList);

