import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Player } from 'video-react';
import hearYouThereDemo from './hear-you-there-demo.mp4';
import weDjDemo from './we-dj-demo.mp4';
import summaryData from './summaryData.json';
import projectDescriptions from './project-descriptions.json';
import { Footer } from './Footer.js';

class Music extends React.Component {
	render() {
		return (
			<div className="container-fluid full-page" style={{backgroundColor: this.props.primaryColor, color: this.props.secondaryColor}}>
				<div className="row">
					<h1 className="col page-title-text">
						Description
					</h1>
				</div>
			</div>
		);
	}
}

class Project extends React.Component {
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
						<div className="video-container demo shadow-sm" style={{backgroundColor: this.state.secondaryColor}}>
							<Player className="shadow-sm" playsInline src={this.props.demoSource}/>
						</div>
					</span>
				</div>
		);
	}

	render() {
		return (
			<div className="container-fluid full-page project-page" style={{backgroundColor: this.props.primaryColor, color: this.props.secondaryColor}}>
				<div className="row">
					<div className="col page-title-text">
						{this.props.title}
					</div>
				</div>
				<div className="row">
					{
						this.props.contentLeft ? this.renderVideo() : ''
					}
					<div className={"col-12 project-description " + (this.isLandscape() ? 'col-lg-6' : '')}>
						<div className="description-title">
							~ The Details ~
						</div>
						<div>
							<p className="description-body display-linebreak">
								{this.props.description}
							</p>
						</div>
					</div>
					{
						!this.props.contentLeft ? this.renderVideo() : ''
					}
				</div>
			</div>
		);
	}

}

class Skill extends React.Component {

	generateStars() {
		const stars = [];
		for(let i = 0; i < this.props.maxSkillValue; i++) {
			if(i < this.props.skillValue) {
				stars.push(<span className="fa fa-star checked"/>);		
			} else {
				stars.push(<span className="fa fa-star"/>);
			}
		}

		return stars;
	}

	render() {
		return (
			<div className="skill-outer co-xs-12 col-md-6 col-lg-4">
				<div className="skill-inner">
					<span className="display-linebreak skill-name">{this.props.skill}</span><span className="skill-stars text-nowrap">{this.generateStars()}</span>
				</div>
			</div>
		);
	}
}

class Summary extends React.Component {

	constructor(props) {
		super(props);
		this.state={	
						skills: summaryData.skills,
						bodyText: summaryData.summary
					};
	}
	
	render() {
		return (
			<div className="container-fluid page" style={{backgroundColor: this.props.primaryColor, color: this.props.secondaryColor}}>
				<div className="row">
					<div className="col summary-title">
						Who Am I?
					</div>
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
									{this.state.skills.map(x => <Skill skill={x.skill} skillValue={x.skillValue} maxSkillValue={x.maxSkillValue}/>)}
							</div>
						: ""
						}
					</div>
				</div>
			</div>
		);
	}
}

class Greeter {
	constructor() {
		this.hellos = [
			"Hello",
			"Howdy",
			"Hi",
			"Hey"
		]

		this.worlds = [
			"World",
			"Planet",
			"Earth",
			"Universe"
		]
	}
	

	getGreeting() {
		return this.hellos[Math.floor(Math.random() * this.hellos.length)] + ', ' + this.worlds[Math.floor(Math.random() * this.worlds.length)];
	}
}

class TitlePage extends React.Component {

	constructor(props) {
		super(props);
		const greeter = new Greeter();
		this.state = {title: greeter.getGreeting()}
	}

	render() {
		return (
			<div className="container-fluid full-page title-page">
				<div className="row">
					<div className="col main-title">
						<div className="main-title-text">
							{this.state.title}
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

class ProjectsTitlePage extends React.Component {
	render() {
		return (
			<div className="container-fluid full-page" style={{backgroundColor: this.props.primaryColor, color: this.props.secondaryColor}}>
				<div className="row">
					<div className="col projects-text">
						C:\> ls Projects_
					</div>
				</div>
			</div>
		);
	}
}

class BodyPages extends React.Component {

	render() {

		const color1 = '#FFFFFF';
		const color2 = '#5AC1D0';

		const children = React.Children.map(this.props.children, (child, i) => {

			let primaryColor = color1;
			let secondaryColor = color2;
			// content in my case means demo
			// content only applicable for certain components
			let contentLeft = true;
			if(i % 2 === 1) {
				primaryColor = color2;
				secondaryColor = color1;
				contentLeft = false;
			}

	    	return React.cloneElement(child, {
	    		primaryColor: primaryColor,
	    		secondaryColor: secondaryColor,
	    		contentLeft: contentLeft
	    	});
	  	});

		return (
		    <div>
		    	{ children }
		    </div>
		);
	}
}

class Main extends React.Component{

	constructor(props){
		super(props);
		const projects = [];
		const hearYouThereProj = {
									title: 'Hear You There',
									demoSource: hearYouThereDemo,
									description: projectDescriptions.hearYouThereDescription
								};
		const weDj = {
									title: 'We DJ',
									demoSource: weDjDemo,
									description: projectDescriptions.weDjDescription
								};

		projects.push(hearYouThereProj);
		projects.push(weDj);
		this.state = {projects: projects};
	}

	render() {
		return (
			<>
			<TitlePage/>
			<BodyPages>
				<Summary/>
				<ProjectsTitlePage/>
					{this.state.projects.map( project => <Project title={project.title} demoSource={project.demoSource} description={project.description} 
																	projectNum={project.projectNum}/>)}
				<Music/>
			</BodyPages>
			</>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
