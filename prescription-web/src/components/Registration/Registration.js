import React, {Component} from 'react';
import UserActions from "../service/UserActions";
import {withStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Link} from "react-router-dom";
import {getResponse} from "../common/Utils"
import AlertMassage from "../common/AlertMassage";


const useStyles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                fullName: '',
                password: '',
                email: ''
            },
            showAlert: null,
        }
        this.onChange = this.onChange.bind(this);
        this.registrationHandler = this.registrationHandler.bind(this);

        this.makeAlert = this.makeAlert.bind(this);
        this.setAlertState = this.setAlertState.bind(this);
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

    registrationHandler(e) {
        e.preventDefault();
        const payload = {
            ...this.state.user
        }
        UserActions.registerUser(payload)
            .then(response => {
                let message = "Successfully User Registered"
                this.makeAlert('success', message);
                setTimeout(() => {
                    this.props.history.push("/");
                }, 3000);
            })
            .catch(err => {
                let message = (err && err.response && err.response.data) ? getResponse(err.response.data) : err.message;
                this.makeAlert('error', message);
            })
    };

    onChange(e) {
        this.setState({
            user: {
                ...this.state.user,
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

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="fullName"
                                        label="Full Name"
                                        name="fullName"
                                        onChange={this.onChange}
                                        autoComplete="fName"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        onChange={this.onChange}
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        onChange={this.onChange}
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.registrationHandler}
                            >
                                Sign Up
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link to="/" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
                {this.state.showAlert ? <AlertMassage showAlert={this.setAlertState}
                                                      message={[this.state.showAlert.key, this.state.showAlert.message]}/> : null}

            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(Registration);
