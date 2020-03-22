import React, { Component } from "react";
import {
  fetchMeal,
  cacheIntoLocalStorage,
  retrieveFromLocalStorage
} from "./MealPageUtils";

import "./MealPage.css";

export class MealPage extends Component {
  state = {
    meals: [],
    currentMealIndex: 0
  };

  componentDidMount() {
    const cacheMeals = retrieveFromLocalStorage(this.props.letter);
    if (cacheMeals) {
      this.setState({ meals: cacheMeals });
    } else {
      fetchMeal(this.props.letter).then(json => {
        this.setState({ meals: json.meals });
        cacheIntoLocalStorage(this.props.letter, json.meals);
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
    const { letter } = this.props;
    const { meals, currentMealIndex } = this.state;

    console.log("render");
    console.log(meals);

    const currentMeal = meals[currentMealIndex];

    return (
      <div className="page meal-page">
        <h1>{`This is meal page:  ${letter}`}</h1>

        {currentMeal ? (
          <div>
            <h2 className="meal-page__meal-title">{currentMeal.strMeal}</h2>
            <div className="description-container">
              <div className="img-container">
                <img src={currentMeal.strMealThumb} alt={"nothing"} />
              </div>
              <div className="instructions">
                <h3>Instructions: </h3>
                <p>{currentMeal.strInstructions}</p>
              </div>
            </div>
            <div className="meal-page__meal-navigation">
              <div className="buttons">
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
              <div className="info">
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
