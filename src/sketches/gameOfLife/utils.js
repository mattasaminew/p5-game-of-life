import { BACKGROUND_COLOR, CELL_WIDTH, FOREGROUND_COLOR } from './parameters'

export const initializeSketch = (sketch) => {
  sketch.columns = Math.round(sketch.width/CELL_WIDTH);
  sketch.rows = Math.round(sketch.height/CELL_WIDTH);

  sketch.currentBoard = newBoard(sketch)
  sketch.nextBoard = newBoard(sketch)
}

export const resetSketch = (sketch) => {
  for (var col = 0; col < sketch.columns; col++) {
    for (var row = 0; row < sketch.rows; row++) {
      sketch.currentBoard[col][row] = isAnEdgeCell(col, row, sketch) ? 0 : Math.round(Math.random());

      sketch.nextBoard[col][row] = 0;
    }
  }

  sketch.generation = 1
}

export const incrementGeneration = (sketch) => {
  // Evaluate value of next generation in nextBoard
  for (var col = 1; col < sketch.columns - 1; col++) {
    for (var row = 1; row < sketch.rows - 1; row++) {
      let score = neighborScore(sketch.currentBoard, col, row)
      sketch.nextBoard[col][row] = rulesOfLife(sketch.currentBoard[col][row], score)
    }
  }

  [sketch.currentBoard, sketch.nextBoard] = [sketch.nextBoard, sketch.currentBoard]

  sketch.generation += 1
}

export const generateNewSketch = (sketch) => {
  for ( var col = 0; col < sketch.columns; col++) {
    for ( var row = 0; row < sketch.rows; row++) {
      fillCell(sketch, col, row);
    }
  }
}

// ============ PRIVATE ============

const newBoard = ({ columns, rows }) => {
  let board = new Array(columns)
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows)
  }
  return board
}

const isAnEdgeCell = (col, row, { columns, rows }) => {
  return col === 0 || row === 0 || col === columns-1 || row === rows-1
}

const deadCellColor = (sketch) => (sketch.color(BACKGROUND_COLOR))
const aliveCellColor = (sketch) => (sketch.color(FOREGROUND_COLOR))

const cellColor = (sketch, cellCol, cellRow) => {
  if (sketch.currentBoard[cellCol][cellRow] === 1) {
    return aliveCellColor(sketch)
  } else {
    return deadCellColor(sketch)
  }
}

const fillCell = (sketch, cellCol, cellRow) => {
  let colOffset = cellCol*CELL_WIDTH
  let rowOffset = cellRow*CELL_WIDTH

  sketch.fill(cellColor(sketch, cellCol, cellRow))
  sketch.noStroke();
  sketch.rect(colOffset, rowOffset, CELL_WIDTH, CELL_WIDTH);
}

// Score of all neighboring cells
const neighborScore = (currentBoard, cellCol, cellRow) => {
  let score = -currentBoard[cellCol][cellRow]

  for (let offsetCol = -1; offsetCol <= 1; offsetCol++) {
    for (let offsetRow = -1; offsetRow <= 1; offsetRow++) {
      score += currentBoard[cellCol+offsetCol][cellRow+offsetRow]
    }
  }

  return score
}

// RULES OF LIFE
const rulesOfLife = (currentCell, score) => {
  let nextCell
  let cellAlive = currentCell === 1

  if 			(cellAlive && score < 2) 		{ nextCell = 0 } 					//Loneliness
  else if (cellAlive && score > 3) 		{ nextCell = 0 } 					//Overpopulation
  else if (!cellAlive && score === 3) { nextCell = 1 } 					//Reproduction
  else 																	nextCell = currentCell 	//Stasis

  return nextCell
}

// ====================

