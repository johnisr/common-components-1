import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  addAlertType,
  useManageAlertsType,
  useManageAlertsArgumentsType,
} from "../types/Alert";
import { isPositionTop } from "./AlertHelper";

export const defaultAlert: addAlertType = {
  id: undefined,
  variant: "normal",
  showIcon: true,
  message: undefined,
};

const useManageAlerts = ({
  maxAlerts = 5,
  timeout = 5000,
  position = "bottomLeft",
}: useManageAlertsArgumentsType): useManageAlertsType => {
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

  const addAlert = (newAlert: addAlertType) => {
    const id = uuidv4();
    if (alertList.length + 1 > maxAlerts) {
      removeAlert();
    }
    const newAlertMessage = {
      ...defaultAlert,
      ...newAlert,
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
