import React from "react";
import ReactLoader from "../Loader/ReactLoader";
import FontAwesome from "react-fontawesome";
import Title from "../Title/Title";
import styles from "./Page.module.scss";
import classNames from "classnames/bind";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import PageType from "../types/Page";

const cx = classNames.bind(styles);

/** The default margins are 15px, margin-top being 32px */
const Page = ({
  className = "",
  style,
  title,
  onClick,
  children,
  loaded,
  breadcrumbs,
  headerClassName = "",
}: PageType) => {
  return (
    <div className={`${cx("page")} ${className}`} style={style}>
      {breadcrumbs && (
        <div className={`${cx("breadcrumbsContainer")} ${headerClassName}`}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      )}

      {title && (
        <div className={cx("titleContainer")}>
          {onClick && (
            <button
              aria-label="arrow-left-label"
              className={cx("link")}
              onClick={onClick}
            >
              <FontAwesome name="arrow-left" />
            </button>
          )}

          <Title type="header" className={cx("title")}>
            {title}
          </Title>
        </div>
      )}

      {loaded !== undefined ? (
        <ReactLoader loaded={loaded} position={50}>
          {children}
        </ReactLoader>
      ) : (
        children
      )}
    </div>
  );
};

export default Page;
