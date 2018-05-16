import React, { Component } from 'react';
import BountyCard from './BountyCard.js';


class AllBounties extends Component {
  constructor(props) {
    super(props)
    this.state = { bounties: [], userInfo: { slack: { displayName: '', id: '' }, user: { role: "" } }, showStatus: 'PENDING' }

    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.getBounties();
    this.getUser();
  }
  getBounties() {
    let that = this;
    return fetch(`http://localhost:8080/api/bounties/`, { credentials: 'same-origin' })
      .then((response) => response.json())
      .then((responseJson) => {
        that.setState({ bounties: responseJson })
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });

  }
  getUser() {
    let that = this;
    return fetch(`http://localhost:8080/api/`, { credentials: 'same-origin' })
      .then((response) => response.json())
      .then((responseJson) => {
        that.setState({ points: responseJson.hackPoints })
        that.setState({ userInfo: responseJson })
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  update(currUser, id, operation) {
    // console.log('callback',currUser,id,operation)
  }
  handleClick(e) {
    // console.log(e.target.id)
    this.setState({ showStatus: e.target.id })


  }
  render() {
    let that = this;
    let bounties = this.state.bounties.filter(filterByStatus).map((bounty, index) => {
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
        callback={this.update.bind(this)}
      />
    })

    function filterByStatus(item) {
      console.log(item.status)
      if (item.status === that.state.showStatus) {
        return true
      }
      else {
        return false
      }

    }


    return (
      <div>
        <div className="container">
          <div className="bountyView">

            <button id='PENDING' type="button" className="btn btn-dark" onClick={this.handleClick}>Pending</button>
            <button id='COMPLETED' type="button" className="btn btn-success" onClick={this.handleClick}>Completed</button>

            {bounties}
          </div>
        </div>
      </div>
    );
  }
}

export default AllBounties;
