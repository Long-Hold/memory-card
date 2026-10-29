export async function fetchDeck(link) {
  try {
    const response = await fetch(link);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error retrieving deck: ${error.message}`, {
      cause: error,
    });
  }
}
