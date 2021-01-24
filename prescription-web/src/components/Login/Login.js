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
import {getResponse} from "../common/Utils";
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                password: ''
            },
            showAlert: null,
            targetUrl: '/dashboard',
        };
        this.onChange = this.onChange.bind(this);
        this.loginHandler = this.loginHandler.bind(this);

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

    loginHandler(e) {
        e.preventDefault();
        const payload = {
            ...this.state.user
        };
        UserActions.loginUser(payload)
            .then(response => {
                sessionStorage.setItem("email", this.state.user.email);
                sessionStorage.setItem("token", response.data.token);
                let message = "Successfully User Login";
                this.makeAlert('success', message);
                window.location.href =this.state.targetUrl;
            })
            .catch(err => {
                let message = "Invalid Credential";
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

    render() {
        const {classes} = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={this.state.user.email}
                            onChange={this.onChange}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={this.state.user.password}
                            onChange={this.onChange}
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.loginHandler}
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/registration" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                {this.state.showAlert ? <AlertMassage showAlert={this.setAlertState}
                                                      message={[this.state.showAlert.key, this.state.showAlert.message]}/> : null}

            </Container>
        );
    }
}

export default withStyles(useStyles)(Login);
