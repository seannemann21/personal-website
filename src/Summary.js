import React from 'react';
import Fade from 'react-reveal/Fade';
import summaryData from './summaryData.json';
import { Skill } from './Skill.js';

export class Summary extends React.Component {

	constructor(props) {
		super(props);
		this.state={	
			skills: summaryData.skills,
			bodyText: summaryData.summary
		};
	}
	
	render() {
		return (
			<div className="container-fluid summary-page" style={{backgroundColor: this.props.primaryColor, color: this.props.secondaryColor}}>
				<div className="row">
					<Fade>
						<div className="col summary-title">
							Who Am I?
						</div>
					</Fade>
				</div>
				<div className="row">
					<div className="col-xs-10 offset-xs-1 col-lg-8 offset-lg-2">
						<p className="display-linebreak description-body">
							{this.state.bodyText}
						</p>
					</div>
				</div>
				<div className="row">
					<div className="col-10 offset-1">
						{this.state.skills ?
							<div className="row">
									{this.state.skills.map((x, i) => <Skill key={"skill-" + i}  skill={x.skill} skillValue={x.skillValue} maxSkillValue={x.maxSkillValue}/>)}
							</div>
						: ""
						}
					</div>
				</div>
			</div>
		);
	}
}