import React, { Component } from "react";

import "./HeaderButton.css";

export class HeaderButton extends Component {
  handleClick = () => {
    this.props.changePages(this.props.text);
  };

  render() {
    return (
      <div
        className={`header-button${this.props.selected ? " selected" : ""}`}
        onClick={this.handleClick}
      >
        <p>{this.props.text}</p>
      </div>
    );
  }
}
