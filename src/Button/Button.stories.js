import React, { useState } from "react";
import { useArgs } from "@storybook/client-api";
import Page from "../Page/Page";
import Panel from "../Panel/Panel";
import Button from "./Button";

const Template = (args) => {
  const [_state, updateState] = useArgs();
  const [counter, setCounter] = useState(0);
  const [responseTime, setResponseTime] = useState(1000);

  const onClick = async () => {
    updateState({ isLoading: true });

    await new Promise((resolve) => setTimeout(resolve, responseTime));
    setCounter((counter) => counter + 1);

    updateState({ isLoading: false });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    updateState({ isLoading: true });

    await new Promise((resolve) => setTimeout(resolve, responseTime));
    alert(`Form submitted with counter value ${counter}`);
    setCounter(0);

    updateState({ isLoading: false });
  };

  return (
    <Page>
      <form onSubmit={onSubmit} onReset={() => setCounter(0)}>
        <Panel title="Counter">{counter}</Panel>

        <Panel
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button {...args} onClick={args.type === "button" ? onClick : null} />

          <div>
            <label style={{ marginRight: "10px" }} htmlFor="responseTime">
              Response Time
            </label>
            <input
              id="responseTime"
              style={{ marginTop: "20px" }}
              type="number"
              value={responseTime}
              onChange={(e) => setResponseTime(e.target.value)}
              step={500}
            />
          </div>
        </Panel>
      </form>
    </Page>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: "button text",
  variant: "primary",
  size: "small",
  type: "button",
  disabled: false,
  isLoading: false,
  iconPosition: "left",
  icon: "arrow-left",
};

export default {
  title: "Button",
  component: Button,
  parameters: {
    componentSubtitle: "A button component",
  },
  argTypes: {
    children: { type: "string" },
  },
};
