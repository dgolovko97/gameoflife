import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Container } from "./Container";

describe("Container", () => {
  it("renders Container component", () => {
    render(<Container />);

    const container = screen.getByTestId("container-element");

    expect(container).toBeInTheDocument();
  });
  it("show number square", () => {
    render(<Container />);

    const square = screen
      .getByTestId("board-element")
      .querySelector("span:nth-child(10)");

    fireEvent.click(square);

    expect(screen.getByTestId("numberfield-element")).toHaveTextContent("9");
  });

  it("correct draw board by 50x30 click", () => {
    render(<Container />);

    const button = screen.getByText("50x30");
    fireEvent.click(button);

    const boardChildren = screen
      .getByTestId("board-element")
      .querySelectorAll("span");

    expect(boardChildren).toHaveLength(1500);
  });

  it("correct draw board by 70x50 click", () => {
    render(<Container />);

    const button = screen.getByText("70x50");
    fireEvent.click(button);

    const boardChildren = screen
      .getByTestId("board-element")
      .querySelectorAll("span");

    expect(boardChildren).toHaveLength(3500);
  });

  it("correct draw board by 100x80 click", () => {
    render(<Container />);

    const button = screen.getByText("100x80");
    fireEvent.click(button);

    const boardChildren = screen
      .getByTestId("board-element")
      .querySelectorAll("span");

    expect(boardChildren).toHaveLength(8000);
  });
});
