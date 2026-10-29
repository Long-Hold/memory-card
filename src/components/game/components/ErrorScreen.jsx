import { useRef, useEffect } from "react";
import reloadUrl from "../../../assets/images/icons/reload.svg";
import "../styles/errorScreen.css";

export function ErrorScreen({ message }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    buttonRef.current?.focus();
  }, []);

  return (
    <section className="error-screen" aria-labelledby="error-screen-heading">
      <h2 id="error-screen-heading">You have encountered an error</h2>
      <p className="error-message">{message}</p>
      <button
        className="game-control-btn refresh-page-btn"
        ref={buttonRef}
        type="button"
        onClick={() => window.location.reload()}
      >
        <b>Reload Page</b>
        <img
          className="button-icon"
          src={reloadUrl}
          height={32}
          width={32}
          alt=""
        ></img>
      </button>
    </section>
  );
}
