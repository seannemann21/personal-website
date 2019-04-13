import React from 'react';
import Fade from 'react-reveal/Fade';
import summaryData from './summaryData.json';

export class Music extends React.Component {

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