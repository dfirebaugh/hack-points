import React, { Component } from 'react';
import BountyCard from '../components/BountyCard';

class BountyBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bounties: [],
			userInfo: { slack: { displayName: '', id: '' }, user: { role: '' } },
			showStatus: 'PENDING',
		};
	}
	componentDidMount() {
		this.getBounties();
	}
	getBounties() {
		fetch(`http://localhost/api/bounties/`, { credentials: 'same-origin' })
			.then(response => response.json())
			.then(responseJson => {
				this.setState({ bounties: responseJson });
			})
			.catch(error => {
				console.error(error);
			});
	}
	// getUser() {
	//   fetch(`http://localhost/api/`, { credentials: 'same-origin' })
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
		console.log(e.target.id);
		this.setState({ showStatus: e.target.id });
	}

	render = () => {
		const filterByStatus = item => {
			if (item.status === this.state.showStatus) {
				return true;
			} else {
				return false;
			}
		};

		const bounties = this.state.bounties.filter(filterByStatus).map((bounty, index) => {
			if (bounty.createdBy == this.state.userInfo.slack.displayName) {
				bounty.isAuthor = true;
			} else {
				bounty.isAuthor = false;
			}
			return (
				<BountyCard
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
			);
		});
		return (
			<div className="container">
				<div className="bounty-container">
					<div className="TODO col-md-6 border container"> {bounties}</div>
					<div className="INPROGRESS col-md-6 border"> </div>
					<div className="DONE col-md-6 border"> </div>
				</div>
				<style jsx>
					{`
						.textArea {
							height: 14em;
							width: 100%;
						}
						.form {
							width: 100%;
							marginleft: 90px;
						}
						.bounty-container {
							padding: 15px;
							display: flex;
						}
						.bounty-container div {
							margin: 15px;
						}
						.border {
							border: 1px black solid;
							height: 500vh;
							width: 45%;
						}
					`}
				</style>
			</div>
		);
	};
}

export default BountyBoard;
