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
import UserLogin from './UserLogin';


const styles = theme => ({
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
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    width: 400,
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 6}px ${theme
      .spacing.unit * 3}px ${theme.spacing.unit * 3}px `
  },
  button: {
    width: "100%"
  },
  inputs: {
    width: "100%"
  },
  menuItem: {
    width: "100%",
    marginBottom: 8,
    paddingLeft: 12
  },
  form: {
    width: "100%"
  },
  avatar: {
    marginBottom: 12
  },
  logo: {
    width: "45%"
  }
});

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

  handleSubmit = () => {
    this.props.handleLogIn(this.state.username, this.state.password)
    this.handleClose()
    // console.log(this.state.username, this.state.password)
  }
  handleRegister = name => {
    this.props.handleRegister(this.state.username, this.state.password, name)
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

          <UserLogin
            classes={classes}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleRegister={this.handleRegister} />


        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);

