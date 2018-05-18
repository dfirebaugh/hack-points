import React, { Component } from 'react';

import TotalPointsBar from './TotalPointsBar';

class NavMenu extends Component {
  render() {
    return (
      <div>
      <TotalPointsBar points={60} goal={800}/>
      <div className='menu-container' >
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
      </div>
    );
  }
}

export default NavMenu;
