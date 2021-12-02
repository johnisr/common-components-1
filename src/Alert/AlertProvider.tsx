import React, { createContext, useContext } from "react";
import classNames from "classnames/bind";
import useManageAlerts from "./useManageAlerts";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { AlertContextType, AlertProviderType } from "../types/Alert";
import Alert from "./Alert";
import { isPositionTop } from "./AlertHelper";
import styles from "./AlertTransitions.module.scss";

const cx = classNames.bind(styles);

export const AlertContext = createContext<Partial<AlertContextType>>({});

/**
 * We can freely add and remove items in `alertList` and those will be animated by
 * TransitionGroup and CSSTransition. TransitionGroup allows for exit animations
 * by keeping it `timeout` ms after removal and applying the exit and exitActive
 * classes to it. Only then is the element unmounted.
 */
const AlertProvider = ({
  children,
  timeout = 5000,
  maxAlerts = 3,
  position = "bottomLeft",
}: AlertProviderType) => {
  const { alertList, addAlert, removeAlert, removeById } = useManageAlerts({
    timeout,
    maxAlerts,
    position,
  });

  return (
    <AlertContext.Provider value={{ addAlert, removeAlert }}>
      <>
        <TransitionGroup className={cx("list", position)}>
          {alertList.map((alert) => {
            const isTop = isPositionTop(position);
            return (
              <CSSTransition
                timeout={timeout}
                classNames={{
                  enter: cx("enter", { "enter--top": isTop }),
                  enterActive: cx("enterActive"),
                  exit: cx("exit"),
                  exitActive: cx("exitActive", { "exitActive--top": isTop }),
                }}
                unmountOnExit
                key={alert.id}
              >
                <div>
                  <Alert {...alert} onClose={() => removeById(alert.id)} />
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>

        {children}
      </>
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);

export default AlertProvider;
