import React, { Component } from 'react';

class TotalPointsBar extends Component {
  render = () => {
    this.state && console.log('state: ', this.state.userInfo)
    const pointPercentage = this.props.points / this.props.goal * 100;
    return (
      <div className="points-container">
      <div className='points-bar'>{this.props.points} points  out of {this.props.goal}</div>

        <style jsx>{`
                    .points-bar{
                      background-color:green;
                      width: ${pointPercentage}%;
                      color: white;
                      text-align: center;
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
