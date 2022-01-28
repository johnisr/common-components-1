import Panel from "../Panel/Panel";
import React from "react";
import Tooltip from "./Tooltip";
import colors from "../constants/index";

const Template = (args) => (
  <Panel
    style={{
      height: "calc(100vh - 40px)",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Tooltip {...args}>
        <div
          style={{ border: `1px solid ${colors.borderColour}`, padding: 10 }}
        >
          Hover Me
        </div>
      </Tooltip>
    </div>
  </Panel>
);

export const Default = Template.bind({});
Default.args = {
  title: "This is a Headline",
  position: ["left", "top"],
  show: true,
  shouldShowCloseButton: false,
  isWhiteTheme: false,
  content: "This is the tooltip content",
  trigger: "hover",
  align: "end",
};

export default {
  title: "Tooltip",
  component: Tooltip,
  parameters: {
    componentSubtitle:
      "A wrapper component that shows content close to the child component on some trigger. It enforces the same padding and border around the content.",
  },
};
