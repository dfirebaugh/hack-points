import React, { Component } from 'react';

class Bounty extends Component {
  componentDidMount = () => {
    this.getUser();
  }
  handleSubmit = (event) => {
    console.log('submit')
    // console.log(this.title.value)
    // console.log(this.message.value)
    // console.log(this.minutes.value)
    // console.log(this.state.userInfo.name)
    // console.log(this.state.userInfo.image)

    // event.preventDefault();
    console.log('submit')
    console.log(this.title.value)
    console.log(this.message.value)
    console.log(this.minutes.value)
    console.log(this.state.userInfo.slack.displayName)

    event.preventDefault();
    fetch('http://localhost:8080/api/v1/bounties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({
        "title": this.title.value,
        "message": this.message.value,
        "status": 'PENDING',
        "pointValue": this.minutes.value,
        "completedBy": '',
        "createdBy": this.state.userInfo.name,
        "createdIcon": this.state.userInfo.img
      })
    })
      .then((response) => {
        this.cleanForm();
      });
  }
  cleanForm = () => {
    document.getElementById('bountyTitle').value = '';
    document.getElementById('bountyMessage').value = '';
    document.getElementById('bountyMinutes').value = '';
  }

  getUser = () => {
    console.log('running')
    fetch(`http://localhost:8080/api/v1/users/currentuser/`, { credentials: 'same-origin' })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          userInfo: responseJson
        })
        // console.log(this.state.userInfo)
      })
      .catch((error) => {
        console.error(error);
      });
    }


  render = () => {
    this.state && console.log('state: ', this.state.userInfo)
    return (
      <div className="container">
        <div className="jumbotron">
          <form id='bountyForm' className="form"  >
            <fieldset>
              <div className="form-group">
                <label>Bounty Title</label>
                <input ref={(ref) => { this.title = ref }} type="title" className="form-control" id="bountyTitle" aria-describedby="bountyTitle" placeholder="Bounty Title"></input>

              </div>
              <div className="form-group">
                <label>Estimated time to complete(in minutes)</label>
                <input ref={(ref) => { this.minutes = ref }} type="title" className="form-control" id="bountyMinutes" aria-describedby="bountyMinutes" placeholder="minutes"></input>

              </div>
              <div className="form-group">
                <label>Bounty Information</label>
                <textarea className="textArea" ref={(ref) => { this.message = ref }} className="form-control" id="bountyMessage" rows="3"></textarea>
              </div>




              <div onClick={this.handleSubmit} className="btn btn-dark">Submit</div>
            </fieldset>
          </form>
        </div>
        <style jsx>{`
                    .textArea{
                      height: 14em;
                      width:100%;
                    }
                    .form{
                      width:100%;
                      marginLeft:90px;
                    }
                    `
                  }
        </style>
      </div>
    );
  }
}

export default Bounty;
