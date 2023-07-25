import React, { FunctionComponent, useEffect, useState, memo } from "react";
import s from "./Square.modules.scss";
import { eventButtonsType } from "../Container/Container";

type squareProps = {
  number: number;
  changeActive: (number: number, active: boolean) => void;
  active: boolean;
  currentGameAction: eventButtonsType;
};
// eslint-disable-next-line react/display-name
export const Square: FunctionComponent<squareProps> = memo(
  // eslint-disable-next-line react/prop-types
  ({ number, changeActive, active, currentGameAction }) => {
    const handleClick = () => {
      if (currentGameAction === "Run") {
        return;
      }

      changeActive(number, !active);
    };

    const activeClass = active ? s.active : "";

    return (
      <span
        data-testid="square-element"
        className={`${s.square} ${activeClass}`}
        onClick={handleClick}
      ></span>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.active === nextProps.active &&
      prevProps.currentGameAction === nextProps.currentGameAction
    );
  }
);
