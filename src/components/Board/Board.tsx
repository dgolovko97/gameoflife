import React, { FunctionComponent } from "react";
import s from "./Board.modules.scss";
import { useSelector } from "react-redux";
import { State } from "../../Redux/rootReducer";
import { Square } from "../Square/Square";

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

export const Board: FunctionComponent = () => {
  const { sizeBoard, board } = useSelector((state: State) => state);
  return (
    <div
      className={`${s.field}`}
      style={{ width: sizeBoard.width, height: sizeBoard.height }}
      data-testid="board-element"
    >
      {board.map((v, i) => {
        return <Square key={i} number={i} active={v} />;
      })}
    </div>
  );
};
