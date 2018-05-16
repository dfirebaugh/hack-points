import React, { Component } from 'react';

class BountyCard extends Component {
  constructor(props) {
    super(props)
    this.state = { visible: true }
  }
  handleBtn(currUser, id, operation) {
    console.log('id: ', id)
    console.log('user: ', currUser)
    // this.props.callback(currUser,id,operation);
    // console.log(this.props)
    // console.log(currUser,id,operation)
    // let method;
    // if(operation === 'delete'){
    //   method = 'DELETE'
    // }
    // else{
    //   method = 'PUT'
    // }
    // this.setState({visible:false})
    fetch(`http://localhost:8080/api/v1/bounties/${id}`, {
      method: operation,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({
        "_id": id,
        "status": "COMPLETED",
        "completedBy": currUser,
      })
    })
  }
  handleDelete(currUser, id) {
    console.log('id: ', id)
    console.log('user: ', currUser)
    // fetch(`http://localhost:8080/api/v1/bounties/${id}`, {
    //   method: 'DELETE',
    //   headers: {'Content-Type':'application/json'},
    //   credentials:'same-origin',
    //   body: JSON.stringify({
    //     "_id":id,
    //     "status":"COMPLETED",
    //     "completedBy":currUser,
    //   })
    // })
  }

  render() {
    const adminBtns = <div>
      <p>
        <input placeholder="Change Point Value" min='1' max='300'></input>

        <button
          className="btn btn-success"
          value={this.props.id}
          onClick={this.handleBtn(this.props.currUser, this.props.id)}
        >
          Approve!
                        </button>

        <button
          className="btn btn-danger"
          value={this.props.id}
          onClick={this.handleDelete(this.props.currUser, this.props.id)}
        >
          Delete!
                        </button>

      </p>
    </div>

    //TODO-- update the user buttons
    const userBtns = <div>
      <p>
        <button
          className="btn btn-success"
          value={this.props.id}
          onClick={this.handleBtn(this.props.currUser, this.props.id, "complete")}
        >
          Complete!
                        </button>

        {
          (this.props.isAuthor ?
            <button
              className="btn btn-danger"
              value={this.props.id}
              onClick={this.handleBtn(this.props.currUser, this.props.id, "delete")}
            >
              Delete!
                            </button> :
            '')
        }
      </p>
    </div>

    let visible = <div className="cardContainer">
      {this.props.status}
      <div className="card jumbotron">
        <img className='icon' src={this.props.createdIcon}></img>
        <p>created by: {this.props.createdBy}</p>

        <div className='card'>
          <h3><p ref={(ref) => { this.title = ref }}>{this.props.title}</p></h3>
          <p>{this.props.message}</p>
        </div>

        <p>Points: {this.props.pointValue}</p>
        <hr></hr>
        {(this.props.role !== "Admin" ?
          adminBtns :
          userBtns)}
      </div>
      <style jsx>{`
        .bounty-container {
          padding: 15px;
        }
        .cardContainer{
          padding:10px;
        }
        .icon { 
          width:48px;
          height:48px;
        }
        .card { 
          width:100%;
          padding:10px;
        }
        `
      }
      </style>
    </div>

    return ((this.state.visible ? visible : ""))

  }
}

export default BountyCard;

//<p>{this.props.message}</p>
