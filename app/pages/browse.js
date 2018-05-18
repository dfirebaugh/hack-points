import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import Theme from '../components/Theme';
import NavMenu from '../components/NavMenu';
import BountyCard from '../components/BountyCard';





class Browse extends Component {
  constructor(props) {
    super(props)
    this.state = { bounties: [], userInfo: { slack: { displayName: '', id: '' }, user: { role: "" } }, showStatus: 'PENDING' }

    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.getBounties()
  }
  getBounties() {
    fetch(`http://localhost:8080/api/v1/bounties/`, { credentials: 'same-origin' })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ bounties: responseJson })
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // getUser() {
  //   fetch(`http://localhost:8080/api/v1/`, { credentials: 'same-origin' })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       console.log(responseJson)
  //       this.setState({
  //         points: responseJson.hackPoints,
  //         // userInfo: responseJson.user
  //       })
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }
  handleClick(e) {
    console.log(e.target.id)
    this.setState({ showStatus: e.target.id })
  }
  render() {

    const filterByStatus = item => {
      if (item.status === this.state.showStatus) {
        return true
      }
      else {
        return false
      }
    }

    const bounties = this.state.bounties.filter(filterByStatus).map((bounty, index) => {
      if (bounty.createdBy == this.state.userInfo.slack.displayName) {
        bounty.isAuthor = true;
      }
      else {
        bounty.isAuthor = false;
      }
      return <BountyCard
                key={index}
                message={bounty.message}
                title={bounty.title}
                id={bounty._id}
                isAuthor={bounty.isAuthor}
                status={bounty.status}
                createdIcon={bounty.createdIcon}
                pointValue={bounty.pointValue}
                role={this.state.userInfo.user.role}
                createdBy={bounty.createdBy}
                currUserId={this.state.userInfo.slack.id}
                currUser={this.state.userInfo.slack.displayName}
                />
    })



    return (
      <Theme>
        <NavMenu />
        <button
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
            </button>

        <div className='bounty-container'>
          {bounties}
        </div>
        <style jsx>{`
              .bounty-container {
                padding: 15px;
              }
              .bounty-container div{
                  margin:15px;
              }
              `
        }
        </style>
      </Theme>
    )
  }
}



export default Browse;
