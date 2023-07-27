import React, {
  FunctionComponent,
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Square } from "../Square/Square";
import s from "./Board.modules.scss";
import { eventButtonsType } from "../Container/Container";
import { calculationCoordinatesNeighboringSquares } from "./helpers";
import { generateNextBoard } from "./helpers";
import { hashcode } from "./helpers";

type FieldProps = {
  width: number;
  height: number;
  getSquareNumber: (number: number) => void;
  handleGameOver: () => void;
  currentGameAction: eventButtonsType;
  speed: number;
};
export type NeighbourPosition =
  | "top"
  | "topLeft"
  | "topRight"
  | "left"
  | "right"
  | "bottomLeft"
  | "bottom"
  | "bottomRight";
export type Neighbour = {
  [key in NeighbourPosition as string]: number | null;
};

const Board: FunctionComponent<FieldProps> = memo(
  ({
    width,
    height,
    getSquareNumber,
    handleGameOver,
    currentGameAction,
    speed,
  }: FieldProps) => {
    const squareSize = 10;
    const fieldW = width * squareSize;
    const fieldH = height * squareSize;

    const createInitialBoard = (): boolean[] => {
      return Array.from({ length: width * height }, () => false);
    };

    const [board, setBoard] = useState<boolean[]>(createInitialBoard);
    const isFirstRender = useRef<boolean>(true);
    const [neighbours, setNeighbours] = useState<Neighbour[]>([]);
    const [intervalId, setIntervalId] = useState<NodeJS.Timer | number>(0);
    const [arraysHash, setArraysHash] = useState<number[]>([]);

    const prevSpeedRef = useRef<number>(300);

    useLayoutEffect(() => {
      setBoard(createInitialBoard);
      setNeighbours(() =>
        calculationCoordinatesNeighboringSquares(width, height)
      );
    }, [width, height]);
    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      if (currentGameAction === "Run") {
        if (intervalId) {
          clearInterval(intervalId);
        }
        setArraysHash([hashcode(board)]);
        const interval = setInterval(() => {
          setBoard((prevBoard) => {
            let result: boolean[] = [];
            result = generateNextBoard(prevBoard, neighbours);

            if (result.every((square) => !square)) {
              clearInterval(intervalId);
              handleGameOver();
              return result;
            }

            setArraysHash((prev) => {
              const currentHash = hashcode(result);
              if (prev.includes(currentHash)) {
                clearInterval(intervalId);
                handleGameOver();
              }
              return [...prev, currentHash];
            });
            return result;
          });
        }, speed);
        setIntervalId(interval);
        return;
      }
      if (currentGameAction === "Pause") {
        clearInterval(intervalId);
        setIntervalId(0);
        return;
      }
      if (currentGameAction === "Clear") {
        clearInterval(intervalId);
        setBoard(createInitialBoard);
        return;
      }
    }, [currentGameAction, speed]);

    const handleClickSquare = (index: number, active: boolean) => {
      getSquareNumber(index);
      setBoard((prev) => {
        prev[index] = active;
        return [...prev];
      });
    };

    const drawFieldSquare = () => {
      const content: JSX.Element[] = [];
      board.map((v, i) => {
        content.push(
          <Square
            key={i}
            number={i}
            active={v}
            changeActive={handleClickSquare}
            currentGameAction={currentGameAction}
          />
        );
      });
      return content;
    };
    return (
      <div
        className={`${s.field}`}
        style={{ width: fieldW, height: fieldH }}
        data-testid="board-element"
      >
        {drawFieldSquare()}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.currentGameAction === nextProps.currentGameAction &&
      prevProps.width === nextProps.width &&
      prevProps.height === nextProps.height &&
      prevProps.speed === nextProps.speed
    );
  }
);
Board.displayName = "Board";
export default Board;
