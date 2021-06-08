import React, { useState, useEffect, FC } from "react";
import "./grid.css";

import {
  createBoard,
  ListNodeValue,
  LinkedListNode,
  LinkedList,
  Direction,
  getOppositeDirection,
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
  const board = createBoard(gridRows, gridCols);
  const snake = new LinkedList(getStartingSnakeLLValue(board));
  const [snakeCells, setSnakeCells] = useState<Set<number>>(
    new Set([snake.head.value.cell])
  );
  const [foodCell, setFoodCell] = useState<number>(snake.head.value.cell + 5);
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
    const snakeWillRunIntoItself =
      getOppositeDirection(newDirection) === direction && snakeCells.size > 1;
    // Note: this functionality is currently broken, for the same reason that
    // `useInterval` is needed. Specifically, the `direction` and `snakeCells`
    // will currently never reflect their "latest version" when `handleKeydown`
    // is called. I leave it as an exercise to the viewer to fix this :P
    if (snakeWillRunIntoItself) return;
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
      growSnake(newSnakeCells);
      handleFoodConsumption(newSnakeCells);
    }

    setSnakeCells(newSnakeCells);
  };

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
    // Ускорение
    // setDelay(delay - 20);
  };

  const handleFoodConsumption = (newSnakeCells: Set<number>): void => {
    const maxPossibleCellValue = gridRows * gridCols;
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
            return (
              <div key={cellIndex} className={className}>
                {cell}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
