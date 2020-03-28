import React, { Component } from "react";
import { generateLetters } from "./HomePageUtils";

import "./HomePage.css";

export class HomePage extends Component {
  handleOnClick(element) {
    this.props.changeCurrentLetter(element);
    
  }

  render() {
    return (
      <div className="home-page">
        <h1>Choose a meal that start width: </h1>
        {generateLetters().map((element, index) => {
          return (
            <h3 key={index} onClick={() => this.handleOnClick(element)}>
              {element}
            </h3>
          );
        })}
      </div>
    );
  }
}
