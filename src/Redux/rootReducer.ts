import { Neighbour } from "../components/Board/Board";
import {
  calculationCoordinatesNeighboringSquares,
  generateNextBoard,
  hashcode,
} from "../components/Board/helpers";
const SQUARE_SIZE_PX = 10;
const DEFAULT_WIDTH = 50;
const DEFAULT_HEIGHT = 30;
export type State = {
  board: boolean[];
  isFirstRender: boolean;
  neighbours: Neighbour[];
  intervalId: NodeJS.Timer | number;
  sizeBoard: {
    width: number;
    height: number;
  };
  width: number;
  height: number;
  textInfo: number | string;
  activeSizeButton: string;
  gameAction: gameAction;
  hashCode: number[];
};
export type gameAction = "Run" | "Pause" | "Clear";
type Action<T extends string, P> = {
  type: T;
  payload?: P;
};

type SetBoard = Action<"SET_BOARD", boolean[]>;
type SquareClick = Action<"SQUARE_CLICK", { active: boolean; index: number }>;
type SetBoardSize = Action<
  "SET_BOARD_SIZE",
  { width: number; height: number; buttonName: string }
>;
type SetGameAction = Action<"SET_GAME_ACTION", { action: gameAction }>;
type GameOver = Action<"GAME_OVER", Record<string, never>>;
type Update = Action<"RECALCULATION_BOARD", Record<string, never>>;
type SetIntervalId = Action<
  "SET_INTERVAL_ID",
  { timerId: NodeJS.Timer | number }
>;

type Actions =
  | SetBoard
  | SquareClick
  | SetBoardSize
  | SetGameAction
  | Update
  | SetIntervalId
  | GameOver;

const initSizeBoard = (width: number, height: number): boolean[] => {
  return Array.from({ length: width * height }, () => false);
};

const initialState: State = {
  board: initSizeBoard(DEFAULT_WIDTH, DEFAULT_HEIGHT),
  isFirstRender: true,
  neighbours: calculationCoordinatesNeighboringSquares(
    DEFAULT_WIDTH,
    DEFAULT_HEIGHT
  ),
  intervalId: 0,
  sizeBoard: {
    width: 50 * SQUARE_SIZE_PX,
    height: 30 * SQUARE_SIZE_PX,
  },
  width: 50,
  height: 30,
  textInfo: 0,
  activeSizeButton: "50x30",
  gameAction: "Pause",
  hashCode: [],
};

const rootReducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case "SET_BOARD": {
      const { payload } = action;
      if (typeof payload !== "undefined") {
        return { ...state, board: payload };
      }
      return state;
    }
    case "SQUARE_CLICK": {
      const { payload } = action;
      if (typeof payload === "undefined") {
        return state;
      }
      const board = state.board;
      board[payload.index] = payload.active;
      return { ...state, textInfo: payload.index, board: board };
    }
    case "SET_BOARD_SIZE": {
      const { payload } = action;
      if (typeof payload === "undefined") {
        return state;
      }
      return {
        ...state,
        board: initSizeBoard(payload.width, payload.height),
        activeSizeButton: payload.buttonName,
        sizeBoard: {
          width: payload.width * SQUARE_SIZE_PX,
          height: payload.height * SQUARE_SIZE_PX,
        },
        width: payload.width,
        height: payload.height,
        neighbours: calculationCoordinatesNeighboringSquares(
          payload.width,
          payload.height
        ),
      };
    }
    case "SET_GAME_ACTION": {
      const { payload } = action;
      if (typeof payload === "undefined") {
        return state;
      }
      if (payload.action === "Run") {
        if (state.gameAction === "Run") {
          return state;
        }
        return { ...state, gameAction: "Run", textInfo: "RUNNING..." };
      }
      if (payload.action === "Pause") {
        clearInterval(state.intervalId);
        return {
          ...state,
          gameAction: "Pause",
          intervalId: 0,
          textInfo: "PAUSE",
        };
      }
      if (payload.action === "Clear") {
        return {
          ...state,
          board: initSizeBoard(state.width, state.height),
          gameAction: "Clear",
          textInfo: "CLEAR",
        };
      }
      return state;
    }
    case "RECALCULATION_BOARD": {
      let result: boolean[] = [];
      result = generateNextBoard(state.board, state.neighbours);
      if (result.every((square) => !square)) {
        clearInterval(state.intervalId);
        return {
          ...state,
          board: result,
          gameAction: "Pause",
          textInfo: "GAME OVER",
        };
      }
      const currentHash = hashcode(result);
      if (state.hashCode.includes(currentHash)) {
        clearInterval(state.intervalId);
        return {
          ...state,
          board: result,
          gameAction: "Pause",
          textInfo: "Game Over",
        };
      }
      return {
        ...state,
        board: result,
        hashCode: [...state.hashCode, currentHash],
      };
    }
    case "SET_INTERVAL_ID": {
      const { payload } = action;
      if (typeof payload === "undefined") {
        return state;
      }
      return { ...state, intervalId: payload.timerId };
    }
    case "GAME_OVER": {
      return { ...state, gameAction: "Pause", textInfo: "GameOver" };
    }
    default: {
      return state;
    }
  }
};
export { rootReducer };
