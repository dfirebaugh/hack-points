import React, { Component } from 'react';
import TopNav from './TopNav';

class Bounty extends Component {
  constructor(props) {
    super(props);

    this.state = { userInfo: { hackPoints: {}, points: 0, slack: { user: {} } } }

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.getUser();
  }
  handleSubmit = (event) => {
    console.log('submit')
    console.log(this.title.value)
    console.log(this.message.value)
    let that = this;
    event.preventDefault();
    fetch('http://localhost:8080/api/v1/bounties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({
        "title": that.title.value,
        "message": that.message.value,
        "status": 'PENDING',
        "pointValue": this.minutes.value,
        "completedBy": '',
        "createdBy": that.state.userInfo.slack.displayName,
        "createdIcon": that.state.userInfo.slack.user.image_48
      })
    })
      .then(function (response) {
        this.cleanForm();
      });
  }
  cleanForm = () => {
    document.getElementById('bountyTitle').value = '';
    document.getElementById('bountyMessage').value = '';
    document.getElementById('bountyMinutes').value = '';
  }

  getUser() {
    let that = this;
    return fetch(`http://localhost:8080/api/v1/`, { credentials: 'same-origin' })
      .then((response) => response.json())
      .then((responseJson) => {
        that.setState({ points: responseJson.hackPoints })
        that.setState({ userInfo: responseJson })
      })
      .catch((error) => {
        console.error(error);
      });
    }


  render() {
    
    let textAreaStyle = {
      height: '14em'
    }
    let formStyle = {
      width: '80%',
      marginLeft: '90px'
    }
    return (
      <div className="container">
        <TopNav />
        <div className="jumbotron">
          <form id='bountyForm' onSubmit={this.handleSubmit} style={formStyle} >
            <fieldset>
              <div className="form-group">
                <label for="inputForTitle">Bounty Title</label>
                <input ref={(ref) => { this.title = ref }} type="title" className="form-control" id="bountyTitle" aria-describedby="bountyTitle" placeholder="Bounty Title"></input>

              </div>
              <div className="form-group">
                <label for="inputForTitle">Estimated time to complete(in minutes)</label>
                <input ref={(ref) => { this.minutes = ref }} type="title" className="form-control" id="bountyMinutes" aria-describedby="bountyMinutes" placeholder="minutes"></input>

              </div>
              <div className="form-group">
                <label for="bountyInformation">Bounty Information</label>
                <textarea ref={(ref) => { this.message = ref }} style={textAreaStyle} className="form-control" id="bountyMessage" rows="3"></textarea>
              </div>




              <button type="submit" className="btn btn-dark">Submit</button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default Bounty;