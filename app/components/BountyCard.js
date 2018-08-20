import React, { Component } from 'react';

class BountyCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: true,
			isCollapsed: true,
		};
	}
	handleBtn(currUser, id, operation) {
		// console.log('id: ', id)
		// console.log('user: ', currUser)
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
		// fetch(`http://localhost/api/bounties/${id}`, {
		//   method: operation,
		//   headers: { 'Content-Type': 'application/json' },
		//   credentials: 'same-origin',
		//   body: JSON.stringify({
		//     "_id": id,
		//     "status": "COMPLETED",
		//     "completedBy": currUser,
		//   })
		// })
	}
	handleDelete(currUser, id) {
		// console.log('id: ', id)
		// console.log('user: ', currUser)
		// fetch(`http://localhost/api/bounties/${id}`, {
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
	handleCollapse = () => {
		this.setState({
			isCollapsed: !this.state.isCollapsed,
		});
	};

	render() {
		const adminBtns = (
			<div>
				<p>
					<input placeholder="Change Point Value" min="1" max="300" />

					<button className="btn btn-success" value={this.props.id} onClick={this.handleBtn}>
						Approve!
					</button>

					<button className="btn btn-danger" value={this.props.id} onClick={this.handleDelete}>
						Delete!
					</button>
				</p>
			</div>
		);

		//TODO-- update the user buttons
		const userBtns = (
			<div>
				<p>
					<button className="btn btn-success" value={this.props.id} onClick={this.handleBtn}>
						Complete!
					</button>

					{this.props.isAuthor ? (
						<button className="btn btn-danger" value={this.props.id} onClick={this.handleBtn}>
							Delete!
						</button>
					) : (
						''
					)}
				</p>
			</div>
		);

		let visible = (
			<div className="cardContainer">
				<div className="card container jumbotron col-md-6">
					<div className="container col-md-6" onClick={this.handleCollapse}>
						<div className="col-xs-6">
							{' '}
							<img className="icon glow!" src={this.props.createdIcon} />
						</div>
						<h3 className="col-xs-6">
							<p
								ref={ref => {
									this.title = ref;
								}}
							>
								{this.props.title}
							</p>
						</h3>
					</div>
					{!this.state.isCollapsed && (
						<div className="col-md-8">
							<p>created by: {this.props.createdBy}</p>
							<div className="card">
								<p> description: </p>
								<p>{this.props.message}</p>
							</div>
							<p>Points: {this.props.pointValue}</p>
							Status: {this.props.status}
							<hr />
							{this.props.role !== 'Admin' ? adminBtns : userBtns}
						</div>
					)}
				</div>
				<style jsx>
					{`
						h3 {
							font-size: 8;
						}
						.bounty-container {
							// padding: 15px;
						}
						.cardContainer {
							padding: 10px;
						}
						.icon {
							width: 48px;
							height: 48px;
						}
						.card {
							width: 100%;
							padding-left: 0;
						}
						.icon {
							animation: glow 3s infinite alternate;
							background-color: black;
						}
						@keyframes glow {
							from {
								box-shadow: 0 0 10px -10px black;
							}
							to {
								box-shadow: 0 0 10px 10px grey;
							}
						}
					`}
				</style>
			</div>
		);

		return this.state.visible ? visible : '';
	}
}

export default BountyCard;

//<p>{this.props.message}</p>
