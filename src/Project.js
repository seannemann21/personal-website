import React from 'react';
import Fade from 'react-reveal/Fade';
import { Player } from 'video-react';

export class Project extends React.Component {
	// thanks to speckledcarp
	// window resizing code taken from https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
	constructor(props) {
	  super(props);

	  this.state = { width: 0,
	  				 height: 0
	  				};
	  this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
	  this.updateWindowDimensions();
	  window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
	  window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
	  this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	isLandscape() {
		return this.state.width > this.state.height;
	}

	renderVideo() {
		return (
				<div className={"col-12 " + (this.isLandscape() ? 'col-lg-6' : '')}>
					<span style={{backgroundColor: this.props.secondaryColor}}>
						<div className="video-container demo shadow" style={{backgroundColor: this.state.secondaryColor}}>
							<Player className="shadow-sm" playsInline src={this.props.demoSource}/>
						</div>
					</span>
					<div className="project-link">
						<a style={{color: this.props.secondaryColor}} href={this.props.appUrl}>{ this.props.appUrl}</a>
					</div>
					<div className="project-link">
						<a style={{color: this.props.secondaryColor}} href={this.props.gitHubUrl}>{ this.props.gitHubUrl}</a>
					</div>
				</div>
		);
	}

	isVerticalLayout() {
		return this.state.width < 992 || !this.isLandscape();
	}

	getDescriptionBorderStyle() {
		let style = {};
		if(!this.isVerticalLayout()) {
			if(this.props.contentLeft) {
				style={borderLeft: 'solid'};
			} else {
				style={borderRight: 'solid'};
			}
		}

		return style;
	}

	renderDescription() {
		return (
			<div className={"col-12 project-description " + (this.isLandscape() ? 'col-lg-6' : '')}>
				<div className="description-title">
					~ The Details ~
				</div>
				<div className="project-description" style={this.getDescriptionBorderStyle()}>
					{ this.props.descParagraphs.map((paragraph, i) => <p key={this.props.title + '-' + i}>{ paragraph }<br/><br/></p>) }
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="container-fluid min-padding-page project-page" style={{backgroundColor: this.props.primaryColor, color: this.props.secondaryColor}}>
				<div className="row">
					<div className="col page-title-text">
						<Fade top>
							{this.props.title}
						</Fade>
					</div>
				</div>
				<div className="row">
					{
						this.props.contentLeft && !this.isVerticalLayout()? 
						<>
							<Fade left> {this.renderVideo()} </Fade>
							<Fade right> {this.renderDescription()} </Fade>
						</>
							:
						<>
							<Fade left> {this.renderDescription()} </Fade>
							<Fade right> {this.renderVideo()} </Fade>
						</>
					}
				</div>
			</div>
		);
	}

}