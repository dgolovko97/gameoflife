import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Board from "./Board";
import { hashcode } from "./helpers";
import { generateNextBoard } from "./helpers";
import { calculationCoordinatesNeighboringSquares } from "./helpers";

describe("Board", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  it("renders Board component", () => {
    render(<Board width="10" height="10" />);

    const board = screen.getByTestId("board-element");

    expect(board).toBeInTheDocument();
  });

  it("correct Board size", () => {
    const width = 10;
    const height = 10;

    render(<Board width={width} height={height} />);

    const children = screen
      .getByTestId("board-element")
      .querySelectorAll("span");

    expect(children).toHaveLength(100);
  });

  it("Board run", () => {
    const width = 10;
    const height = 10;

    const fn1 = jest.fn();
    const fn2 = jest.fn();

    const { rerender } = render(
      <Board
        width={width}
        height={height}
        currentGameAction=""
        getSquareNumber={fn1}
        handleGameOver={fn2}
      />
    );
    fireEvent.click(screen.getAllByTestId("square-element")[0]);
    fireEvent.click(screen.getAllByTestId("square-element")[1]);

    expect(screen.getAllByTestId("square-element")[0]).toHaveClass("active");
    expect(screen.getAllByTestId("square-element")[1]).toHaveClass("active");

    rerender(
      <Board
        width={width}
        height={height}
        currentGameAction="Run"
        getSquareNumber={fn1}
        handleGameOver={fn2}
      />
    );

    setTimeout(() => {
      expect(screen.getAllByTestId("square-element")[0]).not.toHaveClass(
        "active"
      );
      expect(screen.getAllByTestId("square-element")[1]).not.toHaveClass(
        "active"
      );
    }, 2500);
  });

  it("Run", () => {
    const width = 10;
    const height = 10;
    jest.spyOn(global, "setInterval");
    const { rerender } = render(
      <Board width={width} height={height} currentGameAction="Pause" />
    );
    rerender(<Board width={width} height={height} currentGameAction="Run" />);

    expect(setInterval).toHaveBeenCalledTimes(1);
  });

  it("Pause", () => {
    const width = 10;
    const height = 10;
    jest.spyOn(global, "setInterval");
    const { rerender } = render(
      <Board width={width} height={height} currentGameAction="Pause" />
    );
    rerender(<Board width={width} height={height} currentGameAction="Run" />);

    expect(setInterval).toHaveBeenCalledTimes(1);
  });

  it("Clear", () => {
    const width = 2;
    const height = 2;
    const f1 = jest.fn();
    const { rerender } = render(
      <Board
        width={width}
        height={height}
        currentGameAction="Pause"
        getSquareNumber={f1}
        handleGameOver={f1}
      />
    );

    expect(screen.getAllByTestId("square-element")[0]).not.toHaveClass(
      "active"
    );
    expect(screen.getAllByTestId("square-element")[1]).not.toHaveClass(
      "active"
    );
    expect(screen.getAllByTestId("square-element")[2]).not.toHaveClass(
      "active"
    );

    fireEvent.click(screen.getAllByTestId("square-element")[0]);
    fireEvent.click(screen.getAllByTestId("square-element")[1]);
    fireEvent.click(screen.getAllByTestId("square-element")[2]);

    expect(screen.getAllByTestId("square-element")[0]).toHaveClass("active");
    expect(screen.getAllByTestId("square-element")[1]).toHaveClass("active");
    expect(screen.getAllByTestId("square-element")[2]).toHaveClass("active");

    rerender(
      <Board
        width={width}
        height={height}
        currentGameAction="Clear"
        getSquareNumber={f1}
        handleGameOver={f1}
      />
    );

    expect(screen.getAllByTestId("square-element")[0]).not.toHaveClass(
      "active"
    );
    expect(screen.getAllByTestId("square-element")[1]).not.toHaveClass(
      "active"
    );
    expect(screen.getAllByTestId("square-element")[2]).not.toHaveClass(
      "active"
    );
  });

  it("hashcode input parameter is array", () => {
    expect(() => {
      hashcode("");
    }).toThrow("Arr is not array");
  });

  it("hashcode return correct value", () => {
    expect(hashcode([true, false])).toEqual(31);
  });

  it("algorithm generate next board", () => {
    const previous = Array.from({ length: 100 }, (i) => {
      return i === 11 || i === 12 || i === 21;
    });
    const neighbour = calculationCoordinatesNeighboringSquares(10, 10);

    const next = generateNextBoard(previous, neighbour);

    expect(next).toEqual(
      Array.from({ length: 100 }, (i) => {
        return i === 11 || i === 12 || i === 21 || i === 22;
      })
    );
  });
});
