import React, { Component } from "react";
import { fetchMeal } from "./MealPageUtils";

import "./MealPage.css";

export class MealPage extends Component {
  state = {
    meals: [],
    currentMealIndex: 0,
    localmeals: [],
  };

  componentDidMount() {
    // console.log("mounted");

    if(this.state.localmeals){
      console.log("ASDO")
    }
    fetchMeal(this.props.letter)
    .then(json => {
      this.setState({ meals: json.meals });
      window.localStorage.setItem(this.props.letter,JSON.stringify(json.meals))
    })
    ;
    let storedMealInfo = localStorage.getItem(this.props.letter);
    const SavedmealObj = JSON.parse(storedMealInfo);
    this.setState({ localmeals: SavedmealObj });
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

    // console.log("render");
    console.log(meals);

    const currentMeal = meals[currentMealIndex];

    return (
      <div className="page meal-page">
        <h1>{`This is meal page:  ${letter}`}</h1>

        {currentMeal ? (
          <div>
            <h2 className="meal-page__meal-title">{currentMeal.strMeal}</h2>
            <div className="Body-Container">
            <div className="meal-image-container">
              <img src={currentMeal.strMealThumb}></img>
            </div>
            <div className="Meal-Text">
              <h4>Instruction</h4>
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
              <p>Meal {currentMealIndex +1} out of {meals.length}</p>
            </div>
          </div>
        ) : (
          <p>Loading</p>
        )}
      </div>
    );
  }
}
