/**
 * Shuffles an array randomly using the Fisher-Yates algorithm.
 * Creates and returns a new shallow copy, leaving the original array unmutated.
 * 
 * @param {Array} arr - The array to shuffle.
 * @returns {Array} A new array with elements in a random order.
 */
export function shuffleArray(arr) {
  const shuffled = [...arr];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}