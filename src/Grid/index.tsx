import React, { useState, useEffect, FC } from "react";
import "./grid.css";

import {
  createBoard,
  ListNodeValue,
  LinkedListNode,
  LinkedList,
  Direction,
  getDirectionFromKey,
  getCoordsInDirection,
  isOutOfBounds,
  getGrowthNodeCoords,
  getCellClassName,
} from "./helpers";

import { useInterval, randomIntFromInterval } from "../utils";

interface Props {
  gridRows: number;
  gridCols: number;
  handleGameOver: () => void;
  setScore: (score: number) => void;
  score: number;
}

const getStartingSnakeLLValue = (board: number[][]): ListNodeValue => {
  const rowSize = board.length;
  const colSize = board[0].length;
  const startingRow = Math.round(rowSize / 2);
  const startingCol = Math.round(colSize / 2);
  const startingCell = board[startingRow][startingCol];
  return {
    row: startingRow,
    col: startingCol,
    cell: startingCell,
  };
};

const Grid: FC<Props> = ({
  gridRows,
  gridCols,
  handleGameOver,
  score,
  setScore,
}) => {
  const maxPossibleCellValue = gridRows * gridCols;
  const board = createBoard(gridRows, gridCols);
  const [snake] = useState<LinkedList>(
    new LinkedList(getStartingSnakeLLValue(board))
  );
  const [snakeCells, setSnakeCells] = useState<Set<number>>(
    new Set([snake.head.value.cell])
  );
  const [foodCell, setFoodCell] = useState<number>(
    randomIntFromInterval(1, maxPossibleCellValue)
  );
  const [direction, setDirection] = useState<string>(Direction.Rigth);
  const [delay, setDelay] = useState<number>(150);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      handleKeydown(e);
    });
  }, []);

  useInterval(() => {
    moveSnake();
  }, delay);

  const handleKeydown = (e: KeyboardEvent): void => {
    const newDirection = getDirectionFromKey(e.key);
    const isValidDirection = newDirection !== "";
    if (!isValidDirection) return;
    setDirection(newDirection);
  };

  const moveSnake = () => {
    const currentHeadCoords = {
      row: snake.head.value.row,
      col: snake.head.value.col,
    };

    const nextHeadCoords = getCoordsInDirection(currentHeadCoords, direction);
    if (isOutOfBounds(nextHeadCoords, board)) {
      handleGameOver();
      return;
    }
    const nextHeadCell = board[nextHeadCoords.row][nextHeadCoords.col];
    if (snakeCells.has(nextHeadCell)) {
      handleGameOver();
      return;
    }

    const newHead = new LinkedListNode({
      row: nextHeadCoords.row,
      col: nextHeadCoords.col,
      cell: nextHeadCell,
    });
    const currentHead = snake.head;
    snake.head = newHead;
    currentHead.next = newHead;

    const newSnakeCells = new Set(snakeCells);
    newSnakeCells.delete(snake.tail!.value.cell);
    newSnakeCells.add(nextHeadCell);

    snake.tail = snake.tail!.next;
    if (snake.tail === null) snake.tail = snake.head;

    const foodConsumed = nextHeadCell === foodCell;
    if (foodConsumed) {
      // This function mutates newSnakeCells.
      growSnake(newSnakeCells);
      handleFoodConsumption(newSnakeCells);
      setDelay(delay - 5);
    }

    setSnakeCells(newSnakeCells);
  };

  // This function mutates newSnakeCells.
  const growSnake = (newSnakeCells: Set<number>): void => {
    const growthNodeCoords = getGrowthNodeCoords(snake.tail!, direction);
    if (isOutOfBounds(growthNodeCoords, board)) {
      return;
    }
    const newTailCell = board[growthNodeCoords.row][growthNodeCoords.col];
    const newTail = new LinkedListNode({
      row: growthNodeCoords.row,
      col: growthNodeCoords.col,
      cell: newTailCell,
    });
    const currentTail = snake.tail;
    snake.tail = newTail;
    snake.tail.next = currentTail;

    newSnakeCells.add(newTailCell);
    setSnakeCells(newSnakeCells);
  };

  const handleFoodConsumption = (newSnakeCells: Set<number>): void => {
    let nextFoodCell;
    while (true) {
      nextFoodCell = randomIntFromInterval(1, maxPossibleCellValue);
      if (newSnakeCells.has(nextFoodCell) || foodCell === nextFoodCell)
        continue;
      break;
    }

    setFoodCell(nextFoodCell);
    setScore(score + 1);
  };

  return (
    <div className="grid">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => {
            const className = getCellClassName(cell, foodCell, snakeCells);
            return <div key={cellIndex} className={className}></div>;
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
