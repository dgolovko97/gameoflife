import React, { FunctionComponent } from "react";
import { Square } from "../Square/Square";
import s from "./Board.modules.scss";

type FieldProps = {
  width: number;
  height: number;
  getSquareNumber: (number: number) => void;
};

export const Board: FunctionComponent<FieldProps> = ({
  width,
  height,
  getSquareNumber,
}) => {
  const squareSize = 10;
  const fieldW = width * squareSize;
  const fieldH = height * squareSize;
  const countSquare = width * height;
  const drawFieldSquare = () => {
    const content = [];
    for (let i = 0; i < countSquare; i++) {
      content.push(
        <Square key={i} number={i} getSquareNumber={getSquareNumber} />
      );
    }
    return content;
  };
  return (
    <div
      className={s.field}
      style={{ width: fieldW, height: fieldH }}
      data-testid="board-element"
    >
      {drawFieldSquare()}
    </div>
  );
};
