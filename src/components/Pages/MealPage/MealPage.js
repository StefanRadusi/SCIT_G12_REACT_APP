import React, { Component } from "react";
import {
  fetchMeal,
  cacheIntoLocalStorage,
  retrieveFromLocalStorage,
} from "./MealPageUtils";

import "./MealPage.css";

export class MealPage extends Component {
  state = {
    meals: [],
    currentMealIndex: 0,
  };

  componentDidMount() {
    console.log("mounted");
    const letter = this.props;
    const cacheMeals = retrieveFromLocalStorage(letter);

    if (cacheMeals) {
      this.setState({ meals: cacheMeals });
    } else {
      fetchMeal(this.props.letter).then((json) => {
        console.log(json);
        if (json.meals) {
          this.setState({ meals: json.meals });
          cacheIntoLocalStorage(this.props.letter, json.meals);
        }
      });
    }
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
    const { meals, currentMealIndex } = this.state;
    const { letter } = this.props;

    console.log("render");
    console.log(meals);

    const currentMeal = meals[currentMealIndex];

    return (
      <div className="page meal-page">
        <h1>{`This is meal page:  ${letter}`}</h1>
        {currentMeal ? (
          <div className="meal-page-details">
            <h2 className="meal-page__meal-title">{currentMeal.strMeal}</h2>
            <div className="meal-page__meal-details">
              <img id="meal-thumb" src={currentMeal.strMealThumb} alt="" />
              <div className="meal-instructions">
                <h3>Instructions:</h3>
                <p className="meal-page__meal-description">
                  {currentMeal.strInstructions}
                </p>
              </div>
            </div>

            <div className="meal-page__meal-navigation">
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
              <div className="meal-page__navigation-location">
                <p>
                  Meal <span>{currentMealIndex + 1}</span> out of{" "}
                  <span>{meals.length}</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading</p>
        )}{" "}
      </div>
    );
  }
}
