import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./style.modules.scss";
import { Container } from "./components/Container/Container";

const container: HTMLElement | null = document.getElementById("root");
const root = ReactDOM.createRoot(container!);
root.render(
  <StrictMode>
    <Container />
  </StrictMode>
);
