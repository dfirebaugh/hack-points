import React, { Component } from 'react';

class TotalPointsBar extends Component {
  render = () => {
    this.state && console.log('state: ', this.state.userInfo)
    const pointPercentage = this.props.points / this.props.goal * 100;
    return (
      <div className="points-container">
      <div className='points-bar'>{this.props.points} / {this.props.goal}</div>

        <style jsx>{`
                    .points-bar{
                      background-color:green;
                      width: ${pointPercentage}%;
                      color: white;
                      text-align: center;
                      box-shadow: 0 0 -10px 10px white;
                    }
                    .points-container{
                      background-color:grey;
                    }
                    `
                  }
        </style>
      </div>
    );
  }
}

export default TotalPointsBar;
