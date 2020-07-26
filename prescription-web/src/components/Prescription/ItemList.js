import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

const headCells = [
    {id: '0', numeric: false, disablePadding: true, label: ''},
    {id: '1', numeric: false, disablePadding: true, label: 'Prescription Id'},
    {id: '2', numeric: true, disablePadding: false, label: 'Prescription Date'},
    {id: '3', numeric: true, disablePadding: false, label: 'Next Visiting Date'},
    {id: '4', numeric: true, disablePadding: false, label: 'Patient Name'},
    {id: '5', numeric: true, disablePadding: false, label: 'Patient Age'},
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


class ItemList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prescription: []
        };
    };

    componentDidMount() {
        this.setState({
            prescription: this.props.prescription
        });
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
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        );
    }
}

export default withStyles(useStyles)(ItemList);
