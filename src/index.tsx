import React from "react";
import ReactDOM from "react-dom/client";
import "./style.modules.scss";
import { Container } from "./components/Container/Container";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";

const container: HTMLElement | null = document.getElementById("root");
const root = ReactDOM.createRoot(container!);
root.render(
  <Provider store={store}>
    <Container />
  </Provider>
);
// в стрикто моде работает некорректно, есть подозрение, что происходит это из за варнинга, проверить при редаксе
