import React from 'react';
import Login from './LoginDrawer';
import Auth from '../services/Auth';
import { checkPropTypes } from 'prop-types';


const MustLogin = props => {
  const handleLogin = (email, password) => {
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
          props.action()
        })
    }
  }
  return (
    <div>
      you must login to see this

    {/* <Login
        label="Login"
        menuItem
        handleLogIn={handleLogin} /> */}

    </div>
  )
}

export default MustLogin;