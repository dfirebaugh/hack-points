import React, { Component } from 'react';

class ProfileComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { userInfo: { hackPoints: {}, points: 0, slack: { user: {} } } }
  }
  componentDidMount() {
    this.getUser()
  }
  getUser() {
    return fetch(`http://localhost:8080/api/v1/`, { credentials: 'same-origin' })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ points: responseJson.hackPoints })
        this.setState({ userInfo: responseJson })
      })
      .catch((error) => {
        console.error(error);
      });

  }
  render() {
    return (
      <div>
        <div className="container jumbotron">
          <div className="github-profile">
            <img src={this.state.userInfo.slack.user.image_48} alt="user logo"></img>
            <p>Display Name: {this.state.userInfo.slack.displayName}</p>
            <p>Email: {this.state.userInfo.slack.user.email}</p>
            <p>Points: {this.state.points} </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileComponent;
