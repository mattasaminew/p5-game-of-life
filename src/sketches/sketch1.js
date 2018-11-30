const backgroundColor = 'teal'
const foregroundColor = 'purple'

export const setup = (sketch) => () => {
	sketch.createCanvas(window.innerWidth, window.innerHeight);
	sketch.cellWidth = 6;
	// Calculate columns and rows
	sketch.columns = Math.floor(sketch.width/sketch.cellWidth);
	sketch.rows = Math.floor(sketch.height/sketch.cellWidth);
	// Wacky way to make a 2D array is JS
	sketch.board = new Array(sketch.columns);
	for (var i = 0; i < sketch.columns; i++) {
		sketch.board[i] = new Array(sketch.rows);
	}
	// Going to use multiple 2D arrays and swap them
	sketch.next = new Array(sketch.columns);
	for (i = 0; i < sketch.columns; i++) {
		sketch.next[i] = new Array(sketch.rows);
	}
	sketch.init();
}

export const draw = (sketch) => () => {
	sketch.background(255);
	sketch.generate();
	for ( var i = 0; i < sketch.columns;i++) {
		for ( var j = 0; j < sketch.rows; j++) {
			if ((sketch.board[i][j] === 1)) sketch.fill(sketch.color(foregroundColor));
			else sketch.fill(sketch.color(backgroundColor));
			sketch.stroke(0);
			sketch.rect(i*sketch.cellWidth, j*sketch.cellWidth, sketch.cellWidth-1, sketch.cellWidth-1);
		}
	}
}

export const init = (sketch) => () => {
	for (var i = 0; i < sketch.columns; i++) {
		for (var j = 0; j < sketch.rows; j++) {
			// Lining the edges with 0s
			if (i === 0 || j === 0 || i === sketch.columns-1 || j === sketch.rows-1) sketch.board[i][j] = 0;
			// Filling the rest randomly
			else sketch.board[i][j] = Math.round(Math.random());
			sketch.next[i][j] = 0;
		}
	}
}

export const mousePressed = (sketch) => () => {
	sketch.init();
}

export const generate = (sketch) => () => {
	// Loop through every spot in our 2D array and check spots neighbors
	for (var x = 1; x < sketch.columns - 1; x++) {
		for (var y = 1; y < sketch.rows - 1; y++) {
			// Add up all the states in a 3x3 surrounding grid
			let neighbors = 0;
			for (var i = -1; i <= 1; i++) {
				for (var j = -1; j <= 1; j++) {
					neighbors += sketch.board[x+i][y+j];
				}
			}

			// A little trick to subtract the current cell's state since
			// we added it in the above loop
			neighbors -= sketch.board[x][y];
			// Rules of Life
			if      ((sketch.board[x][y] === 1) && (neighbors <  2)) 	sketch.next[x][y] = 0;	// Loneliness
			else if ((sketch.board[x][y] === 1) && (neighbors >  3)) 	sketch.next[x][y] = 0;	// Overpopulation
			else if ((sketch.board[x][y] === 0) && (neighbors === 3)) sketch.next[x][y] = 1;	// Reproduction
			else                                             					sketch.next[x][y] = sketch.board[x][y];	// Stasis
		}
	}

	let temp = sketch.board;
	sketch.board = sketch.next;
	sketch.next = temp;
}
