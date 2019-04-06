import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Player } from 'video-react';
import hearYouThereDemo from './hear-you-there-demo.mp4';
import summaryData from './summaryData.json';


class Footer extends React.Component {
	
	render() {
		return (
			<div>
				<h6>
					footer
				</h6>
			</div>
		);
	}
}

class Music extends React.Component {
	render() {
		return (
			<div className="container-fluid full-page music-page">
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


	  let primaryColor = '#FFFFFF';
	  let secondaryColor = '#5AC1D0';
	  let videoLeft = true;
	  if(this.props.projectNum % 2 === 1) {
	  	  let tempColor = primaryColor;
		  primaryColor = secondaryColor;
		  secondaryColor = tempColor;
		  videoLeft = !videoLeft;
	  }

	  this.state = { width: 0,
	  				 height: 0 ,
	  				 primaryColor: primaryColor,
	  				 secondaryColor: secondaryColor,
	  				 videoLeft: videoLeft
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
					<span style={{backgroundColor: this.state.secondaryColor}}>
						<div className="video-container demo shadow-sm" style={{backgroundColor: this.state.secondaryColor}}>
							<Player className="shadow-sm" playsInline src={this.props.demoSource}/>
						</div>
					</span>
				</div>
		);
	}

	render() {
		return (
			<div className="container-fluid full-page project-page" style={{backgroundColor: this.state.primaryColor, color: this.state.secondaryColor}}>
				<div className="row">
					<div className="col page-title-text">
						{this.props.title}
					</div>
				</div>
				<div className="row">
					{
						this.state.videoLeft ? this.renderVideo() : ''
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
						!this.state.videoLeft ? this.renderVideo() : ''
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
			<div className="skill-outer">
				<div className="skill-inner">
					{this.props.skill} <span>{this.generateStars()}</span>
				</div>
			</div>
		);
	}
}

class Summary extends React.Component {

	constructor(props) {
		super(props);
		const skills = summaryData.skillsData;
		this.state={	
						skillsColOne: skills.skillsColOne,
						skillsColTwo: skills.skillsColTwo,
						skillsColThree: skills.skillsColThree,
						bodyText: "Morbi euismod erat in sapien venenatis, sit amet sollicitudin dolor fringilla. Donec rutrum euismod mi, sed maximus nibh suscipit ut. Nam aliquet vel nisi non hendrerit. Suspendisse at tempor dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam sit amet nisi vel risus sollicitudin porta a sed erat. Curabitur sem lorem, vehicula vel semper ut, maximus id nibh.\n\nMorbi euismod erat in sapien venenatis, sit amet sollicitudin dolor fringilla. Donec rutrum euismod mi, sed maximus nibh suscipit ut. Nam aliquet vel nisi non hendrerit. Suspendisse at tempor dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam sit amet nisi vel risus sollicitudin porta a sed erat. Curabitur sem lorem, vehicula vel semper ut, maximus id nibh."
				   };
	}
	
	render() {
		return (
			<div className="container-fluid full-page description-page">
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
						{this.state.skillsColOne ?
							<div className="row">
								<div className="col-xs-8 col-md-4 skills-col">
									{this.state.skillsColOne.map(x => <Skill skill={x.skill} skillValue={x.skillValue} maxSkillValue={x.maxSkillValue}/>)}
								</div>
								<div className="col-xs-8 col-md-4 skills-col">
									{this.state.skillsColTwo.map(x => <Skill skill={x.skill} skillValue={x.skillValue} maxSkillValue={x.maxSkillValue}/>)}
								</div>
								<div className="col-xs-8 col-md-4 skills-col">
									{this.state.skillsColThree.map(x => <Skill skill={x.skill} skillValue={x.skillValue} maxSkillValue={x.maxSkillValue}/>)}
								</div>
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
			<div className="container-fluid full-page projects-title-page">
				<div className="row">
					<div className="col projects-text">
						$: ls Projects_
					</div>
				</div>
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
									description: 'Morbi euismod erat in sapien venenatis, sit amet sollicitudin dolor fringilla. Donec rutrum euismod mi, sed maximus nibh suscipit ut. Nam aliquet vel nisi non hendrerit. Suspendisse at tempor dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam sit amet nisi vel risus sollicitudin porta a sed erat. Curabitur sem lorem, vehicula vel semper ut, maximus id nibh.\n\nSed vitae pharetra erat. Nullam iaculis quam et interdum hendrerit. Maecenas dictum, augue nec tristique ullamcorper, mi est auctor turpis, eu egestas nisi libero eget nibh. Sed pellentesque auctor libero non maximus. Duis ac erat neque. Integer vulputate in ipsum eget consequat. Curabitur luctus lacinia lectus, et volutpat nibh porta eget.\n\nAenean vel sagittis sem. Suspendisse leo ante, semper a congue non, scelerisque vestibulum orci. Donec vitae tincidunt nisi, a tempus mauris. Nunc eu felis eu orci rutrum vehicula id id felis. Donec porttitor iaculis metus, quis pellentesque risus. Mauris tincidunt ac diam a varius. Proin blandit ligula et nunc volutpat consectetur. Maecenas dictum aliquet facilisis. Curabitur sed facilisis orci, et maximus nulla. Maecenas lectus ex, aliquam eget lacinia in, pharetra sit amet libero. Proin sed porta magna, sed rutrum neque.',
									projectNum: 0
								};
		const weDj = {
									title: 'We DJ',
									demoSource: hearYouThereDemo,
									description: 'Morbi euismod erat in sapien venenatis, sit amet sollicitudin dolor fringilla. Donec rutrum euismod mi, sed maximus nibh suscipit ut. Nam aliquet vel nisi non hendrerit. Suspendisse at tempor dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam sit amet nisi vel risus sollicitudin porta a sed erat. Curabitur sem lorem, vehicula vel semper ut, maximus id nibh.\n\nSed vitae pharetra erat. Nullam iaculis quam et interdum hendrerit. Maecenas dictum, augue nec tristique ullamcorper, mi est auctor turpis, eu egestas nisi libero eget nibh. Sed pellentesque auctor libero non maximus. Duis ac erat neque. Integer vulputate in ipsum eget consequat. Curabitur luctus lacinia lectus, et volutpat nibh porta eget.\n\nAenean vel sagittis sem. Suspendisse leo ante, semper a congue non, scelerisque vestibulum orci. Donec vitae tincidunt nisi, a tempus mauris. Nunc eu felis eu orci rutrum vehicula id id felis. Donec porttitor iaculis metus, quis pellentesque risus. Mauris tincidunt ac diam a varius. Proin blandit ligula et nunc volutpat consectetur. Maecenas dictum aliquet facilisis. Curabitur sed facilisis orci, et maximus nulla. Maecenas lectus ex, aliquam eget lacinia in, pharetra sit amet libero. Proin sed porta magna, sed rutrum neque.',
									projectNum: 1
								};

		projects.push(hearYouThereProj);
		projects.push(weDj);
		this.state = {projects: projects};
	}

	render() {
		return (
			<>
			<TitlePage/>
			<Summary/>
			<ProjectsTitlePage/>
				{this.state.projects.map( project => <Project title={project.title} demoSource={project.demoSource} description={project.description} 
																projectNum={project.projectNum}/>)}
			<Music/>
			<Footer/>
			</>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
