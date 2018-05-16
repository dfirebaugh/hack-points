import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import Theme from '../components/Theme';
import NavMenu from '../components/NavMenu';
import Bounty from '../components/Bounty';






class AddBounty extends Component {

    render() {

        return (
            <Theme>
                <NavMenu />
                <div className='add-bounty-container'>
                    <Bounty />
                </div>
                <style jsx>{`
              .add-bounty-container {
                padding: 15px;
              }
              .add-bounty-container div{
                  padding:15px;
              }
              `
                }
                </style>
            </Theme>
        )
    }
}



export default AddBounty;
