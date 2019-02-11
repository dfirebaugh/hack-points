import React from 'react';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import baseTheme from "./themes/baseTheme";
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import BountyCard from './components/BountyCard';
import CreateBountyDialog from './components/CreateBountyDialog';
import Profile from './components/Profile';
import Login from './components/LoginDrawer';
import fakeData from './fakeData';
import Auth from './services/Auth';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    zIndex: 1,
    overflowY: 'scroll',
    position: 'relative',
    display: 'flex',
    width: '100vw',
    height: '100vh',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
  button: {
    margin: theme.spacing.unit,
  },

});

class Index extends React.Component {
  state = {
    open: false,
    snackBarOpen: false,
    profile: false,
    bounties: false,
    users: null,
    token: null,
    currentUser: 'notLoggedIn',
    snackMessage: 'none'
  };
  componentDidMount = () => {
    this.getCurrentUser();
    this.fetchBounties();
    this.fetchUsers();
  };
  getCurrentUser = () => {
    fetch(`/api/users/me/`, {
      headers: new Headers({
        'Authorization': `bearer ${Auth.getToken()}`,
        "Content-Type": "application/json"
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          currentUser: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  fetchBounties = () => {
    // fetch(`/api/users/totalPoints/`, {
    //   credentials: 'same-origin'
    // })
    //   .then(response => {
    //     console.log(response)
    //     response.json()
    //   })
    //   .then(responseJson => {
    //     this.setState({
    //       totalPoints: responseJson,
    //     });
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

    fetch(`/api/bounties/`, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ bounties: responseJson || fakeData })
      })
      .catch(error => {
        console.error(error);
      });
  }

  fetchUsers = () => {
    fetch(`/api/users/`)
      .then(data => data.json())
      .then(response => {
        this.setState({
          users: response,
          loaded: true
        })
      })
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleRegister = (email, password, name) => {
    const registerURI = '/register'
    const postData = {
      email: email,
      password: password,
      name: name
    }

    fetch(registerURI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)

    }).then(() => this.handleSnack('Registered!  Please log in.'))
  }

  handleLogout = () => {
    Auth.logout()
    this.handleSnack('logged out')
    console.log('LoggedOut', Auth.getToken())
  }

  handleLogin = (email, password) => {
    const loginURI = '/login'
    const postData = {
      email: email,
      password: password
    }

    if (!Auth.isAuthenticated()) {
      fetch(loginURI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)

      })
        .then(data => data.json())
        .then(x => {
          this.setState({
            token: x
          })
          Auth.setSession(x)
        }).then(() => this.handleSnack('logged in'))
    }
  }

  handleSnack = (msg, msgType) => {
    this.setState({
      snackBarOpen: true,
      snackMessage: msg,
      snackMessageType: msgType
    })
  }
  handleFilter = value => e => {
    if (value !== 'All') {
      this.setState({
        currFilter: value
      })
    }
    else {
      this.setState({
        currFilter: null
      })
    }
  }

  bountyFilter = x => this.state.currFilter ? x.status === this.state.currFilter : true

  handleSnackClose = () => {
    this.setState({ snackBarOpen: false })
  }
  render() {
    const { classes, theme } = this.props;
    const { open, bounties } = this.state;

    const drawer = (
      <Drawer
        variant="persistent"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>

        <Divider />
        <CreateBountyDialog
          handleSnack={this.handleSnack}
          fetchBounties={this.fetchBounties}
          label="Create A Bounty"
          menuItem />
        <Divider />
        <Profile label="Profile" menuItem />
        <Divider />
        <Login
          label="Login"
          menuItem
          loggedIn={this.state.token !== null}
          handleLogIn={this.handleLogin}
          handleRegister={this.handleRegister} />
        <Divider />
        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
      </Drawer>
    );

    const bountyList = <main
      className={classNames(classes.content, classes[`content-left`], {
        [classes.contentShift]: open,
        [classes[`contentShift-left`]]: open,
      })}
    >
      <div className={classes.drawerHeader} />
      <Typography > Create a Bounty, Complete a Bounty, or Upvote a Bounty </Typography>
      <Typography> Filter:

        <Button color="primary" onClick={this.handleFilter("All")} className={classes.button}>All</Button>
        <Button color="primary" onClick={this.handleFilter("PENDING")} className={classes.button}>Pending</Button>
        <Button color="primary" onClick={this.handleFilter("BLOCKED")} className={classes.button}>Blocked</Button>
        <Button color="primary" onClick={this.handleFilter("COMPLETED")} className={classes.button}>Completed</Button>
      </Typography>
      {this.state.users &&
        <div className={classes.cards}>
          {bounties && bounties.filter(this.bountyFilter).map((x, i) => <BountyCard
            handleSnack={this.handleSnack}
            fetchBounties={this.fetchBounties}
            key={x + i} {...x}
            users={this.state.users}
            currentUser={this.state.currentUser} />)}
        </div>
      }
      <CreateBountyDialog handleSnack={this.handleSnack} fetchBounties={this.fetchBounties} label="Create A Bounty" />
    </main>

    return (
      <MuiThemeProvider theme={baseTheme}>

        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-left`]]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography color="inherit" noWrap>
                Hack Points
            </Typography>
            </Toolbar>
          </AppBar>
          {drawer}
          {bountyList}
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={this.state.snackBarOpen}
            onClose={this.handleSnackClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.snackMessage}</span>}
          />
        </div>
      </MuiThemeProvider>

    );
  }
}
export default withStyles(styles, { withTheme: true })(Index);
