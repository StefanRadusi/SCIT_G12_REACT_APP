import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Header } from "./components/Header";
import { HomePage } from "./components/Pages/HomePage/HomePage";
import { MealPage } from "./components/Pages/MealPage/MealPage";

// it is easier to look for 'render' function for find out what the component will render
class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Header />

          <Switch>
            <Route path="/" exact component={HomePage} />

            <Route path="/meals" exact component={MealPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
