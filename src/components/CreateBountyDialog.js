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

const styles = {
  appBar: {
    position: 'relative',
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
  };

  componentDidMount = () => {
    console.log(this.props)
    if (this.props._id) {
      this.setState({
        title: this.props.title,
        description: this.props.description
      })
    }
  }
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


  createBounty = (title, description) => {
    const body = {
      title: title,
      message: description,
      status: "PENDING"
    }


    fetch(this.props._id ? `/api/bounties/${this.props._id}` : `/api/bounties`, {
      method: this.props._id ? "PUT" : "POST",
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
    const { classes } = this.props;
    return (
      <div>
        {this.props.menuItem ?
          <MenuItem onClick={this.handleClickOpen}>{this.props.label}</MenuItem> :
          <Button onClick={this.handleClickOpen}>{this.props.label}</Button>}

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
                description={this.state.description}
                appBar
                fullScreen={false}
                color="inherit"
                completeBounty={this.createBounty}
                onClick={this.handleClose} />
            </Toolbar>
          </AppBar>

          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="outlined-uncontrolled"
              label="Title"
              defaultValue={this.props.title}
              className={classes.textField}
              onChange={this.handleChange('title')}
              margin="normal"
              variant="outlined"
            />

            <Divider />

            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              defaultValue={this.props.description}
              multiline
              rowsMax="25"
              value={this.state.multiline}
              onChange={this.handleChange('description')}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <SubmitBountyDialog
              bountyId={this.props.bountyId}
              title={this.state.title}
              description={this.state.description}
              fullScreen={false}
              completeBounty={this.createBounty}
              onClick={this.handleClose} />

          </form>

        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);