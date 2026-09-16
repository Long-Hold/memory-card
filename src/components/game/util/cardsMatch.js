const MATCHING_SUITS = {
  RED: ['HEARTS', 'DIAMONDS'],
  BLACK: ['CLUBS', 'SPADES'],
}

/**
 * Checks if two card objects match in value and color.
 * @param {Object} card1 - e.g., { value: '6', suit: 'HEARTS', code: '6H' }
 * @param {Object} card2 - e.g., { value: '6', suit: 'DIAMONDS', code: '6D' }
 */
export function cardsMatch(card1, card2) {
  if (card1.value !== card2.value)
    return false;

  const color1 = MATCHING_SUITS.RED.includes(card1.suit) ? 'RED' : 'BLACK';
  const color2 = MATCHING_SUITS.RED.includes(card2.suit) ? 'RED' : 'BLACK';

  return color1 === color2;
}