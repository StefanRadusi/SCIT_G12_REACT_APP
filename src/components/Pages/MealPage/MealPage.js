import React, { Component } from "react";
import { fetchMeal } from "./MealPageUtils";

import "./MealPage.css";

export class MealPage extends Component {
  state = {

    meals: [],
    currentMealIndex: 0
  };




  componentDidMount(query) {
    console.log("mounted");
    const cachedMeals = localStorage.getItem(this.props.letter)//// constanta ca sa verificam daca avem ceva in local storage

    if (cachedMeals) {  //daca cachedMeals e true, ne setam current state de aici (local storage)
      this.setState({ meals: JSON.parse(cachedMeals) });
    } else {/////altfel, facem fetch 
      fetchMeal(this.props.letter)
        .then(json => {
          console.log(json);

          this.onSetResult(json, this.props.letter)///apelam o functie ca sa salvam raspunsul din fetch in local storage si sa actualizam current state
          // this.setState({ meals: json.meals });

        });
    }
  }

  ///////////////////////////////////////////////////////////

  onSetResult = (result, key) => {
    localStorage.setItem(key, JSON.stringify(result.meals));
    this.setState({ meals: result.meals });
  };





  /////////////////////////////////////////////////////////////////////

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
            <div className="meal-info">
              <img className="meal-page__meal-image" src={currentMeal.strMealThumb}></img>
              <div><h3>Instructions</h3>
                <p className="meal-page__meal-instructions"> {currentMeal.strInstructions}</p></div>

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
              <div className="meal-page-nav-info">
                <p>Meal {currentMealIndex} out of {meals.length}</p>
              </div>


            </div>
          </div>
        ) : (
            <p>Loading</p>
          )
        }
      </div>
    );
  }
}
