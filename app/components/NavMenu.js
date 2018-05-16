import React, { Component } from 'react';
// import {Link} from 'react-router-dom';


class NavMenu extends Component {
  render() {
    return (
      <div className='menu-container' >
        {/* Welcome to Hack Points<span id="display-name"></span>! */}
        <a className="menu" href="/">Home</a>
        |
      <a className="menu" href="/browse">Browse</a>
        |
      <a className="menu" href="/add">Add</a>
        |
      <a className="menu" href="/profile">Profile</a>
        |
      <a className="menu" href='/logout'>Logout</a>

        <style jsx>{`
              .menu-container {
                background: black;
                color: grey;
                justify-content: center;
                padding: 15px;
              }
              .menu{
                color:grey;
                padding: 15px;
                font-size:20pt;
              }`
        }
        </style>

      </div>
    );
  }
}

export default NavMenu;
