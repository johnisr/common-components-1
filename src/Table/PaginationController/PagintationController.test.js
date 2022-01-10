import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import PaginationController from "./PaginationController";

Enzyme.configure({
  adapter: new Adapter(),
});

const PAGINATION_DETAIL = {
  page: 1,
  rowPerPage: 50,
  totalRowCount: 1024,
};

const onPaginationChange = () => {
  null;
};

describe("PaginationController", () => {
  it("should render pagination position correctly", () => {
    const wrapper = mount(
      <PaginationController
        paginationDetail={PAGINATION_DETAIL}
        onPaginationChange={onPaginationChange}
      />
    );

    expect(
      wrapper.find(".paginationController .paginationPosition").text()
    ).toEqual(
      `1 - ${PAGINATION_DETAIL.rowPerPage} of ${PAGINATION_DETAIL.totalRowCount}`
    );
  });

  it("should render pagination input correctly", () => {
    const wrapper = mount(
      <PaginationController
        paginationDetail={PAGINATION_DETAIL}
        onPaginationChange={onPaginationChange}
      />
    );

    expect(
      wrapper
        .find(".paginationController .paginationPage .paginationPage__input")
        .first()
        .props().value
    ).toEqual(1);
  });

  it("should return pagination count correctly on page change", () => {
    const paginationDetail = { ...PAGINATION_DETAIL, page: 2 };

    const wrapper = mount(
      <PaginationController
        paginationDetail={paginationDetail}
        onPaginationChange={onPaginationChange}
      />
    );

    expect(
      wrapper.find(".paginationController .paginationPosition").text()
    ).toEqual(`51 - 100 of ${PAGINATION_DETAIL.totalRowCount}`);
  });

  it("should return pagination count correctly on page change", () => {
    const paginationDetail = { ...PAGINATION_DETAIL, page: 21 };

    const wrapper = mount(
      <PaginationController
        paginationDetail={paginationDetail}
        onPaginationChange={onPaginationChange}
      />
    );

    expect(
      wrapper.find(".paginationController .paginationPosition").text()
    ).toEqual(
      `1001 - ${PAGINATION_DETAIL.totalRowCount} of ${PAGINATION_DETAIL.totalRowCount}`
    );
  });
});
