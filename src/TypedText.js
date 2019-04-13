import React from 'react';
import Reveal from 'react-reveal/Reveal';

export class TypedText extends React.Component {

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
					this.state.text === "" ? <span className="typewriter code"></span> : <span className="typewriter code">{ this.state.text }</span>
				}
			</>
		);
	}
}