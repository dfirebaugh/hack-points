import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import red from '@material-ui/core/colors/red';
import withMobileDialog from '@material-ui/core/withMobileDialog';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  danger: {
    background: red[500],
    color: 'white'
  }
});

class ResponsiveDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, fullScreen } = this.props;

    return (
      <div>
        <MenuItem onClick={this.handleClickOpen}>Delete</MenuItem>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle
            id="responsive-dialog-title">
            {
              "Are you absolutely sure that you want to delete this?"
            }
          </DialogTitle>
          <DialogContent>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} className={classes.button} color="secondary" autoFocus>
              CANCEL
            </Button>
            <Button onClick={this.handleClose} className={classes.danger} color="secondary" autoFocus>
              DELETE
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withMobileDialog()(ResponsiveDialog));