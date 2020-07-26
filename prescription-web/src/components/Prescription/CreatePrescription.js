import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {withStyles} from "@material-ui/core";
import UserActions from "../service/UserActions";
import AlertMassage from "../common/AlertMassage";
import Container from "@material-ui/core/Container";
import {getResponse} from "../common/Utils";

const useStyles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 350,
    },
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


class CreatePrescription extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prescription: {
                prescriptionDate: '',
                patientName: '',
                patientAge: '',
                patientGender: 'MALE',
                diagnosis: '',
                medicines: '',
                nextVisitDate: '',
            },
            showAlert: null
        };

        this.onChange = this.onChange.bind(this);
        this.makeAlert = this.makeAlert.bind(this);
        this.setAlertState = this.setAlertState.bind(this);
        this.prescriptionHandler = this.prescriptionHandler.bind(this);
        this.updatePrescriptionHandler = this.updatePrescriptionHandler.bind(this);
        this.getPrescriptionInfo = this.getPrescriptionInfo.bind(this);
    };


    componentDidMount() {
        if (this.props.prescriptionId) {
            this.getPrescriptionInfo()
        }
    };

    getPrescriptionInfo() {
        UserActions.getPrescription(this.props.prescriptionId)
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


    onChange(e) {
        this.setState({
            prescription: {
                ...this.state.prescription,
                [e.target.name]: e.target.value
            }
        });
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

    prescriptionHandler(e) {
        e.preventDefault();
        const payload = {
            ...this.state.prescription
        };
        console.log(payload)
        UserActions.createPrescription(payload)
            .then(response => {
                let message = "Successfully Prescription Created ";
                this.makeAlert('success', message);
                this.setState({
                    prescription: {
                        prescriptionDate: '',
                        patientName: '',
                        patientAge: '',
                        patientGender: 'MALE',
                        diagnosis: '',
                        medicines: '',
                        nextVisitDate: '',
                    }
                })
            })
            .catch(err => {
                let message = (err && err.response && err.response.data) ? getResponse(err.response.data) : err.message;
                this.makeAlert('error', message);
            })
    };

    updatePrescriptionHandler(e) {
        e.preventDefault();
        const payload = {
            ...this.state.prescription
        };
        console.log(payload)
        UserActions.updatePrescription(this.props.prescriptionId, payload)
            .then(response => {
                let message = "Successfully Prescription Updated ";
                this.makeAlert('success', message);
                /*   this.props.action(false);*/
                this.getPrescriptionInfo();
            })
            .catch(err => {
                let message = (err && err.response && err.response.data) ? getResponse(err.response.data) : err.message;
                this.makeAlert('error', message);
            })
    };

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <CssBaseline/>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Prescription
                        </Typography>
                        <br/>
                        <React.Fragment>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="date"
                                        name="prescriptionDate"
                                        value={this.state.prescription.prescriptionDate}
                                        onChange={this.onChange}
                                        label="Prescription Date"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="date"
                                        name="nextVisitDate"
                                        value={this.state.prescription.nextVisitDate}
                                        onChange={this.onChange}
                                        label="Next Visiting Date"
                                        type="date"
                                        defaultValue="2017-05-24"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="patientName"
                                        name="patientName"
                                        value={this.state.prescription.patientName}
                                        onChange={this.onChange}
                                        label="Patient Name"
                                        fullWidth
                                        autoComplete="on"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="Age"
                                        name="patientAge"
                                        value={this.state.prescription.patientAge}
                                        onChange={this.onChange}
                                        type="number"
                                        label="Patient Age"
                                        fullWidth
                                        autoComplete="on"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="patientGender"
                                            value={this.state.prescription.patientGender}
                                            onChange={this.onChange}
                                        >
                                            <MenuItem value="MALE">Male</MenuItem>
                                            <MenuItem value="FEMALE">Female</MenuItem>
                                            <MenuItem value="OTHER">Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="diagnosis"
                                        name="diagnosis"
                                        value={this.state.prescription.diagnosis}
                                        onChange={this.onChange}
                                        label="Diagnosis"
                                        fullWidth
                                        autoComplete="on"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="medicines"
                                        name="medicines"
                                        value={this.state.prescription.medicines}
                                        onChange={this.onChange}
                                        label="Medicines"
                                        fullWidth
                                        autoComplete="on"
                                    />
                                </Grid>
                                {this.props.prescriptionId ?


                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.updatePrescriptionHandler}
                                        className={classes.button}
                                    >Update</Button>

                                    :


                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.prescriptionHandler}
                                        className={classes.button}
                                    >Save</Button>


                                }
                            </Grid>
                        </React.Fragment>
                    </Paper>
                </main>
                {this.state.showAlert ? <AlertMassage showAlert={this.setAlertState}
                                                      message={[this.state.showAlert.key, this.state.showAlert.message]}/> : null}

            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(CreatePrescription);
