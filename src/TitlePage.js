import React from 'react';
import { TypedText } from './TypedText.js';

export class TitlePage extends React.Component {

	render() {
		return (
			<div className="container-fluid full-page title-page">
				<div className="row">
					<div className="col main-title">
						<div className="main-title-text">
							<TypedText finalText="Hello, World!" initialSleep={2000} useOnReveal={false} />
						</div>
						<div className="main-sub-title-text">
							An Introduction to Me (Sean Nemann)
						</div>
					</div>
				</div>
			</div>
		);
	}
}