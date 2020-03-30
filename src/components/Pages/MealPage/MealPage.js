import React, { Component } from "react";
import { fetchMeal } from "./MealPageUtils";


import "./MealPage.css";

export class MealPage extends Component {
  state = {
    meals: [],
    currentMealIndex: 0,
    currentPage: 1,
    mealsPerPage:0
    
  };

  componentDidMount() {
    console.log("mounted");

    fetchMeal(this.props.letter).then(json => {
      console.log(json);
      this.setState({ meals: json.meals });
    });
  }

  handleNextMeal = () => {
    const { currentMealIndex, meals, currentPage} = this.state;

    if (currentMealIndex < meals.length - 1) {
      this.setState({ currentMealIndex: currentMealIndex + 1, strMealThumb:true, currentPage: currentPage + 1, mealsPerPage: meals.length });
    }
  };

  handlePreviousMeal = () => {
    const { currentMealIndex, meals, currentPage,} = this.state;

    
    if (currentMealIndex > 0) {
      this.setState({ currentMealIndex: currentMealIndex - 1, strMealThumb:true, currentPage: currentPage - 1, mealsPerPage: meals.length });
    }
  };

  render() {
  const { letter } = this.props;
  const { meals, currentMealIndex, currentPage, mealsPerPage} = this.state;
 

    console.log("render");
    console.log(meals);
    const mealsPerPageNumber = meals.length;


    const currentMeal = meals[currentMealIndex];
    const currentMealNumber = currentPage;
    const numberOfMeals = mealsPerPageNumber;

    return (
      <div className="meal-page">
        <h1>{`This is meal page:  ${letter}`}</h1>
        {currentMeal ? (
          <div>
            <h2 className="meal-page__meal-title">{currentMeal.strMeal}</h2>
            <div className="meal-description">
            <img src={currentMeal.strMealThumb} />
            <div className="instructions"> <p><b> Instructions: </b></p>
            <p>{currentMeal.strInstructions} </p>
            </div>
            </div>
            <div className = "page-navigation" >
            <div className="meal-page__meal-navigation">
              <div className="meal-navigation">
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
            <div className="page-number">  <p> Meal {currentMealNumber} out of {numberOfMeals} </p> </div>
              </div>
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
