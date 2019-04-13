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
import Fade from 'react-reveal/Fade';
import Reveal from 'react-reveal/Reveal';

class Music extends React.Component {

	constructor(props) {
		super(props);

		this.state = {musicText: summaryData.musicText};
	}

	render() {
		return (
			<div className="container-fluid summary-page" style={{backgroundColor: this.props.primaryColor, color: this.props.secondaryColor}}>
				<div className="row">
					<Fade>
						<div className="col summary-title">
							What I'm Listening To
						</div>
					</Fade>
				</div>
				<div className="row">
					<div className="col-xs-10 offset-xs-1 col-lg-8 offset-lg-2">
							<div className="description-body">
								<Fade>
									<p>{this.state.musicText}</p>
								</Fade>
							</div>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12 col-lg-8 offset-lg-2 music-col">
						<Fade>
							<div className="music">
								<iframe title="spotify-widget" className="spotify-widget shadow" style={{backgroundColor: this.props.secondaryColor}} src="https://open.spotify.com/embed/user/seannemann/playlist/5TWNX1sTTTBhz5u4TCRf6O" width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
							</div>
						</Fade>
					</div>
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
					{ this.props.descParagraphs.map((paragraph, i) => <Fade key={this.props.title + '-' + i}><p>{ paragraph }<br/><br/></p></Fade>) }
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

class Skill extends React.Component {

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

class TypedText extends React.Component {

	constructor(props) {
		super(props);

		this.state = {text: ""};
		
		if(!this.props.useOnReveal) {
			this.typeText();
		}
	}

	async typeText() {
		await this.sleep(this.props.initialSleep);
		if(this.state.text !== this.props.finalText) {
			for(let i = 0; i < this.props.finalText.length; i++) {
				let text = this.state.text;
				text += this.props.finalText.charAt(i);
				this.setState({text: text});
				await this.sleep(200);
			}
		}
	}

	sleep(ms){
	    return new Promise(resolve=>{
	        setTimeout(resolve, ms)
	    })
	}

	render() {
		return(
			<>
				{this.props.useOnReveal ? <Reveal onReveal={() => this.typeText()} /> : ""}
				{
					this.state.text === "" ? <span>&nbsp;</span> : <span className="typewriter code">{ this.state.text }</span>
				}
			</>
		);
	}
}

class TitlePage extends React.Component {

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

class ProjectsTitlePage extends React.Component {
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
									descParagraphs: projectDescriptions.hearYouThereParagraphs,
									appUrl: 'https://hear-you-there.herokuapp.com',
									gitHubUrl: 'https://github.com/seannemann21/HearYouThere'
								};
		const weDj = {
									title: 'We DJ',
									demoSource: weDjDemo,
									descParagraphs: projectDescriptions.weDjParagraphs,
									appUrl: 'https://we-dj.herokuapp.com',
									gitHubUrl: 'https://github.com/seannemann21/we-dj'
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
					{this.state.projects.map( project => <Project key={project.title} title={project.title} demoSource={project.demoSource} descParagraphs={project.descParagraphs} 
																	projectNum={project.projectNum} appUrl={project.appUrl} gitHubUrl={project.gitHubUrl}/>)}
				<Music/>
			</BodyPages>
			<Footer/>>
			</>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
