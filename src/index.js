import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Player } from 'video-react';
import hearYouThereDemo from './hear-you-there-demo.mp4'


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
	  this.state = { width: 0, height: 0 };
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

	render() {
		return (
			<div className="container-fluid full-page project-page" style={{'backgroundColor': '#ffeb3b'}}>
				<div className="row">
					<div className="col page-title-text">
						{this.props.title}
					</div>
				</div>
				<div className="row">
					<div className={"col-12 " + (this.isLandscape() ? 'col-lg-6' : '')}>
						<div className="video-container demo shadow-lg" style={{'backgroundColor': '#e91e63'}}>
							<Player playsInline src={this.props.demoSource} className='demo'/>
						</div>
					</div>
					<div className={"col-12 project-description " + (this.isLandscape() ? 'col-lg-6' : '')}>
						<div className="description-title">
							Description
						</div>
						<p className="display-linebreak">
							{this.props.description}
						</p>
					</div>
				</div>
			</div>
		);
	}

}

class Summary extends React.Component {
	
	render() {
		return (
			<div className="container-fluid full-page description-page">
				<div className="row">
					<h1 className="col page-title-text">
						Description
					</h1>
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

class Main extends React.Component{

	constructor(props){
		super(props);
		const projects = [];
		const hearYouThereProj = {
									title: 'Hear You There',
									demoSource: hearYouThereDemo,
									description: 'Morbi euismod erat in sapien venenatis, sit amet sollicitudin dolor fringilla. Donec rutrum euismod mi, sed maximus nibh suscipit ut. Nam aliquet vel nisi non hendrerit. Suspendisse at tempor dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam sit amet nisi vel risus sollicitudin porta a sed erat. Curabitur sem lorem, vehicula vel semper ut, maximus id nibh.\n\nSed vitae pharetra erat. Nullam iaculis quam et interdum hendrerit. Maecenas dictum, augue nec tristique ullamcorper, mi est auctor turpis, eu egestas nisi libero eget nibh. Sed pellentesque auctor libero non maximus. Duis ac erat neque. Integer vulputate in ipsum eget consequat. Curabitur luctus lacinia lectus, et volutpat nibh porta eget.\n\nAenean vel sagittis sem. Suspendisse leo ante, semper a congue non, scelerisque vestibulum orci. Donec vitae tincidunt nisi, a tempus mauris. Nunc eu felis eu orci rutrum vehicula id id felis. Donec porttitor iaculis metus, quis pellentesque risus. Mauris tincidunt ac diam a varius. Proin blandit ligula et nunc volutpat consectetur. Maecenas dictum aliquet facilisis. Curabitur sed facilisis orci, et maximus nulla. Maecenas lectus ex, aliquam eget lacinia in, pharetra sit amet libero. Proin sed porta magna, sed rutrum neque.',
									primaryColor: 'yellow',
									secondaryColor: 'red'
								};
		projects.push(hearYouThereProj);
		this.state = {projects: projects};
	}

	render() {
		return (
			<>
			<TitlePage/>
			<Summary/>
				{this.state.projects.map( project => <Project title={project.title} demoSource={project.demoSource} description={project.description} 
																primaryColor={project.primaryColor} secondaryColor={project.secondaryColor}/>)}
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
