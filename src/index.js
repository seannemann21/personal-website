import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';


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
		this.state = {projects: []};
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
