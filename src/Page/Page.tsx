import React from "react";
import ReactLoader from "../Loader/ReactLoader";
import FontAwesome from "react-fontawesome";
import Title from "../Title/Title";
import "./Page.css";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import PageType from "../types/Page";

/** The default margins are 15px */
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
    <div className={`page ${className}`} style={style}>
      {breadcrumbs && (
        <div className={`${headerClassName}`}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      )}

      {title && (
        <div className="page__titleContainer">
          {onClick && (
            <button
              aria-label="arrow-left-label"
              className="page__link"
              onClick={onClick}
            >
              <FontAwesome name="arrow-left" />
            </button>
          )}

          <Title type="header" className="page__title">
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
