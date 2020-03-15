import React, { Component } from "react";

import { Header } from "./components/Header";
import { HomePage } from "./components/Pages/HomePage";
import { MealPage } from "./components/Pages/MealPage";

// it is easier to look for 'render' function for find out what the component will render
class App extends Component {
  // the app holds the state for which page will be render
  state = {
    currentPage: "Home",
    currentLetter: "A"
  };

  // this method is responsible for changing which page is render but it is used by 'HeaderButton' component and it is passed through the props
  changePages = pageName => {
    this.setState({ currentPage: pageName });
  };

  render() {
    return (
      <div className="app">
        <Header
          changePages={this.changePages}
          currentPage={this.state.currentPage}
        />
        {this.state.currentPage === "Home" ? (
          <HomePage />
        ) : (
          <MealPage letter={this.state.currentLetter} />
        )}
      </div>
    );
  }
}

export default App;
