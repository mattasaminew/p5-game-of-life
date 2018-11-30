import React from 'react';
import P5Sketch from './P5Sketch'
import {
	setup,
	draw,
	init,
	mousePressed,
	generate
} from '../sketches/sketch1'
import '../styles/App.css';

class App extends React.Component {
	render() {
		const mapSketchConfigToProps = {
			setup,
			draw,
			init,
			mousePressed,
			generate
		}

		return (
			<div className="App" ref="App">
				<P5Sketch sketchConfig={mapSketchConfigToProps} />
			</div>
		);
  }
}

export default App;
