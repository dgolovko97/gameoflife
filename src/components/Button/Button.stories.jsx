import React from "react";
import { Button } from "./Button";
import {} from "../Square/Square";
export default {
  title: "Button",
  component: Button,
};

const Template = (arg) => <Button {...arg} />;
export const Default = Template.bind({});
Default.args = {
  children: "Start",
};
