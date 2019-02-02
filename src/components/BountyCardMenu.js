import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CreateBountyDialog from './CreateBountyDialog';
import DeleteBountyDialog from './DeleteBountyDialog';
import CompleteBountyDialog from './CompleteBountyDialog';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>

        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <CompleteBountyDialog
            label="Complete"
            menuItem
            title={this.props.title}
            fetchBounties={this.props.fetchBounties}
            description={this.props.message}
            {...this.props}
          />
          {/* <MenuItem onClick={this.handleClose}>Complete</MenuItem> */}
          <CreateBountyDialog
            label="Edit"
            menuItem
            title={this.props.title}
            fetchBounties={this.props.fetchBounties}
            description={this.props.message}
            {...this.props}
          />
          <DeleteBountyDialog handleSnack={this.props.handleSnack}
            fetchBounties={this.props.fetchBounties} id={this.props._id} />
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;