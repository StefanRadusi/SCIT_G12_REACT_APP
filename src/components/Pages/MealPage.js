import React from "react";

export function MealPage(props) {
  return (
    <div className="meal-page">
      <h1>{`This is meal page:  ${props.letter}`}</h1>
    </div>
  );
}
