import "../App.css";
import { useContext } from "react";
import { GameStateContext } from "../helpers/Contexts";

function Menu() {
  const { gameState, setGameState, userName, setUserName } = useContext(
    GameStateContext
  );
  console.log(GameStateContext);
  return (
    <div className="Menu">
      <h1>Entrez votre prénom:</h1>
      <input
        type="text"
        placeholder="Ex. Rat d'égout"
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      />
      <button
        onClick={() => {
          userName === "Wanda" ? alert("Très beau prénom ça Wanda") : setGameState("playing");
          setGameState("playing");
        }}
      >
        Commencer le quiz
      </button>
    </div>
  );
}

export default Menu;
