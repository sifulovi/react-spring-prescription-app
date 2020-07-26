import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import UserActions from "../service/UserActions";
import ItemList from "./ItemList";


const useStyles = (theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
});

class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prescription: [],
            prescriptionDate: '',
            showList: false
        };
        this.onChange = this.onChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    };

    onChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    };

    handleSearch(e) {
        e.preventDefault();
        console.log(this.state);
        let payload = {
            prescriptionDate: this.state.prescriptionDate
        };
        UserActions.getPrescriptionsByDate(payload)
            .then(resp => {
                this.setState({
                    prescription: resp.data,
                    showList: true
                })
            })
            .catch(err => {
                console.log(payload)
            })
    };

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <CssBaseline/>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>

                        <React.Fragment>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="date"
                                        name="prescriptionDate"
                                        value={this.state.prescriptionDate}
                                        onChange={this.onChange}
                                        label="Prescription Date"
                                        type="date"
                                        defaultValue="2020-05-24"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleSearch}
                                    className={classes.button}
                                >Search</Button>
                            </Grid>
                        </React.Fragment>
                    </Paper>
                </main>
                {this.state.showList ? <ItemList prescription={this.state.prescription}/> : null}
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(Report);
