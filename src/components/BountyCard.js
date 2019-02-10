import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BountyCardMenu from './BountyCardMenu';
import Tooltip from '@material-ui/core/Tooltip';
import Auth from '../services/Auth';
import CompleteBountyDialog from './CompleteBountyDialog';
import SelectStatus from './SelectStatus';

const styles = theme => ({
  card: {
    // maxWidth: 400,
    marginBottom: '3vh',
    marginLeft: '2vw',
    marginRight: '4vw'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  completeBtn: {
    color: 'green',
    marginLeft: '1vw',
    width: '100%'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto'
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  collapse: {
  }
});

class BountyCard extends React.Component {
  state = { expanded: false, endorsed: false, endorsements: [] };
  componentDidMount() {
    this.setState({
      endorsed: this.props.endorsements.includes(this.props.currentUser.id),
      endorsements: this.props.endorsements
    })
  }
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleEndorseClick = () => {
    fetch(`api/bounties/${this.props._id}/endorse`, {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Bearer ' + Auth.getToken(),
        'Content-Type': 'application/json'
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          endorsed: data.endorsements.includes(this.props.currentUser.id),
          endorsements: data.endorsements
        })
        this.props.handleSnack(data.message)
      })
  }

  render() {
    const { classes, fetchBounties, currentUser, title, createdBy, img, dateCreated: date, dateCompleted, completedBy, message: description, status, endorsements, users } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={

            <Tooltip title={createdBy.name}>
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {createdBy.name && createdBy.name[0].toUpperCase()}
              </Avatar>
            </Tooltip>
          }
          action={
            <BountyCardMenu {...this.props} />
          }
          title={title}
          subheader={date}
        />



        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton onClick={this.handleEndorseClick} aria-label="Add to favorites">
            {this.state.endorsed ?
              <FavoriteIcon color='primary' /> :
              <FavoriteIcon />
            }
          </IconButton>
          <Typography>
            {this.state.endorsements.length}
            {/* {this.state.endorsed ? endorsements.length + 1 : endorsements.length} */}
          </Typography>

          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography component="p">
              {description}
            </Typography>
            <CompleteBountyDialog
              btnClass={classes.completeBtn}
              label="Complete"
              bountyId={this.props._id}
              title={this.props.title}
              fetchBounties={this.props.fetchBounties}
              description={this.props.message}
              status={status}
              {...this.props}
            />
          </CardContent>
        </Collapse>
        {currentUser.id === createdBy.id && <SelectStatus users={users} bountyId={this.props._id} bountyStatus={status} />}
      </Card>
    );
  }
}

BountyCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BountyCard);
