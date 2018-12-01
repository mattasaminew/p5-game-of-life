import React from 'react';
import P5Sketch from './P5Sketch'
import {
	setup,
	draw,
	mousePressed
} from '../sketches/game-of-life'

const GameOfLife = () => {
	const mapSketchConfigToProps = {
		setup,
		draw,
		mousePressed
	}

	const style = {
		width: '100vw',
		height: '100vh',
		overflow: 'hidden'
	}

	return(
		<P5Sketch sketchConfig={mapSketchConfigToProps} style={style} />
	)
}

export default GameOfLife;
