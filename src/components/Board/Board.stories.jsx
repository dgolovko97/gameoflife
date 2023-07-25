import React from "react";
import Board from "./Board";

export default {
  title: "Board",
  component: Board,
};

const Template = (arg) => <Board {...arg} />;
export const Default = Template.bind({});
Default.args = {
  width: 50,
  height: 30,
};
