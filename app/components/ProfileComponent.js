import React, { Component } from 'react';

class ProfileComponent extends Component {
  render() {
    const { imgIcon, displayName, email, points, userInfo } = this.props;

    return (
      <div>
        <div className="container jumbotron">
          <div className="github-profile">
          <img src={imgIcon} />
          <p>Display Name: {displayName}</p>
          <p>Email: {email}</p>
          <p>Points: {points} </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileComponent;
