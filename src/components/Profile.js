import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
  }
};


class Profile extends React.Component {
  componentDidMount = () => {
    fetch(`${process.env.APP_URL}api/users/me/`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          userInfo: responseJson,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render = () => {
    this.state && console.log(this.state.userInfo);
    return (
      <div>
        {this.state && (
          <div>
            <div className="container jumbotron">
              <div className="github-profile">
                <img src={this.state.userInfo.img} />
                <p>Display Name: {this.state.userInfo.name}</p>
                <p>Email: {this.state.userInfo.email}</p>
                <p>Points: {this.state.userInfo.hackPoints} </p>
              </div>
            </div>
          </div>
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

  componentDidMount() {
    // console.log(this.props.title, this.props.description)
  }
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

          <Profile />

        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);

