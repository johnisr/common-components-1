import React from "react";
import { storiesOf } from "@storybook/react";
import "./index.css";
import PropTypeRow from "./Common/PropTypeRow";

storiesOf("Main", module)
  .add("Introductions", () => (
    <div className="container">
      <section>
        <div className="header">Introductions</div>
        <p>
          Storybook is a UI development environment and playground for UI
          components. The tool enables users to create components independently
          and showcase components interactively in an isolated development
          environment.
          <br />
          <br />
          Storybook runs outside of the main app so users can develop UI
          components in isolation without worrying about app specific
          dependencies or requirements.
          <br />
          <br />
          Storybook also supports a lot of addons and comes with a flexible API
          to customize Storybook as desired. You can customize Storybook under
          <span className="code">/.storybook/config.</span>
        </p>
      </section>

      <section>
        <div className="header">Getting Started</div>
        <p>
          To start the storybook app run:
          <div className="codeblock">npm run storybook</div>
        </p>

        <p>
          The Storybook application will start on
          <div className="codeblock">
            http://localhost:9001/
            <br />
            <br />
            http://192.168.87.88:9001/
          </div>
        </p>
      </section>
    </div>
  ))
  .add("Stories Guidelines", () => (
    <div className="container">
      <div className="header">Stories Guidelines</div>
      <section>
        <div className="header">Title</div>
        <p>
          A detailed description of your component and an example of the your
          component.
        </p>
      </section>

      <section>
        <div className="header">PropTypes</div>
        <p>List all the available propTypes and their requirements.</p>
        <PropTypeRow
          title="Example"
          type="type"
          description="A detail description of the properties"
          isRequired={true}
        />
      </section>
    </div>
  ));
