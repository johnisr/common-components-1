import React from "react";
import Title from "../Title/Title";
import Modal from "./Modal";
import Button from "../Button/Button";
import Page from "../Page/Page";
import { useArgs } from "@storybook/client-api";

const Template = (_args) => {
  const [state, upstateState] = useArgs();
  const onClose = () => upstateState({ open: !state.open });
  return (
    <Page>
      <div>
        Use the `open` control or{" "}
        <span
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => upstateState({ open: true })}
        >
          click here
        </span>{" "}
        to open the modal
      </div>
      <Modal {...state} onClose={onClose} />
    </Page>
  );
};

export const Default = Template.bind({});
Default.args = {
  open: true,
  children: <div>Modal</div>,
};

const withModalComponentChildren = (
  <>
    <Modal.Header>
      <Title>This is the Header</Title>
    </Modal.Header>

    <Modal.Body>Modal content</Modal.Body>

    <Modal.Footer>
      <Button type="primary" onClick={() => alert("button Clicked")}>
        Click here
      </Button>
    </Modal.Footer>
  </>
);

export const withModalComponent = Template.bind({});
withModalComponent.storyName = "Modal with Components";
withModalComponent.args = {
  ...Default.args,
  children: withModalComponentChildren,
};

export default {
  title: "Modal",
  component: Modal,
  parameters: {
    componentSubtitle:
      "A wrapper component that dims the current page and opens up a popup that contains content",
  },
};
