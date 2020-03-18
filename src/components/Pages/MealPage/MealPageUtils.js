function generateUrl(letter) {
  return `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
}

export function fetchMeal(letter) {
  const url = generateUrl(letter);

  return fetch(url).then(response => response.json());
}
