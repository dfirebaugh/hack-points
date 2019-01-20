import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';

class RegisterPopover extends React.Component {
  state = {
    anchorEl: null,
    name: null,
  };
  handleChange = name => event => {
    console.log(event.target.value)
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const { classes, handleRegister } = this.props;
    const { anchorEl, name } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div style={{ width: "100%" }}>
        <Button
          // aria-owns={open ? 'simple-popper' : undefined}
          // aria-haspopup="true"
          className={classes.button}
          variant="contained"
          color="primary"
          disableRipple
          onClick={this.handleClick}
        >
          Register
        </Button>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >

          <MenuItem className={classes.menuItem} disableRipple>
            Enter Your Name
          </MenuItem>
          <MenuItem className={classes.menuItem} disableRipple>
            <TextField
              className={classes.inputs}
              onChange={this.handleChange("name")}
              label="name"
              name="name"
              type="text"
              autoComplete="name"
            // onKeyPress={props.handleKeyPress}
            />
          </MenuItem>
          <MenuItem className={classes.menuItem} disableRipple>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disableRipple
              onClick={() => handleRegister(name)}>
              Register
              </Button>
          </MenuItem>
        </Popover>
      </div>
    );
  }
}

const UserLogin = props => {
  const { classes, handleSubmit, handleChange, handleRegister, username, password } = props;
  return (
    <Grid container justify="center">
      <Grid item>
        <Paper className={classes.paper}>

          <img alt="hackrva-robot" className={classes.logo} src="/Hackrobot.jpg" />
          <div onKeyPress={props.handleKeyPress}>
            <MenuItem className={classes.menuItem} disableRipple>
              <TextField
                className={classes.inputs}
                value={username}
                onChange={handleChange("username")}
                label="username"
                name="username"
                type="text"
                autoComplete="username"
              // onKeyPress={props.handleKeyPress}
              />
            </MenuItem>
            <MenuItem className={classes.menuItem} disableRipple>
              <TextField
                className={classes.inputs}
                value={password}
                onChange={handleChange("password")}
                label="password"
                type="password"
                autoComplete="password"
              // onKeyPress={props.handleKeyPress}
              />
            </MenuItem>

            <MenuItem className={classes.menuItem} disableRipple>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                disableRipple
                onClick={handleSubmit}>
                Login
              </Button>
            </MenuItem>
            <MenuItem className={classes.menuItem} disableRipple>
              <RegisterPopover
                classes={classes}
                handleRegister={handleRegister}
                email={username}
                password={password}
              />
            </MenuItem>
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default UserLogin;