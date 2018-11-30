import React from 'react';
import ReactDOM from 'react-dom';
import p5 from 'p5';

class P5Sketch extends React.Component {
	sketchId = Math.random().toString(36).slice(2)
	divId = `P5Sketch-container-${this.sketchId}`
	canvasId = `P5Sketch-canvas-${this.sketchId}`

	containerStyle = {
		display: 'inline-flex',
		justifyContent: 'center',
		alignItems: 'center'
	}

	defaultSetup = (sketch) => () => {
		sketch.createCanvas(200, 200);
		sketch.canvas.id = this.canvasId
	}

	initializeSketch = (sketch) => {
		sketch.createCanvas(100, 100);
		sketch.canvas.id = this.canvasId

		Object.keys(this.props.sketchConfig).forEach((key) => (sketch[key] = this.props.sketchConfig[key](sketch)))
	}

  componentDidMount() {
    this.p5 = new p5(this.initializeSketch, ReactDOM.findDOMNode(this))
  }

  render() {
		return (
			<div
				id={this.divId}
				style={{
					...this.containerStyle,
					...this.props.style
				}}
				className="p5Container"
			>
			</div>
		);
  }
}

export default P5Sketch;
