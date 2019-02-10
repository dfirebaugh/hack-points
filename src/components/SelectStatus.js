import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
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
  }
});

class SimpleSelect extends React.Component {
  state = { status: '' }
  componentDidMount() {
    this.setState({
      status: this.props.bountyStatus
    })
  }

  handleChange = event => {
    this.setState({ status: event.target.value });
    fetch(`/api/bounties/${this.props.bountyId}`, {
      method: 'PUT',
      headers: new Headers({
        'Authorization': 'Bearer ' + Auth.getToken(),
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        status: event.target.value
      })
    })
  };

  render() {
    const { classes } = this.props;
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
            <MenuItem value={"COMPLETED"}>Completed</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);