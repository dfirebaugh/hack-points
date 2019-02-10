import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../services/Auth';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import SubmitBountyDialog from './SubmitBountyDialog';
import SubmissionBoard from './SubmissionBoard';
import SelectStatus from './SelectStatus';

const styles = {
  appBar: {
    position: 'relative',
    marginBottom: "2em"
  },
  flex: {
    flex: 1,
  },
  container: {
    // width: '80vw',
    // display: 'flex'
    paddingLeft: '8vw'
  },
  textField: {
    margin: '2vh',
    marginRight: '6vw',
    width: '80vw',
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  state = {
    open: false,
    message: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.fetchBounties();
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  completeBounty = () => {
    const body = {
      message: this.state.message,
      status: "SUBMITTED"
    }

    fetch(`/api/bounties/${this.props._id}/submit`, {
      method: "PUT",
      headers: {
        'Authorization': `bearer ${Auth.getToken()}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        this.handleClose()
        return response.json();
      })
      .then(data => {
        this.props.handleSnack(data.message)
      })
  }

  render() {
    const { classes, btnClass, status, bountyId, currentUser, createdBy } = this.props;
    return (
      <div>
        {this.props.menuItem ?
          <MenuItem onClick={this.handleClickOpen}>{this.props.label}</MenuItem> :
          <Button className={btnClass} onClick={this.handleClickOpen}>{this.props.label}</Button>}

        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {this.props.label}
              </Typography>
              <SubmitBountyDialog
                title={this.state.title}
                bountyId={this.props.bountyId}
                description={this.state.message}
                message="Is this message what you want to submit?"
                appBar
                fullScreen={false}
                color="inherit"
                completeBounty={this.completeBounty}
                onClick={this.handleClose} />
            </Toolbar>
          </AppBar>

          {currentUser.id === createdBy.id && <SelectStatus bountyId={bountyId} bountyStatus={status} />}
          <form className={classes.container} noValidate autoComplete="off">

            So you've completed the bounty? Enter a message so that the creator of the bounty can approve.

            <TextField
              id="outlined-multiline-flexible"
              label="Message"
              multiline
              rowsMax="25"
              value={this.state.multiline}
              onChange={this.handleChange('message')}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <SubmitBountyDialog
              title={this.state.title}
              bountyId={this.props.bountyId}
              description={this.state.message}
              message="Is this message what you want to submit?"
              fullScreen={false}
              completeBounty={this.completeBounty}
              onClick={this.handleClose} />
          </form>

          <SubmissionBoard {...this.props} />
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);