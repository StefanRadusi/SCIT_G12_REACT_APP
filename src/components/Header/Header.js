import React from "react";

import "./Header.css";
import { HeaderButton } from "./components/HeaderButton";
import { useLocation } from "react-router-dom";

function isSelected(url, componentName) {
  if (url === "/" && componentName === "home") return true;
  return url.includes(componentName);
}

export function Header(props) {
  const { pathname } = useLocation();

  return (
    <div className="header">
      <HeaderButton
        text="Home"
        selected={isSelected(pathname, "home")}
        path="/"
      />
      <HeaderButton
        text="Meal"
        selected={isSelected(pathname, "meals")}
        path="meals"
      />
    </div>
  );
}
