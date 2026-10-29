import "../styles/errorScreen.css";

export function ErrorScreen({message}) {
  return (
    <section className="error-screen" aria-labelledby="error-screen-heading">
      <h2 id="error-screen-heading">You have encountered an error</h2>
      <p>{message}</p>
    </section>
  )
}