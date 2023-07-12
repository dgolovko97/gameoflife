import React, { FunctionComponent } from "react";
import s from "./Square.modules.scss";

type squareProps = {
  number: number;
  getSquareNumber: (number: number) => void;
};
export const Square: FunctionComponent<squareProps> = ({
  number,
  getSquareNumber,
}) => {
  const handleClick = () => {
    getSquareNumber(number);
  };

  return (
    <span
      data-testid="square-element"
      className={s.square}
      onClick={handleClick}
    ></span>
  );
};
