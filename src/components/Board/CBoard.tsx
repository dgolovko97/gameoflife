import React, { Component } from "react";
import { eventButtonsType } from "../Container/Container";
import { calculationCoordinatesNeighboringSquares } from "./helpers";
import s from "./Board.modules.scss";
import { Square } from "../Square/Square";
import { CSquare } from "../Square/CSquare";
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
type CBoardProps = {
  width: number;
  height: number;
  getSquareNumber: (number: number) => void;
  handleGameOver: () => void;
  currentGameAction: eventButtonsType;
};
type CBoardState = {
  board: boolean[];
  neighbours: Neighbour[];
  hashes: number[];
  users: { id: number; name: string }[];
  timerId: number;
  count: number;
};
export class CBoard extends Component<CBoardProps, CBoardState> {
  constructor(props: CBoardProps) {
    super(props);
    this.state = {
      board: Array.from(
        { length: this.props.width * this.props.height },
        () => false
      ),
      neighbours: calculationCoordinatesNeighboringSquares(
        this.props.width,
        this.props.height
      ),
      hashes: [],
      users: [],
      timerId: 0,
      count: 0,
    };
    this.handleClickSquare = this.handleClickSquare.bind(this);
  }

  handleClickSquare(index: number, active: boolean) {
    this.props.getSquareNumber(index);
    const board = this.state.board;
    board[index] = active;
    this.setState({ board: board });
  }

  async componentDidMount() {
    const users = await fetch("https://jsonplaceholder.typicode.com/users");
    users.json().then((data) => {
      const fetchUsers = data.map((v, i) => {
        return {
          id: v.id,
          name: v.name,
        };
      });
      setInterval(() => {
        this.setState((prevState) => {
          return { count: prevState.count + 1 };
        });
      }, 500);
      this.setState({ users: fetchUsers });
    });
    console.log("componentDidMount");
  }
  componentWillUnmount() {
    clearInterval(this.state.timerId);
    console.log("componentWillUnmount", this);
  }
  componentDidUpdate(prevProps: Readonly<CBoardProps>) {
    if (prevProps.width !== this.props.width) {
      this.setState({
        board: Array.from({ length: this.props.width * this.props.height }).map(
          () => false
        ),
      });
    }
  }

  render() {
    return (
      <>
        <div
          className={`${s.field}`}
          style={{
            width: this.props.width * 10,
            height: this.props.height * 10,
          }}
          data-testid="board-element"
        >
          {this.state.board.map((v, i) => {
            return (
              <CSquare
                key={i}
                number={i}
                active={v}
                changeActive={this.handleClickSquare}
                currentGameAction={this.props.currentGameAction}
              />
            );
          })}
        </div>
        <div>
          <h1>Таймер</h1>
          <div>{this.state.count}</div>
          <h1>Users</h1>
          {this.state.users.map((v) => v.name + " " + v.id)}
        </div>
      </>
    );
  }
}
