import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { Popover, ArrowContainer } from "react-tiny-popover";
import styles from "./Tooltip.module.scss";
import FontAwesome from "react-fontawesome";
import TooltipType, { triggerType } from "../types/Tooltip";
import colors from "../constants/index";
import { Title } from "..";

const cx = classNames.bind(styles);
const Tooltip = ({
  show = false,
  position = ["top", "right", "left", "bottom"],
  shouldShowCloseButton,
  title,
  content,
  width = 350,
  isWhiteTheme = false,
  trigger = "hover",
  align = "end",
  children,
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
            style={{ width }}
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
                type="panelheader"
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
            <div role="content">{content}</div>
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
