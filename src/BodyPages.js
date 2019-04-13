import React from 'react';

export class BodyPages extends React.Component {

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