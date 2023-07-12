import React, { ButtonHTMLAttributes, FunctionComponent } from "react";
import s from "./Button.modules.scss";

export const Button: FunctionComponent<ButtonHTMLAttributes<any>> = ({
  type = "button",
  children,
  onClick,
  className = "",
  ...props
}) => {
  const preparedClassNames = `${s["gol-btn"]} ${className
    .split(" ")
    .map((name) => s[name])}`;
  return (
    <button
      data-testid="button-element"
      type={type}
      className={preparedClassNames}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
