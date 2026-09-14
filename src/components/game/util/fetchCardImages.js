export async function fetchStandardCardImages(deckId) {
  try {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`);
    if (!response.ok) {
      throw new Error(`HTTP Error in fetchCardImages! Status: ${response.status}`);
    }

    const cardImages = await response.json();
    return cardImages;
  } 
  catch(error) {
    throw new Error(`Fetch Error in fetchCardImages! ${error.message}`, { cause: error });
  }
}