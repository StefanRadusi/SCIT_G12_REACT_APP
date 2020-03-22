import React, { Component } from "react";

import "./HeaderButton.css";
import { Link } from "react-router-dom";

export class HeaderButton extends Component {
  render() {
    const { selected, text, path } = this.props;

    return (
      <Link to={path} style={{ color: "inherit", textDecoration: "inherit" }}>
        <div className={`header-button${selected ? " selected" : ""}`}>
          <p>{text}</p>
        </div>
      </Link>
    );
  }
}
