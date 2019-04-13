import React from 'react';
import { TypedText } from './TypedText.js';

export class ProjectsTitlePage extends React.Component {
	render() {
		return (
			<div className="container-fluid full-page" style={{backgroundColor: this.props.primaryColor, color: this.props.secondaryColor}}>
				<div className="row">
					<div className="col projects-text code">
						C:\> <TypedText finalText="ls Projects\" initialSleep={500} useOnReveal={true}/>
					</div>
				</div>
			</div>
		);
	}
}