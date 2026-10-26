import { useEffect, useRef} from "react";
import "../styles/startScreen.css";

export function StartScreen({loadCards}) {
  const buttonRef = useRef(null);

  // Focuses the button on mount, more reliable then autofocus
  useEffect(() => {
    buttonRef.current?.focus();
  }, []);

  return (
    <section className="start-screen" aria-labelledby="start-screen-heading">
      <h2 id="start-screen-heading">Game Rules</h2>
      <ol className="rule-list">
        <li>Pick any two cards. Once a card is selected, you cannot change it.</li>
        <li>If the cards have the same <b>Color</b> and <b>Rank</b>, they will be removed from the board.</li>
        <li>If the <b>Color</b> and / or <b>Rank</b> do not match, the cards flip back over and your <b>Remaining Guesses</b> go down.</li>
        <li>Once all cards are removed, or if you run out of guesses, the round will end.</li>
      </ol>
      <button
      ref={buttonRef}
      type="button"
      className="start-game-button"
      onClick={loadCards}
      >
        Start Game
      </button>
    </section>
  )
}