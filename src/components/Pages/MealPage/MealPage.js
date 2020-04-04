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
      <div className="meal-page">
        <h1>{`This is meal page:  ${letter}`}</h1>

        {currentMeal ? (
          
          <div>
   
            <h2 className="meal-page__meal-title">{currentMeal.strMeal}</h2>
              <div className='instructions-container'> 
               <img src={currentMeal.strMealThumb} className="meal-image"/>
              <div> 
                  <h3 className="meal-page_meal-instructions">Instructions</h3>   
                  <p className="meal-page_meal-instructions">{currentMeal.strInstructions} </p>

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
              <div className='meal-page-navigation'>
                <p> Meal {currentMealIndex + 1} out of {meals.length} </p>
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
