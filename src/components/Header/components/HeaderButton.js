import React, { Component } from "react";

import "./HeaderButton.css";

export class HeaderButton extends Component {
  handleClick = () => {
    this.props.changePages(this.props.text);
  };

  render() {
    const { selected, text } = this.props;

    return (
      <div
        className={`header-button${selected ? " selected" : ""}`}
        onClick={this.handleClick}
      >
        <p>{text}</p>
      </div>
    );
  }
}
