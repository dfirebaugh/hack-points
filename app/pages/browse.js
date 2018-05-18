import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import Theme from '../components/Theme';
import NavMenu from '../components/NavMenu';
import BountyBoard from '../components/BountyBoard';

class Browse extends Component {
  
  
  render() {
    return (
      <Theme>
        <NavMenu />
        {/* <button
          id='PENDING'
          type="button"
          className="btn btn-dark"
          onClick={this.handleClick}>
          Pending
            </button>

        <button
          id='COMPLETED'
          type="button"
          className="btn btn-success"
          onClick={this.handleClick}>
          Completed
            </button> */}

        <BountyBoard /> 

        <style jsx>{`
              
              `
        }
        </style>
      </Theme>
    )
  }
}



export default Browse;
