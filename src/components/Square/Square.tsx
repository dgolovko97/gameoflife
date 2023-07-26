import React, { FunctionComponent, memo } from "react";
import s from "./Square.modules.scss";
import { useDispatch } from "react-redux";

type squareProps = {
  number: number;
  active: boolean;
};
export const Square: FunctionComponent<squareProps> = memo(
  ({ active, number }: squareProps) => {
    const activeClass = active ? s.active : "";
    const dispatch = useDispatch();
    const click = () => {
      dispatch({
        type: "SQUARE_CLICK",
        payload: { active: !active, index: number },
      });
    };
    return (
      <span
        data-testid="square-element"
        className={`${s.square} ${activeClass}`}
        onClick={click}
      ></span>
    );
  },
  (prev, next) => {
    return prev.active === next.active;
  }
);
