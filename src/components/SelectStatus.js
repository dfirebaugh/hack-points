import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Auth from '../services/Auth';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: "100%"
  },
  completedBy: {
    display: "flex"
  },
  textField: {
    width: "80%"
  },
  submitBtn: {
    width: "20%"
  }
});

class SimpleSelect extends React.Component {
  state = { status: '' }
  componentDidMount() {
    this.setState({
      status: this.props.bountyStatus
    })
  }

  handleUserFilter = user => e => {
    this.setState({
      completedBy: e.target.value,
      users: this.props.users.filter(x => x.name.includes(e.target.value))
    })
  }

  handleUserSelect = userId => e => {
    this.setState({
      users: null,
      completedById: userId,
      completedBy: this.props.users && this.props.users.find(x => x._id === userId).name,
    })
  }

  handleComplete = () => {
    const { completedById } = this.state;
    fetch(`/api/bounties/${this.props.bountyId}/complete`, {
      method: 'PUT',
      headers: new Headers({
        'Authorization': 'Bearer ' + Auth.getToken(),
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        completedById: completedById
      })
    })
  }

  handleChange = event => {
    const { completedBy } = this.state;
    const newStatus = event.target.value;

    this.setState({ status: newStatus });

    if (newStatus !== "TOBECOMPLETED") {
      fetch(`/api/bounties/${this.props.bountyId}`, {
        method: 'PUT',
        headers: new Headers({
          'Authorization': 'Bearer ' + Auth.getToken(),
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          status: newStatus
        })
      })
    }
  };

  render() {
    const { classes } = this.props;

    const completedBy = <div>
      <div className={classes.completedBy}>
        <TextField
          id="completed-name"
          label="Completed By"
          className={classes.textField}
          value={this.state.completedBy}
          onChange={this.handleUserFilter('name')}
          margin="normal" />
        <Button className={classes.submitBtn} onClick={this.handleComplete}>Submit</Button>
      </div>
      {this.state.users && this.state.users.length > 0 && this.state.users.map(x => <MenuItem onClick={this.handleUserSelect(x._id)}> {x.name} </MenuItem>)}
    </div>
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl variant="filled" className={classes.formControl}>
          <Select
            value={this.state.status}
            onChange={this.handleChange}
            input={<FilledInput name="Status" id="filled-age-simple" />}
          >
            <MenuItem value={"PENDING"}>Pending</MenuItem>
            <MenuItem value={"BLOCKED"}>Blocked</MenuItem>
            <MenuItem value={"TOBECOMPLETED"}>Completed</MenuItem>

          </Select>
          {this.state.status === "TOBECOMPLETED" && completedBy}
        </FormControl>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);