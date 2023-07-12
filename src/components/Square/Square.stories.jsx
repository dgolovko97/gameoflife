import React from "react";
import { Square } from "./Square";
export default {
  title: "Square",
  component: Square,
};

const Template = (arg) => <Square {...arg} />;
export const Default = Template.bind({});
Default.args = {
  number: 1,
};
