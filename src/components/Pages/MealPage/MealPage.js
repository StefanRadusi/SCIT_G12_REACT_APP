import React, { Component } from "react";
import { fetchMeal } from "./MealPageUtils";

import "./MealPage.css";

export class MealPage extends Component {
  state = {
    meals: [],
    currentMealIndex: 0,
    firstMeal:1,
  };

  componentDidMount() {console.log("mounted");
    const json = localStorage.getItem(this.props.letter);
    const meals = JSON.parse(json);
    if (meals) {
      this.setState(() => ({ meals: meals }));
    }
    else{
         fetchMeal(this.props.letter).then(json => {
           console.log(json);
            this.setState({ meals: json.meals });
         });
  }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.meals.length !== this.state.meals.length) {
      const json = JSON.stringify(this.state.meals);
      localStorage.setItem(this.props.letter, json);
    }
    // TODO Why prevProps.letter is in fact this.props.letter
    // TODO Why prevState is not the real previous state but in fact it is the default component state
    // TODO The above for Stef
    // if (this.props.letter !== prevProps.letter) {
    //   const json = localStorage.getItem(this.props.letter);
    //   const meals = JSON.parse(json);
    //   if (!meals) {
    //     fetchMeal(this.props.letter).then(json => {
    //       console.log(json);
    //       this.setState({meals: json.meals});
    //       localStorage.setItem(this.props.letter, json);
    //     })
    //   } else {
    //     this.setState({meals: meals});
    //   }
    // } else {
    //   this.setState({meals: prevState.meals});
    // }
  }

  handleNextMeal = () => {
    const { currentMealIndex, meals, firstMeal } = this.state;
    if (currentMealIndex < meals.length - 1) {
      this.setState({ currentMealIndex: currentMealIndex + 1 });
    }
    if(firstMeal<meals.length){
      this.setState({firstMeal: firstMeal+1});
    }
  };

  handlePreviousMeal = () => {
    const { currentMealIndex,firstMeal } = this.state;

    if (currentMealIndex > 0) {
      this.setState({ currentMealIndex: currentMealIndex - 1 });
    }
    if(firstMeal > 1)
    {
      this.setState({firstMeal: firstMeal-1});
    }
  };

  render(){
    const { letter } = this.props;
    const { meals, currentMealIndex,firstMeal } = this.state;

    console.log("render");
    console.log(meals);

    const currentMeal = meals[currentMealIndex];

    return (
      <div className="meal-page">
        <h1>{`This is meal page:  ${letter}`}</h1>

        {currentMeal ? (
          <div>
            <h2 className="meal-page__meal-title">{currentMeal.strMeal}</h2>
            <div className="description">
              <img className="meal-picture" src={currentMeal.strMealThumb} alt="pic"/>
              <div className="img-description">
                <h3>Instructions:</h3>
                <p>{currentMeal.strInstructions}</p>
              </div>
            </div>
            <div className="meal-page__meal-navigation">
              <div className="nav-buttons">
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
              <p>Meals {firstMeal} out of {meals.length}</p>
            </div>
          </div>
        ) : (
          <p>Loading</p>
        )}
      </div>
    );
  }
}
