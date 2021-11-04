import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  addAlertType,
  AlertVariants,
  AlertPosition,
  useManageAlertsType,
} from "../types/Alert";
import { isPositionTop } from "./AlertHelper";

export const defaultAlert = {
  id: null,
  variant: AlertVariants.Normal,
  showIcon: true,
};

const useManageAlerts = ({
  maxAlerts = 5,
  timeout = 5000,
  position = AlertPosition.Bottomleft,
}): useManageAlertsType => {
  const [alertList, setAlertList] = useState<addAlertType[]>([]);

  const isTop = isPositionTop(position);

  const removeById = (id?: string) => {
    if (id) {
      setAlertList((alertList) =>
        alertList.filter((alert) => alert?.id !== id)
      );
    }
  };

  const removeAlert = () => {
    if (isTop) {
      setAlertList((alertList) => alertList.slice(0, -1));
    } else {
      setAlertList((alertList) => alertList.slice(1));
    }
  };

  const addAlert = (messageProps: addAlertType) => {
    const id = uuidv4();
    if (alertList.length + 1 > maxAlerts) {
      removeAlert();
    }

    const newAlertMessage = {
      ...defaultAlert,
      ...messageProps,
      id,
    };

    setAlertList((alertList) => {
      return isTop
        ? [newAlertMessage, ...alertList]
        : [...alertList, newAlertMessage];
    });

    setTimeout(() => {
      removeById(id);
    }, timeout);
  };

  return { alertList, addAlert, removeAlert, removeById };
};

export default useManageAlerts;
