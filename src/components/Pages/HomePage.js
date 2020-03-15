import React, { Component } from "react";

import "./HomePage.css";

export class HomePage extends Component {
  render() {
    return (
      <div className="home-page" onClick={this.increase}>
        <h1>Choose a meal that start width: </h1>
        {["A", "B", "C"].map(element => {
          return <h3> {element} </h3>;
        })}
      </div>
    );
  }
}
