import React from 'react';
import P5Sketch from './P5Sketch'
import {
	setup,
	draw,
	init,
	mousePressed,
	generate
} from '../sketches/sketch1'

const Sketch1 = () => {
	const mapSketchConfigToProps = {
		setup,
		draw,
		init,
		mousePressed,
		generate
	}

	return(
		<P5Sketch sketchConfig={mapSketchConfigToProps} />
	)
}

export default Sketch1;
