import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';


const styles = theme => ({
  submitTop: {
    color: theme.palette.primary.contrastText
  },
  submitBottom: {
    color: theme.palette.thirdary.contrastText
  }
})

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
  handleSubmit = () => {
    this.handleClose()
    this.props.completeBounty(this.props.title, this.props.description)
  }

  render() {
    const { fullScreen, classes, bountyId } = this.props;
    const menuType = bountyId ? "edit" : "create"

    return (
      <div>
        <Button className={this.props.appBar ? classes.submitTop : classes.submitBottom} onClick={this.handleClickOpen}>Submit</Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {
              this.props.message ? this.props.message :
                `Are you sure you want to ${menuType} this bounty?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText style={{
              display: "flex",
              flexWrap: 'wrap',
              width: '12em'
            }}>
              {
                this.props.message ? this.props.description :
                  <div>
                    <span>
                      Title: {this.props.title}
                    </span>
                    <span>
                      Description: {this.props.description}
                    </span>
                  </div>
              }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              No
            </Button>
            <Button onClick={this.handleSubmit} color="primary" autoFocus>
              Yes
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
