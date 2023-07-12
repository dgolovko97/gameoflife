import React from "react";
import { Container } from "./Container";
export default {
  title: "Container",
  component: Container,
};

const Template = (arg) => <Container {...arg} />;
export const Default = Template.bind({});
Default.args = {};
