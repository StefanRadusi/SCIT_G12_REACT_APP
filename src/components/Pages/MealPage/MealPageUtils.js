function generateUrl(letter) {
  return `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
}

export function fetchMeal(letter) {
  const url = generateUrl(letter);

  return fetch(url).then((response) => response.json());
}

export function cacheIntoLocalStorage(letter, meals) {
  localStorage.setItem(letter, JSON.stringify(meals));
}

export function retrieveFromLocalStorage(letter) {
  const mealsString = localStorage.getItem(letter);
  if (mealsString) return JSON.parse(mealsString);
}
