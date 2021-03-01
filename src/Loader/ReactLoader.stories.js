import React from "react";
import ReactLoader from "./ReactLoader";

const Template = (args) => (
  <div
    style={{
      height: "500px",
      width: "500px",
      position: "relative",
      border: "1px solid black",
    }}
  >
    <ReactLoader {...args}>
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{ margin: "0 auto" }}>Loaded</div>
      </div>
    </ReactLoader>
  </div>
);

export const Loader = Template.bind({});
Loader.args = {
  loaded: false,
  position: 50,
};

export default {
  title: "Loader",
  component: ReactLoader,
  parameters: {
    componentSubtitle: "A wrapper component for those with delayed content.",
  },
};
