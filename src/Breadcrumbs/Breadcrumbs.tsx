import React from "react";
import FontAwesome from "react-fontawesome";
import { BreadcrumbType, BreadcrumbsType } from "../types/Breadcrumbs";
import styles from "./Breadcrumbs.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Breadcrumb = ({ title, onClick, isLastBreadcrumb }: BreadcrumbType) => {
  return isLastBreadcrumb ? (
    <div
      className={cx("item", "item--last")}
      aria-label="breadcrumbs-label"
      aria-current="location"
      role="breadcrumbs"
    >
      {title}
    </div>
  ) : (
    <div
      className={cx("item")}
      role="breadcrumbs"
      aria-label="breadcrumbs-label"
    >
      <a className={cx("link")} onClick={onClick}>
        {title}
      </a>

      <FontAwesome className={`${cx("icon")} fa-fw`} name="angle-right" />
    </div>
  );
};

const Breadcrumbs = ({ breadcrumbs, className, style }: BreadcrumbsType) => {
  return breadcrumbs?.length ? (
    <div className={`${cx("breadcrumbs")} ${className || ""}`} style={style}>
      {breadcrumbs.map(({ title, onClick }, index) => {
        const isLastBreadcrumb = index === breadcrumbs.length - 1;

        return (
          <Breadcrumb
            key={title}
            title={title}
            onClick={onClick}
            isLastBreadcrumb={isLastBreadcrumb}
          />
        );
      })}
    </div>
  ) : null;
};

export default Breadcrumbs;
