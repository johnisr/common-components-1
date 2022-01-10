import React, { useState } from "react";
import { AutoSizer } from "react-virtualized";
import { Button, Page, Panel, Title } from "../..";
import Datatable from "../Datatable";
import moment from "moment";
import config from "../../../config";
import { PrintJson } from "../../Form/Stories/FormStoryHelpers";
import useDatatableFilter, { filterList } from "./useDatatableFilter";
import { DatatableHeaderType } from "../../types/Table/Datatable";

export type ChainOfCustodyType = {
  id: string;
  name: string;
  state: string;
  site: { id: number; name: string };
  received_at: Date;
  issued_at: Date;
  user: { email: string };
  type: string;
  code: string;
};

type DatatableWithFilterTemplatePropsType = {
  list: ChainOfCustodyType[];
  headers: DatatableHeaderType<ChainOfCustodyType>[];
  height: number;
  width?: number;
  defaultSortDirection: "asc" | "desc";
  addButtonName?: string;
  headerHeight?: number;
};

const statusRenderer = (rowData: Record<string, any>) => {
  return rowData.state === "received" ? "successful" : "pending";
};

const dateRenderer = (rowData: Record<string, any>, columnKey: string) => {
  return moment(rowData[columnKey]).format(config.DATETIME_FORMAT);
};

export const Headers = [
  {
    label: "Name",
    key: "name",
    width: 200,
    fixed: true,
  },
  {
    label: "Status",
    key: "state",
    width: 100,
    cellRenderer: statusRenderer,
    fixed: true,
  },
  {
    label: "Issued By",
    key: "user.email",
    width: 200,
  },
  {
    label: "Issued To",
    key: "type",
    width: 100,
  },
  {
    label: "Validere ID",
    key: "code",
    width: 125,
  },
  {
    label: "Site",
    key: "site.name",
    width: 200,
  },
  {
    label: "Date Issued",
    key: "issued_at",
    width: 200,
    cellRenderer: dateRenderer,
  },
];

const DatatableWithFilterTemplate = (
  props: DatatableWithFilterTemplatePropsType
) => {
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [selectedData, setSelectedData] = useState<
    ChainOfCustodyType | ChainOfCustodyType[] | null
  >(null);

  const [filterRow, filterPillbox, filteredList] = useDatatableFilter(
    props.list,
    filterList
  );

  const onAddClick = () => {
    setSelectedData(null);
    setSelectedAction("onAddClick");
  };

  const onCSVClick = (list: ChainOfCustodyType[]) => {
    setSelectedData(list);
    setSelectedAction("onCSVClick");
  };

  const onCellClick = (rowData: ChainOfCustodyType, action = "onCellClick") => {
    setSelectedData(rowData);
    setSelectedAction(action);
  };

  const actionDropdown = [
    {
      title: "Edit Chain of Custody",
      onClick: (rowData: ChainOfCustodyType) =>
        onCellClick(rowData, "actionDropdownItem"),
    },
    {
      title: "Duplicate Chain Of Custody",
      onClick: (rowData: ChainOfCustodyType) =>
        onCellClick(rowData, "actionDropdownItem"),
    },
  ];

  return (
    <Page>
      <Panel>
        <div
          style={{
            height: props.height,
            width: props.width ? props.width : undefined,
          }}
        >
          <AutoSizer>
            {({ height, width }) => (
              <Datatable
                {...props}
                // for some reason, storybook doesn't pass down defaultSortDirection
                defaultSortDirection={props.defaultSortDirection ?? "desc"}
                width={width}
                height={height}
                headers={Headers}
                onAddClick={onAddClick}
                csvDownload={onCSVClick}
                onCellClick={onCellClick}
                actionDropdown={actionDropdown}
                list={filteredList}
                noFilterListCount={props.list.length}
                filterRow={filterRow}
                filterPillbox={filterPillbox}
              />
            )}
          </AutoSizer>
        </div>
      </Panel>

      {(selectedData || selectedAction) && (
        <Panel>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title>Action: {selectedAction}</Title>
            <Button
              onClick={() => {
                setSelectedAction("");
                setSelectedData(null);
              }}
            >
              Clear Data
            </Button>
          </div>
          <PrintJson data={selectedData} />
        </Panel>
      )}
    </Page>
  );
};

export default DatatableWithFilterTemplate;
