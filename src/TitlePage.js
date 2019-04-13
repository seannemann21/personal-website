import React from 'react';
import { TypedText } from './TypedText.js';

export class TitlePage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {showTitleText: false};
	}

	componentDidMount() {
		this.setState({showTitleText: true});
	}

	render() {
		return (
			<div className="container-fluid full-page title-page">
				<div className="row">
					<div className="col main-title">
						<div className="main-title-text">
							{ this.state.showTitleText ? <TypedText finalText="Hello, World!" initialSleep={2000} useOnReveal={false} /> : '' }
						</div>
						<div className="main-sub-title-text">
							An Introduction to Sean (The One in the Middle)
						</div>
					</div>
				</div>
			</div>
		);
	}
}