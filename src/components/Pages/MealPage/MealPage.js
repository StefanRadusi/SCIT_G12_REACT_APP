import React, { Component } from "react";
import { fetchMeal } from "./MealPageUtils";

import "./MealPage.css";

export class MealPage extends Component {
  state = {
    meals: [],
    currentMealIndex: 0
  };

  componentDidMount() {
    console.log("mounted");

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
      <div className="page meal-page">
        <h1>{`This is meal page:  ${letter}`}</h1>

        {currentMeal ? (
          <div>
            <h2 className="meal-page__meal-title">{currentMeal.strMeal}</h2>
            <div className="img-box-desc">
              <div className="imgs">
                <img src={currentMeal.strMealThumb} alt="food photo" />
              </div>
              <div className="description">
                <h3>Instructions</h3>
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
            </div>
          </div>
        ) : (
          <p>Loading</p>
        )}
      </div>
    );
  }
}
