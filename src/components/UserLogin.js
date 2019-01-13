import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';

const UserLogin = props => {
  const { classes, handleSubmit, handleChange, username, password } = props;
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
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default UserLogin;