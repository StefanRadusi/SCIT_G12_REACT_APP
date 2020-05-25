import React, { Component } from "react";

import { Header } from "./components/Header";
import { HomePage } from "./components/Pages/HomePage/HomePage";
import { MealPage } from "./components/Pages/MealPage/MealPage";

class App extends Component {
  state = {
    currentPage: "Meal",
    currentLetter: "A",
  };

  changePages = (pageName) => {
    this.setState({ currentPage: pageName });
  };

  changeCurrentLetter = (letter) => {
    this.setState({ currentLetter: letter, currentPage: "Meal" });
  };

  render() {
    return (
      <div className="app">
        <Header
          changePages={this.changePages}
          currentPage={this.state.currentPage}
        />
        {this.state.currentPage === "Home" ? (
          <HomePage changeCurrentLetter={this.changeCurrentLetter} />
        ) : (
          <MealPage letter={this.state.currentLetter} />
        )}
      </div>
    );
  }
}

export default App;
