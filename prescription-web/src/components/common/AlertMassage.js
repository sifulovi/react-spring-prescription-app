import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {withStyles} from '@material-ui/core/styles';

function ShowAlert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
});

class AlertMassage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            key: props.message[0] ? props.message[0] : 'error',
            message: props.message[1]
        };
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(event, reason) {
        if (reason === "clickaway") {
            return;
        }
        this.props.showAlert(null);
        this.setState({
            open: false,
            message: undefined
        })
    }

    //https://material-ui.com/components/snackbars/
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    key={this.state.message}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                ><ShowAlert onClose={this.handleClose}
                            severity={this.state.key}> {this.state.message}</ShowAlert></Snackbar>
            </div>
        );
    }
}

export default withStyles(styles)(AlertMassage);

