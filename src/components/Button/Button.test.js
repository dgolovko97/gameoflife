import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Button } from "./Button";

describe("Button", () => {
  it("renders Button component", () => {
    render(<Button />);

    const button = screen.getByTestId("button-element");

    expect(button).toBeInTheDocument();
  });
});
