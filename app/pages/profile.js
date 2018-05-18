import React, { Component } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Theme from '../components/Theme';
import "isomorphic-fetch"
import NavMenu from '../components/NavMenu';
import ProfileComponent from '../components/ProfileComponent';


  class Profile extends Component {
    componentWillMount = () => {
      fetch(`http://localhost:8080/api/v1/user`, { credentials: 'same-origin' })
        .then((response) => response.json())
        .then((responseJson) => {

          this.setState({
            userInfo: responseJson
         })
        })
        .catch((error) => {
          console.error(error);
        });
      }


    render = () => {
      this.state && console.log(this.state.userInfo)
      return (
        <Theme>
          <NavMenu />

          {
            this.state &&
          <ProfileComponent
            displayName={this.state.userInfo[0].slack.displayName}
            email={this.state.userInfo[0].slack.user.email}
            points={this.state.userInfo[0].hackPoints}
            imgIcon={this.state.userInfo[0].slack.user.image_48}
            userInfo={this.state.userInfo[0]}
            />
          }
        </Theme>
      )
    }
}

export default Profile;
