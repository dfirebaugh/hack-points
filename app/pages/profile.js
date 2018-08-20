import React, { Component } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Theme from '../components/Theme';
import 'isomorphic-fetch';
import NavMenu from '../components/NavMenu';
import ProfileComponent from '../components/ProfileComponent';

class Profile extends Component {
	componentWillMount = () => {
		fetch(`http://localhost/api/users/currentUser/`, { credentials: 'same-origin' })
			.then(response => response.json())
			.then(responseJson => {
				this.setState({
					userInfo: responseJson,
				});
			})
			.catch(error => {
				console.error(error);
			});
	};

	render = () => {
		this.state && console.log(this.state.userInfo);
		return (
			<Theme>
				<NavMenu />

				{this.state && (
					<ProfileComponent
						displayName={this.state.userInfo.name}
						email={this.state.userInfo.email}
						points={this.state.userInfo.hackPoints}
						imgIcon={this.state.userInfo.img}
						userInfo={this.state.userInfo}
					/>
				)}
			</Theme>
		);
	};
}

export default Profile;
