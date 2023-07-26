import React, { Component } from "react";
import { eventButtonsType } from "../Container/Container";
import s from "./Square.modules.scss";

type CSquareProps = {
  number: number;
  changeActive: (number: number, active: boolean) => void;
  active: boolean;
  currentGameAction: eventButtonsType;
};

export class CSquare extends Component<CSquareProps> {
  constructor(props: CSquareProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps: Readonly<CSquareProps>): boolean {
    return this.props.active !== nextProps.active;
  }

  handleClick() {
    if (this.props.currentGameAction === "Run") {
      return;
    }

    this.props.changeActive(this.props.number, !this.props.active);
  }
  render() {
    const activeClass = this.props.active ? s.active : "";
    return (
      <span
        data-testid="square-element"
        className={`${s.square} ${activeClass}`}
        onClick={this.handleClick}
      ></span>
    );
  }
}
