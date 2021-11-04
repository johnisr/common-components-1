import React from "react";
import Alert from "./Alert";
import Panel from "../Panel/Panel";
import { Button } from "..";
import AlertProvider, { useAlert } from "./AlertProvider";

const Template = (args) => {
  const { addAlert, removeAlert } = useAlert();

  return (
    <Panel
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        margin: "auto 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button
        size="small"
        variant="error-outline"
        onClick={() => removeAlert()}
      >
        Remove Alert
      </Button>

      <Button size="small" variant="primary" onClick={() => addAlert(args)}>
        Show Alert
      </Button>
    </Panel>
  );
};

export const Default = Template.bind({});
Default.args = {
  variant: "success",
  showIcon: true,
  message: "Message has been sent",
  timeout: 5000,
  maxAlerts: 5,
  position: "bottomLeft",
};
Default.decorators = [
  (Story, { args }) => (
    <AlertProvider
      timeout={args.timeout}
      maxAlerts={args.maxAlerts}
      position={args.position}
    >
      <Story />
    </AlertProvider>
  ),
];

export default {
  title: "Alert",
  component: Alert,
  subcomponents: {
    AlertProvider,
  },
  parameters: {
    componentSubtitle:
      "A small informational message shown for a short period of time.",
  },
};
