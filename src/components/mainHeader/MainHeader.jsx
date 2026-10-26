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
      src="../src/assets/images/header/card-back.svg" 
      alt="" />
  )
}

function Title() {
  return (
    <
      img src="../src/assets/images/header/title.svg"  
      alt="Concentration"
    />
  )
}

function CardFace() {
  return (
    <img 
      src="../src/assets/images/header/card-face.svg" 
      alt="" />
  )
}