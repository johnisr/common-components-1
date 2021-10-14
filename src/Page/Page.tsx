import React from "react";
import ReactLoader from "../Loader/ReactLoader";
import FontAwesome from "react-fontawesome";
import Title from "../Title/Title";
import "./Page.css";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

type Props = {
  className: string;
  /** The style given to the Page Container */
  style: Object;
  /** The content to be displayed below the title */
  children: React.ReactNode | React.ReactNode[];
  /** The given title of the content */
  title: React.ReactNode[] | React.ReactNode | string;
  /** If present, displays a button that executes a function on click */
  onClick: () => void;
  /** If present, shows uses the ReactLoader component to show a loading image while content is loading */
  loaded: boolean;
  /** An array of { title, onClick } objects, with title being what is displayed
   *  and onClick the function called when the breadcrumb is clicked
   */
  breadcrumbs: Array<string>;
  /** The className applied to the breadcrumbs container */
  headerClassName: string;
};

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
}: Props) => {
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
            <FontAwesome
              name="arrow-left"
              onClick={onClick}
              className="page__link"
            />
          )}

          <Title className="page__title">{title}</Title>
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
