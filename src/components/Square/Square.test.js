import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Square } from "./Square";

describe("Square", () => {
  it("renders Square component", () => {
    render(<Square number={10} />);

    const square = screen.getByTestId("square-element");

    expect(square).toBeInTheDocument();
  });

  it("renders Square component", () => {
    render(<Square number={10} />);

    const square = screen.getByTestId("square-element");

    expect(square).toBeInTheDocument();
  });
});
