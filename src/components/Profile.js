import React from 'react';
import MustLogin from './MustLogin';
import Auth from '../services/Auth';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  container: {
    paddingLeft: '8vw'
  },
  textField: {
    margin: '2vh',
    marginRight: '6vw',
    width: '80vw',
  },
  paperContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "5em"
  },
  paper: {
    width: "300px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  profileImage: {
    marginTop: "2em"
  }
};

class Profile extends React.Component {
  componentDidMount = () => {
    fetch(`/api/users/me/`, {
      headers: new Headers({
        'Authorization': `bearer ${Auth.getToken()}`,
        "Content-Type": "application/json"
      })
    })
      .then(response => {
        if (response.status === 401) {
          this.setState({ unauthenticated: true })
        }
        else {
          return response.json()
        }
      })
      .then(responseJson => {
        this.setState({
          userInfo: responseJson,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleAuthenticate = () => {
    console.log('hello')
    this.setState({ unauthenticated: false })
  }

  render = () => {
    return (
      <div className={this.props.classes.paperContainer}>
        {this.state && (

          <Paper className={this.props.classes.paper}>
            {!this.state.unauthenticated ?
              <div className="container jumbotron">
                <div className="github-profile">
                  <img alt="user-img" src={this.state.userInfo.img} className={this.props.classes.profileImage} />
                  <p>Display Name: {this.state.userInfo.name}</p>
                  <p>Email: {this.state.userInfo.email}</p>
                  <p>Points: {this.state.userInfo.hackPoints} </p>
                </div>
              </div> :
              <MustLogin action={this.handleAuthenticate} />
            }
          </Paper>
        )}
      </div>
    );
  };
}


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  createBounty = () => {
    console.log(this.state.title, this.state.description)
    this.handleClose()
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
            </Toolbar>
          </AppBar>

          <Profile classes={classes} />

        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);

