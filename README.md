# Concentration

A browser version of the classic card game Concentration, also known as Memory. The game uses a standard 52 card deck and is built with React and Vite.

## Table of Contents

- [How to Play](#how-to-play)
- [Difficulty Levels](#difficulty-levels)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Accessibility](#accessibility)
- [Credits](#credits)

## How to Play

1. Pick any two cards. Once a card is selected, it cannot be changed.
2. If both cards have the same color and rank, they are removed from the board. For example, the 6 of Hearts matches the 6 of Diamonds, because both are red sixes.
3. If the color, the rank, or both do not match, the cards turn back over and you lose one guess.
4. The round ends when every card has been removed (a win) or when you run out of guesses (a loss).

Your win streak goes up by one each time you win a round. It resets to zero after a loss.

## Difficulty Levels

Difficulty sets the number of guesses you get per round. Change it from the settings sidebar. Switching difficulty starts a new game.

| Level    | Guesses |
| -------- | ------- |
| Standard | 30      |
| Moderate | 15      |
| Extreme  | 5       |

## Features

- Standard 52 card deck loaded from the Deck of Cards API
- Cards are matched by rank and color, not by suit
- Three difficulty levels with a running win streak
- Random card order at the start of each round
- Card images are preloaded before the board is shown, so cards do not pop in while you play
- Loading, game over, and error screens, including a reload option if the deck cannot be fetched
- Responsive card grid that changes column count with the available width
- Settings sidebar that is always visible on large screens and slides in as a drawer on small screens
- Respects the reduced motion setting by turning off flip, shake, and fade animations

## Tech Stack

- React 19
- Vite 8
- Oxlint for linting
- pnpm for package management
- Plain CSS using custom properties, nesting, and container queries
- [Deck of Cards API](https://deckofcardsapi.com/) for card data and images

## Getting Started

### Requirements

- Node.js `^20.19.0` or `>=22.12.0`
- pnpm

### Installation

```bash
git clone https://github.com/Long-Hold/memory-card.git
cd memory-card
pnpm install
```

### Run the development server

```bash
pnpm dev
```

Vite prints a local address in the terminal. Open it in your browser. An internet connection is required, since the cards are loaded from an external API.

## Available Scripts

| Command        | Description                           |
| -------------- | ------------------------------------- |
| `pnpm dev`     | Starts the Vite development server    |
| `pnpm build`   | Creates a production build in `dist/` |
| `pnpm preview` | Serves the production build locally   |
| `pnpm lint`    | Runs Oxlint                           |

## Project Structure

```
src/
  App.jsx                     Holds the selected difficulty, lays out the page
  main.jsx                    React entry point
  constants/
    difficulties.js           Guess counts for each difficulty
  util/
    fetchDeck.js              Requests a new deck from the API
  components/
    game/
      GamePage.jsx            Game state and rules
      components/
        Card.jsx              A single flippable card
        GameState.jsx         Win streak and remaining guesses
        StartScreen.jsx       Rules and start button
        GameOver.jsx          Win or loss screen
        ErrorScreen.jsx       Shown when loading fails
      util/
        cardsMatch.js         Compares two cards by rank and color
        fetchCardImages.js    Draws all 52 cards from the deck
        shuffleArray.js       Fisher-Yates shuffle
      styles/                 CSS for the game components
    sidebar/                  Difficulty settings panel
    mainHeader/               Site title and header art
    footer/                   Credits and links
  assets/                     Fonts and SVG images
```

## How It Works

### State

`App` stores the selected difficulty and passes it to `GamePage`. `GamePage` is given the difficulty as its `key`, so changing difficulty unmounts and remounts it. This resets all game state without extra reset logic.

`GamePage` owns everything about a round:

- The shuffled list of cards
- The two cards currently picked
- The set of matched card codes
- The win streak and remaining guesses
- The loading and error status

Child components only receive the values and callbacks they need.

### Game flow

1. The start screen is shown first.
2. Pressing Start Game requests a new deck, then draws all 52 cards.
3. The cards are shuffled, and every image is decoded before the board appears.
4. Each click either starts a new turn or completes the current pair.
5. A matching pair is added to the matched set and removed from play. A mismatch costs one guess.
6. When all cards are matched, or guesses reach zero, the game over screen is shown.
7. New Game reshuffles the same cards without requesting them again.

### Matching rule

`cardsMatch` returns true when two cards have the same rank and the same color. Hearts and Diamonds count as red. Clubs and Spades count as black.

## Accessibility

- Each card is a real `button` with a label. A face-down card reads as its position on the board, and a face-up card reads as its rank and suit.
- The win streak and remaining guesses are in a live region, so changes are announced.
- Focus moves to the main button when the start, game over, and error screens appear.
- The sidebar is marked `inert` while closed, so hidden controls cannot be reached with the keyboard.
- The settings toggle exposes its open state with `aria-expanded` and `aria-controls`.
- Card, button, and radio inputs have visible focus styles.
- Animations are disabled when the user prefers reduced motion.

## Credits

- Card data and images: [Deck of Cards API](https://deckofcardsapi.com/)
- Suit icons: [Georgiana_Lavinia on Flaticon](https://www.flaticon.com/free-icons/suits)
- Font: Fira Sans, self-hosted
- Designed and developed by Matthew Harview
