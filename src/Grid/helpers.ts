export class LinkedListNode {
  value: ListNodeValue;
  next: LinkedListNode | null;

  constructor(value: ListNodeValue) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  head: LinkedListNode;
  tail: LinkedListNode | null;

  constructor(value: ListNodeValue) {
    const node = new LinkedListNode(value);
    this.head = node;
    this.tail = node;
  }
}

export const createBoard = (gridRows: number, gridCols: number): number[][] => {
  let counter = 1;
  const board = [];
  for (let row = 0; row < gridRows; row++) {
    const currentRow = [];
    for (let col = 0; col < gridCols; col++) {
      currentRow.push(counter++);
    }
    board.push(currentRow);
  }
  return board;
};

export enum Direction {
  Up = "ArrowUp",
  Down = "ArrowDown",
  Rigth = "ArrowRight",
  Left = "ArrowLeft",
}

export type Coords = {
  row: number;
  col: number;
};

export type ListNodeValue = {
  row: number;
  col: number;
  cell: number;
};

export const getCoordsInDirection = (
  coords: Coords,
  direction: string
): Coords => {
  if (direction === Direction.Up) {
    return {
      row: coords.row - 1,
      col: coords.col,
    };
  }
  if (direction === Direction.Rigth) {
    return {
      row: coords.row,
      col: coords.col + 1,
    };
  }
  if (direction === Direction.Down) {
    return {
      row: coords.row + 1,
      col: coords.col,
    };
  }
  if (direction === Direction.Left) {
    return {
      row: coords.row,
      col: coords.col - 1,
    };
  }
  return { row: 0, col: 0 };
};

export const isOutOfBounds = (coords: Coords, grid: number[][]): boolean => {
  const { row, col } = coords;
  if (row < 0 || col < 0) return true;
  if (row >= grid.length || col >= grid[0].length) return true;
  return false;
};

export const getDirectionFromKey = (key: string): string => {
  if (key === "ArrowUp") return Direction.Up;
  if (key === "ArrowRight") return Direction.Rigth;
  if (key === "ArrowDown") return Direction.Down;
  if (key === "ArrowLeft") return Direction.Left;
  return "";
};

export const getNextNodeDirection = (
  node: LinkedListNode,
  currentDirection: string
): string => {
  if (node.next === null) return currentDirection;
  const { row: currentRow, col: currentCol } = node.value;
  const { row: nextRow, col: nextCol } = node.next.value;
  if (nextRow === currentRow && nextCol === currentCol + 1) {
    return Direction.Rigth;
  }
  if (nextRow === currentRow && nextCol === currentCol - 1) {
    return Direction.Left;
  }
  if (nextCol === currentCol && nextRow === currentRow + 1) {
    return Direction.Down;
  }
  if (nextCol === currentCol && nextRow === currentRow - 1) {
    return Direction.Up;
  }
  return "";
};

export const getGrowthNodeCoords = (
  snakeTail: LinkedListNode,
  currentDirection: string
): Coords => {
  const tailNextNodeDirection = getNextNodeDirection(
    snakeTail,
    currentDirection
  );
  const growthDirection = getOppositeDirection(tailNextNodeDirection);
  const currentTailCoords = {
    row: snakeTail.value.row,
    col: snakeTail.value.col,
  };
  const growthNodeCoords = getCoordsInDirection(
    currentTailCoords,
    growthDirection
  );
  return growthNodeCoords;
};

export const getOppositeDirection = (direction: string): string => {
  if (direction === Direction.Up) return Direction.Down;
  if (direction === Direction.Rigth) return Direction.Left;
  if (direction === Direction.Down) return Direction.Up;
  if (direction === Direction.Left) return Direction.Rigth;
  return "";
};

export const getCellClassName = (
  cellValue: number,
  foodCell: number,
  snakeCells: Set<number>
) => {
  let className = "cell";
  if (cellValue === foodCell) {
    className = "cell cell-red";
  }
  if (snakeCells.has(cellValue)) className = "cell cell-green";

  return className;
};
