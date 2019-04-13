import React from 'react';
import Fade from 'react-reveal/Fade';

export class Skill extends React.Component {

	generateStars() {
		const stars = [];
		for(let i = 0; i < this.props.maxSkillValue; i++) {
			if(i < this.props.skillValue) {
				stars.push(<span key={this.props.skill + '-' + i} className="fa fa-star checked"/>);		
			} else {
				stars.push(<span key={this.props.skill + '-' + i} className="fa fa-star"/>);
			}
		}

		return stars;
	}

	render() {
		return (
			<div className="skill-outer co-xs-12 col-md-6 col-lg-4">
				<div className="skill-inner">
					<Fade>
						<span className="display-linebreak skill-name">{this.props.skill}</span><span className="skill-stars text-nowrap">{this.generateStars()}</span>
					</Fade>
				</div>
			</div>
		);
	}
}