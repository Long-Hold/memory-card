import { useEffect, useRef} from "react";

export function StartScreen({loadCards}) {
  const buttonRef = useRef(null);

  // Focuses the button on mount, more reliable then autofocus
  useEffect(() => {
    buttonRef.current?.focus();
  }, []);

  return (
    <div className="start-screen">
      <button
      ref={buttonRef}
        type="button"
        onClick={loadCards}
      >
        Start Game
      </button>
    </div>
  )
}