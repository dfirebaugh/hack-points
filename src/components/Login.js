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


class Login extends React.Component {

  render() {
    let errorMessage = '';
    if (this.props.errorMessage) {
      errorMessage = (
        <div className="alert alert-danger" role="alert">
          {this.props.errorMessage}
        </div>
      );
    }
    return (
      <div>
        <div className="container">
          <div className="jumbotron login">
            <img className="hackrva-logo" src="/Hackrobot.jpg" />
            <br />
            <div className="login-form row">
              <div className="col-md-3">&nbsp;</div>
              <div className="col-md-6">
                {errorMessage}
                <form action="/auth/local" method="post">
                  <div className="form-group">
                    <label>Email address:</label>
                    <input type="text" name="username" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" className="form-control" />
                  </div>
                  <div className="form-group">
                    <input type="submit" value="Log In" className="form-control" />
                    <br />
                    <a href="/register">or register if you don't have an account yet.</a>
                  </div>
                </form>
              </div>
            </div>

          </div>
          {/* Styling using styled-jsx. */}
          <style jsx>{`
                        .hackrva-logo{
                          width:30%;
                        }
                        .btn {
                        display: flex;
                        justify-content: center;
                        }
                        .btn img{
                            height: 3vh;
                        }
                        .login {
                        // margin: 86px auto 0 auto;
                        text-align: center;
                        }
                    
                    #login-btn {
                        width: 225px;
                        padding: 7px 5px;
                    }
                    
                    .btn p {
                        margin: 8px 0 0 0;
                        padding: 0;
                    }
                    
                    .btn > img {
                        float: left;
                        // margin-left: 10px
                    }
                    /****** Logo Div Styling ******/
                    
                    img {
                        margin: 0 auto;
                        display: block;
                    }
                    
                    .clementine-text { /* Styling for the Clementine.js text */
                        padding: 0;
                        margin: -25px 0 0 0;
                        font-weight: 500;
                        font-size: 60px;
                        color: #FFA000;
                    }`
          }
          </style>
        </div >
      </div>
    );
  }
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

          <Login />

        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);

