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
  it("Container Clear", () => {
    render(<Container />);

    fireEvent.click(screen.getByTestId("btn-clear"));

    expect(screen.getByTestId("numberfield-element")).toHaveTextContent(
      /Clear/
    );
    expect(screen.getByTestId("btn-clear")).toHaveClass("active");
  });
  it("Container Run", () => {
    render(<Container />);

    fireEvent.click(screen.getByTestId("btn-run"));

    expect(screen.getByTestId("numberfield-element")).toHaveTextContent(
      /Running/
    );
    expect(screen.getByTestId("btn-run")).toHaveClass("active");
  });
  it("Container Pause", () => {
    render(<Container />);

    expect(screen.getByTestId("btn-pause")).toHaveClass("active");

    fireEvent.click(screen.getByTestId("btn-clear"));
    fireEvent.click(screen.getByTestId("btn-pause"));

    expect(screen.getByTestId("numberfield-element")).toHaveTextContent(
      /Pause/
    );

    fireEvent.click(screen.getByTestId("btn-pause"));
    expect(screen.getByTestId("numberfield-element")).toHaveTextContent(
      /Pause/
    );
  });

  it("Container game over", () => {
    render(<Container />);

    fireEvent.click(screen.getByTestId("btn-run"));

    setTimeout(() => {
      expect(screen.getByTestId("btn-pause")).toHaveClass("active");
      expect(screen.getByTestId("numberfield-element")).toHaveTextContent(
        /Game Over/
      );
    }, 1500);
  });
});
