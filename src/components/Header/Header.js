import React from "react";

import "./Header.css";
import { HeaderButton } from "./components/HeaderButton";

export function Header(props) {
  return (
    <div className="header">
      <HeaderButton
        text="Home"
        selected={props.currentPage === "Home"}
        changePages={props.changePages}
      />
      <HeaderButton
        text="Meal"
        changePages={props.changePages}
        selected={props.currentPage === "Meal"}
      />
    </div>
  );
}
