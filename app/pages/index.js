import React, { Component } from 'react';
import Theme from '../components/Theme';
import NavMenu from '../components/NavMenu';
import TotalPointsBar from '../components/TotalPointsBar';

// Straight away require/import scss/css just like in react.
import indexStyle from '../styles/index.scss';

class Index extends Component {
	componentDidMount = () => {
		fetch(`http://localhost/api/users/totalPoints/`, { credentials: 'same-origin' })
			.then(response => response.json())
			.then(responseJson => {
				this.setState({
					totalPoints: responseJson,
				});
			})
			.catch(error => {
				console.error(error);
			});
	};
	render() {
		this.state && console.log(this.state.totalPoints.totalHackPoints);
		return (
			<Theme>
				{/*
        this.state &&
        <TotalPointsBar points={11} goal={20}/>
      */}
				<NavMenu />
				<div className="info-text jumbotron">
					<p>
						This is a bounty system where users can create and complete tasks to win points. All users'
						points are added together to make up the Groups total points.
					</p>
				</div>
				{/* Styling using styled-jsx. */}
				<style jsx>
					{`
						.info-text {
							padding: 15px;
						}
					`}
				</style>
			</Theme>
		);
	}
}
export default Index;
