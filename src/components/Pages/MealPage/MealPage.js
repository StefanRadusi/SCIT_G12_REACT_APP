import React, { Component } from "react";
import { fetchMeal } from "./MealPageUtils";

import "./MealPage.css";

export class MealPage extends Component {
  state = {
    meals: [],
    currentMealIndex: 0,
    localmeals: [],
  };

  // localChecker() {
  //   let storedMeal = localStorage.getItem(this.props.letter);
  //   const mealObj = JSON.parse(storedMeal);
  //   this.setState({ localmeals: mealObj });
  // }

  componentDidMount() {
    let storedMeal = localStorage.getItem(this.props.letter);
    const mealObj = JSON.parse(storedMeal);
    this.setState({ localmeals: mealObj });

    fetchMeal(this.props.letter).then((json) => {
      this.setState({ meals: json.meals });
      localStorage.setItem(this.props.letter, JSON.stringify(json));
    });
  }

  test() {
    let title = this.state.localmeals.meals[this.state.currentMealIndex].strMeal
      ? this.state.localmeals.meals[this.state.currentMealIndex].strMeal
      : this.state.meals[this.state.currentMealIndex].strMeal;
    return title;
  }

  handleNextMeal = () => {
    const { currentMealIndex, meals } = this.state;

    if (currentMealIndex < meals.length - 1) {
      this.setState({ currentMealIndex: currentMealIndex + 1 });
    }
  };

  handlePreviousMeal = () => {
    const { currentMealIndex } = this.state;

    if (currentMealIndex > 0) {
      this.setState({ currentMealIndex: currentMealIndex - 1 });
    }
  };

  render() {
    const { letter } = this.props;
    const { meals, currentMealIndex } = this.state;

    const currentMeal = meals[currentMealIndex];

    return (
      <div className="meal-page">
        <h1>{`This is meal page:  ${letter}`}</h1>

        {currentMeal ? (
          <div className="main-meal-container">
            <h2 className="meal-page__meal-title">{currentMeal.strMeal}</h2>
            <div className="meal-img-container">
              <img className="meal-img" src={currentMeal.strMealThumb}></img>
              <div className="meal-instructions">
                <p className="instructions">Instructions :</p>
                {currentMeal.strInstructions}
              </div>
            </div>
            <div className="meal-page__meal-navigation">
              <div className="meal-navigation-component">
                <div id="statusBox">
                  <p>
                    Meal {currentMealIndex + 1} out of {meals.length}
                  </p>
                </div>
                <p
                  className={currentMealIndex === 0 ? "disabled" : ""}
                  onClick={this.handlePreviousMeal}
                >
                  {"<"}
                </p>
                <p
                  className={
                    currentMealIndex === meals.length - 1 ? "disabled" : ""
                  }
                  onClick={this.handleNextMeal}
                >
                  {">"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading</p>
        )}
      </div>
    );
  }
}
