import React from "react";
import * as PropTypes from "prop-types";
import { storiesOf } from "@storybook/react";
import logo_text from "./ValidereLogo/logo_text.png";
import text from "./ValidereLogo/logo_w.png";
import "./Brand.css";

const ColorBlocks = (props) => (
  <div
    className="brand__colorBlocks"
    style={{
      backgroundColor: props.backgroundColor,
      color: props.color,
    }}
  >
    {props.children}
  </div>
);

storiesOf("Brand Guidelines", module)
  .add("Colors", () => (
    <div className="brand__colors">
      <div className="header">Colors</div>
      <ColorBlocks backgroundColor="#0ca5a5" color="#ffffff">
        Teal #0ca5a5
      </ColorBlocks>
      <ColorBlocks backgroundColor="#183e56" color="#ffffff">
        Navy #183e56
      </ColorBlocks>
      <ColorBlocks backgroundColor="#efefef" color="#36576c">
        Grey #efefef
      </ColorBlocks>
    </div>
  ))
  .add("Logos", () => (
    <div className="brand__logos">
      <div className="header">Validere Logo</div>

      <ColorBlocks backgroundColor="#0ca5a5" color="#ffffff">
        <img className="logo" src={logo_text} alt="Validere" />
      </ColorBlocks>

      <ColorBlocks backgroundColor="#183e56" color="#ffffff">
        <img className="logo" src={logo_text} alt="Validere" />
      </ColorBlocks>

      <ColorBlocks backgroundColor="#0ca5a5" color="#ffffff">
        <img className="logo" src={text} alt="Validere" />
      </ColorBlocks>

      <ColorBlocks backgroundColor="#183e56" color="#ffffff">
        <img className="logo" src={text} alt="Validere" />
      </ColorBlocks>
    </div>
  ));

ColorBlocks.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
