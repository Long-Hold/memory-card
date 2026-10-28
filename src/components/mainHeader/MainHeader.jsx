import cardBackUrl from "../../assets/images/header/card-back.svg";
import titleUrl from "../../assets/images/header/title.svg";
import cardFaceUrl from "../../assets/images/header/card-face.svg";

import "./mainHeader.css";

export function MainHeader() {
  return (
    <header  className="main-header">
      <h1 className="site-title">
        <CardBack />
        <Title />
        <CardFace />
      </h1>
    </header>
  )
}

function CardBack() {
  return (
    <img 
      src={cardBackUrl}
      alt="" />
  )
}

function Title() {
  return (
    <
      img src={titleUrl} 
      alt="Concentration"
    />
  )
}

function CardFace() {
  return (
    <img 
      src={cardFaceUrl}
      alt="" />
  )
}