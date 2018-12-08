import { initializeSketch, resetSketch, incrementGeneration, generateNewSketch } from './utils'

export const setup = (sketch) => () => {
	sketch.createCanvas(window.innerWidth, window.innerHeight);
	initializeSketch(sketch);
  resetSketch(sketch);
}

export const draw = (sketch) => () => {
	sketch.background(255);
	incrementGeneration(sketch);
  generateNewSketch(sketch);
}

export const mousePressed = (sketch) => () => {
  resetSketch(sketch);
}
