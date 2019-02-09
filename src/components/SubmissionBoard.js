import React from 'react';
import Paper from "@material-ui/core/Paper";
import { withStyles } from '@material-ui/core/styles';

const styles = {
  boardContainer: {
    display: "flex",
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  message: {
    width: '90%'
  },
  paperContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "5em",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  paper: {
    paddingTop: '1em',
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  messageHeader: {
    display: 'flex',
    justifyContent: 'space-between'
  }
};

const MessageList = props => {
  const { submissionBoard, users, classes } = props;

  const messages = submissionBoard.map(submission => {
    const { message, user, date } = submission;
    const username = users.find(x => x._id === user)
    const messageDate = new Date(date)
    return <Paper className={classes.paper}>
      <div style={{ width: "80%" }}>
        <div className={classes.messageHeader}>
          <div>
            <strong>User:</strong> {username && username.name}
          </div>
          <div>
            <strong>Date:</strong> {messageDate.toDateString()} {messageDate.toLocaleTimeString('en-US')}
          </div>
        </div>
        <p>
          <strong>Message:</strong> {message}
        </p>
      </div>
    </Paper>
  })

  return <div>
    <div className={classes.boardContainer}>
      <h2> Submission Board </h2>
      {messages}
    </div>
  </div>
}

export default withStyles(styles)(MessageList);