import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import hearYouThereDemo from './hear-you-there-demo.mp4';
import weDjDemo from './we-dj-demo.mp4';
import projectDescriptions from './project-descriptions.json';
import { Footer } from './Footer.js';
import { Music } from './Music.js';
import { Project } from './Project.js';
import { Summary } from './Summary.js';
import { TitlePage } from './TitlePage.js';
import { ProjectsTitlePage } from './ProjectsTitlePage.js';
import { BodyPages } from './BodyPages.js';

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
