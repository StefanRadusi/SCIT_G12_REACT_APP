import React, { Component } from "react";
import { generateLetters } from "./HomePageUtils";

import "./HomePage.css";
import { Link } from "react-router-dom";

export class HomePage extends Component {
  render() {
    return (
      <div className="page home-page">
        <h1>Choose a meal that start width: </h1>
        {generateLetters().map((element, index) => {
          return (
            <Link key={index} to={`meals?letter=${element}`}>
              <h3>{element}</h3>
            </Link>
          );
        })}
      </div>
    );
  }
}
