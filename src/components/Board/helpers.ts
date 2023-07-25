import { Neighbour } from "./Board";
export const calculationCoordinatesNeighboringSquares = (
  width: number,
  height: number
): Neighbour[] => {
  return Array.from({ length: width * height }).map<Neighbour>((v, i) => {
    let row = 1;
    if (i > 0) {
      row = Math.trunc(i / width) + 1;
    }
    let column = 1;
    if (row === 1) {
      column = i + 1;
    } else {
      column = (i % width) + 1;
    }
    return {
      topLeft: (function () {
        if (column === 1 || row === 1) {
          return null;
        }
        return i - width - 1;
      })(),
      top: (function () {
        if (row === 1) {
          return null;
        }
        return i - width;
      })(),
      topRight: (function () {
        if (row === 1 || column === width) {
          return null;
        }
        return i - width + 1;
      })(),
      left: (function () {
        if (column === 1) {
          return null;
        }
        return i - 1;
      })(),
      right: (function () {
        if (column === width) {
          return null;
        }
        return i + 1;
      })(),
      bottomLeft: (function () {
        if (row === height || column === 1) {
          return null;
        }
        return i + width - 1;
      })(),
      bottom: (function () {
        if (row === height) {
          return null;
        }
        return i + width;
      })(),

      bottomRight: (function () {
        if (row === height || column === width) {
          return null;
        }
        return i + width + 1;
      })(),
    };
  });
};

export const generateNextBoard = (
  board: boolean[],
  neighbours: Neighbour[]
): boolean[] => {
  return board.map((v, i) => {
    const neighbour: Neighbour = neighbours[i];
    let countAliveSquare = 0;
    for (const key in neighbour) {
      const index: number | null = neighbour[key];
      if (index && board[index]) {
        countAliveSquare++;
      }
    }
    // мёртвая клетка, чтобы оживить, нужно рядом найти 3 (не больше не меньше) живых клетки)
    if (!v) {
      return !v && countAliveSquare === 3;
    }
    return countAliveSquare === 3 || countAliveSquare === 2;
  });
};
export const hashcode = (arr: boolean[]) => {
  if (!Array.isArray(arr)) {
    throw new TypeError("Arr is not array");
  }
  let hash = 0;
  for (let i = 0; i < arr.length; i++) {
    hash = (hash << 5) - hash + Number(arr[i]);
    hash |= 0;
  }
  return hash;
};
