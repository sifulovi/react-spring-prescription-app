import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class CustomDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true
        };
        this.handleClickClose = this.handleClickClose.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete() {
        this.props.handleDelete();
        this.handleClickClose()
    }

    handleClickClose() {
        this.props.controller(false);
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"Are you want to sure?"}</DialogTitle>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleClickClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDelete} color="primary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default CustomDialog
