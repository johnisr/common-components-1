/*
    A module to mock react-virtualized with a set height and width as the
    AutoSizer would default to 0 height and width and not render any children
*/

import React from "react";
import { List, Table, Column, Grid, ScrollSync } from "react-virtualized";

const reactVirtualized = jest.genMockFromModule("react-virtualized");
const autoSizerProps = {
  height: 500,
  width: 500,
};

// eslint-disable-next-line react/prop-types
const MockAutoSizer = (props) => <div>{props.children(autoSizerProps)}</div>;

reactVirtualized.AutoSizer = MockAutoSizer;
reactVirtualized.List = List;
reactVirtualized.Table = Table;
reactVirtualized.Column = Column;
reactVirtualized.Grid = Grid;
reactVirtualized.ScrollSync = ScrollSync;

module.exports = reactVirtualized;
