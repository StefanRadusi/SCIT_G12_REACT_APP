export function generateLetters() {
  const array = [];
  for (let i = 65; i < 91; i++) {
    const element = String.fromCharCode(i);
    array.push(element);
  }

  return array;
}
