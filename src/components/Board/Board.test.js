import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Board } from "./Board";

describe("Board", () => {
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
});
