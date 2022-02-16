import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { Popover, ArrowContainer } from "react-tiny-popover";
import styles from "./Tooltip.module.scss";
import FontAwesome from "react-fontawesome";
import TooltipType, { triggerType } from "../types/Tooltip";
import colors from "../constants/index";
import { Title } from "..";

const cx = classNames.bind(styles);

const DEFAULT_MAX_WIDTH = 300;

const Tooltip = ({
  show = false,
  position = ["top", "left"],
  shouldShowCloseButton = false,
  title,
  content,
  width,
  isWhiteTheme = false,
  trigger = "hover",
  align = "center",
  children,
  className,
}: TooltipType) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(show);

  useEffect(() => {
    setIsPopoverOpen(show);
  }, [show]);

  const togglePopover = (togglePopover: boolean, trigger: triggerType) => {
    if (trigger === "hover" && show === false) {
      setIsPopoverOpen(togglePopover);
    }
  };

  const displayTooltipOnClick = (
    togglePopover: boolean,
    trigger: triggerType
  ) => {
    if (trigger === "click") {
      setIsPopoverOpen(togglePopover);
    }
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={position}
      align={align}
      padding={10}
      onClickOutside={() => setIsPopoverOpen(false)}
      containerClassName={cx("tooltipContainer")}
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor={colors.surface.light}
          arrowSize={8}
          arrowStyle={{ boxShadow: "none" }}
          className="popover-arrow-container"
          arrowClassName="popover-arrow"
        >
          <div
            style={
              width ? { maxWidth: width } : { maxWidth: DEFAULT_MAX_WIDTH }
            }
            className={cx("tooltip", isWhiteTheme ? "tooltip--white" : null)}
            role="tooltip"
          >
            <div className={cx("titleContainer")}>
              <Title
                style={
                  isWhiteTheme
                    ? { color: colors.primary["600"] }
                    : { color: colors.background.white }
                }
                className={cx("title")}
                type="subheader"
              >
                {title}
              </Title>
              {shouldShowCloseButton && (
                <div>
                  <button
                    aria-label="close"
                    className={cx(
                      "closeButton",
                      isWhiteTheme ? "closeButton--white" : null
                    )}
                    onClick={() => setIsPopoverOpen(false)}
                  >
                    <FontAwesome name="fal fa-times" />
                  </button>
                </div>
              )}
            </div>
            <div role="content" className={className ?? ""}>
              {content}
            </div>
          </div>
        </ArrowContainer>
      )}
    >
      <div
        onMouseOver={() => togglePopover(true, trigger)}
        onMouseLeave={() => togglePopover(false, trigger)}
        onClick={() => displayTooltipOnClick(true, trigger)}
        className={cx("container")}
        role="target"
      >
        {children}
      </div>
    </Popover>
  );
};

export default Tooltip;
