import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from "@material-ui/core";
import CreatePrescription from "../Prescription/CreatePrescription";

const useStyles = (theme) => ({
    form: {
        minWidth: '300px'
    }
});


class FormDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleClickOpen() {
        this.setState({
            open: true
        })
    };

    handleClose() {
        this.props.action(false);
        this.setState({
            open: false
        })
    };


    render() {
        const {classes} = this.props;
        return (
            <div>
                <Dialog maxWidth="md" fullWidth={true} open={this.state.open} onClose={this.handleClose}
                        aria-labelledby="form-dialog-title">
                    <DialogContent>
                        <CreatePrescription action={this.props.action} prescriptionId={this.props.prescriptionId}/>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(useStyles)(FormDialog);

