import { useState, useLayoutEffect } from "react";

const SIDEBAR_STATE_LOCAL_STORAGE_KEY = "sidebar_state";
const EXPAND_VIEW = "expandView";
const COLLAPSE_VIEW = "collapseView";
const FIXED_VIEW = "fixedView";

const useSidebarLayout = (localStorageKey) => {
  const localStorageState = localStorage.getItem(
    localStorageKey ?? SIDEBAR_STATE_LOCAL_STORAGE_KEY
  );
  const [sidebarView, setSidebarView] = useState(localStorageState);

  const onPinClick = () => {
    // if sidebar is already pinned then we remove the fixed view
    sidebarView === FIXED_VIEW ? setView(EXPAND_VIEW) : setView(FIXED_VIEW);
  };

  const setView = (view) => {
    setSidebarView(view);
    localStorage.setItem(
      localStorageKey ?? SIDEBAR_STATE_LOCAL_STORAGE_KEY,
      view
    );
  };

  const expandSidebar = () => {
    if (sidebarView !== FIXED_VIEW && sidebarView === COLLAPSE_VIEW) {
      setView(EXPAND_VIEW);
    }
  };

  const collapseSidebar = () => {
    if (sidebarView !== FIXED_VIEW && sidebarView === EXPAND_VIEW) {
      setView(COLLAPSE_VIEW);
    }
  };

  useLayoutEffect(() => {
    if (localStorageState) {
      setSidebarView(localStorageState);
    } else {
      setView(COLLAPSE_VIEW);
    }
  });

  const isExpanded = sidebarView !== COLLAPSE_VIEW;
  const isPinned = sidebarView === FIXED_VIEW;

  return { isExpanded, isPinned, expandSidebar, collapseSidebar, onPinClick };
};

export default useSidebarLayout;
