import React from "react";
import ReactDOM from "react-dom/client";
import "./style.modules.scss";
import { Container } from "./components/Container/Container";

const container: HTMLElement | null = document.getElementById("root");
const root = ReactDOM.createRoot(container!);
root.render(<Container />);
// в стрикто моде работает некорректно, есть подозрение, что происходит это из за варнинга, проверить при редаксе
