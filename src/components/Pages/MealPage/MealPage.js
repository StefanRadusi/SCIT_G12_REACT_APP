import React, { Component } from "react";
import { fetchMeal } from "./MealPageUtils";

import "./MealPage.css";

export class MealPage extends Component {
  state = {
    meals: [],
    currentMealIndex: 0
  };

  componentDidMount() {
    console.log("mountedd");

    fetchMeal(this.props.letter).then(json => {
      console.log(json);
      this.setState({ meals: json.meals });
    });
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

    console.log("render");
    console.log(meals);

    const currentMeal = meals[currentMealIndex];

    return (
      <div className="meal-page">
        <h1>{`This is meal page:  ${letter}`}</h1>

        {currentMeal ? (
          <div>
            <h2 className="meal-page__meal-title">{currentMeal.strMeal}</h2>
            <div className="meal-page__details-container">
              <div className="meal-page__meal-image-container">
                <img
                  className="meal-page__meal-image"
                  src={currentMeal.strMealThumb}
                  width="300px"
                  height="300px"
                />
              </div>
              <div className="meal-page__meal-instructions">
                <h1 className="meal-page__instructions">Instructions:</h1>
                <p>{currentMeal.strInstructions}</p>
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
              <div id="meal-page__num">
                <p>
                  Meal <span>{currentMealIndex + 1}</span> out of{" "}
                  <span>{meals.length}</span>
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
