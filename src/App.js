import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Header } from "./components/Header";
import { HomePage } from "./components/Pages/HomePage/HomePage";
import { MealPage } from "./components/Pages/MealPage/MealPage";

// it is easier to look for 'render' function for find out what the component will render
class App extends Component {
  // the app holds the state for which page will be render
  state = {
    currentPage: "Meal",
    currentLetter: "A"
  };

  // this method is responsible for changing which page is render but it is used by 'HeaderButton' component and it is passed through the props
  changePages = pageName => {
    this.setState({ currentPage: pageName });
  };

  changeCurrentLetter = letter => {
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

    //   <Router>
    //   <div>
    //     <ul>
    //       <li>
    //         <Link to="/">Home</Link>
    //       </li>
    //       <li>
    //         <Link to="/meals">Meal</Link>
    //       </li>
    //     </ul>

    //     <hr />

    //     {/*
    //       A <Switch> looks through all its children <Route>
    //       elements and renders the first one whose path
    //       matches the current URL. Use a <Switch> any time
    //       you have multiple routes, but you want only one
    //       of them to render at a time
    //     */}
    //     <Switch>
    //       <Route exact path="/">
    //         <HomePage />
    //       </Route>
    //       <Route path="/meals">
    //         <MealPage />
    //       </Route>
    //     </Switch>
    //   </div>
    // </Router>

     
    );
  }
}


export default App;
