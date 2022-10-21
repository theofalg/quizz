import "../App.css";
import { CultureG as Questions } from "../helpers/cultureG";
//import { Geographie } from "../helpers/Animaux";
//import { Geographie } from "../helpers/geographie";
import { useState } from "react";

import { useContext } from "react";
import { GameStateContext } from "../helpers/Contexts";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");
  const [lvlDifficulty, setDifficulty] = useState("débutant");
  const [nbrPV, setPV] = useState(2);
  const [tirageAleatoire, setTirageAleatoire] = useState(Math.floor(Math.random() * Questions[0]["quizz"][lvlDifficulty].length));
  const [isSelect, setIsSelect] = useState(false);

  const { score, setScore, gameState, setGameState, userName } = useContext(
    GameStateContext
  );

  const buttons = Array.from(
    document.getElementsByClassName('Answer')
  );

  const chooseOption = (option) => {
    setOptionChosen(option);
  };

  const setSelectedButton = (btn) => {
    buttons.map((button) => button.style.backgroundColor = "");
    btn.target.style.backgroundColor = "red";
  }

  const resetSelectedButton = () => {
    buttons.map((button) => button.style.backgroundColor = "");
  }

  const nextQuestion = () => {
    
    // Si la réponse est bonne
    if (Questions[0]["quizz"][lvlDifficulty][tirageAleatoire]["réponse"] == optionChosen) {
      setScore(score + 1);
      Questions[0]["quizz"][lvlDifficulty].splice(tirageAleatoire, 1);
      
      
      if( (score == 20 ) && (lvlDifficulty == "débutant") ) {
        setDifficulty("confirmé");
      } else if ( (score == 40) && (lvlDifficulty == "confirmé") ) {
        setDifficulty("expert");
      }
      resetSelectedButton();
      setTirageAleatoire(Math.floor(Math.random() * Questions[0]["quizz"][lvlDifficulty].length));
    } else {
      setPV(nbrPV - 1);
      if(nbrPV < 1) {
        setGameState("finished"); 
        return
      } 
      resetSelectedButton();
    }
    console.log(score);
    console.log(lvlDifficulty);
  };

  const finishQuiz = () => {
    if (Questions[0]["quizz"][lvlDifficulty][tirageAleatoire]["réponse"] == optionChosen) {
      setScore(score + 1);
    }
    setGameState("finished");
  };

  return (
    <div className="Quiz">
      <div className="InfoQuizz">
        <span>{nbrPV + 1 } {nbrPV < 2 ? "vie" : "vies" } {userName}</span>
        <h2>Question n°{score + 1}</h2>
        <span>Score : {score}</span>
        {console.log("Test bug")}
      </div>
      
      <div className="Questions">
      <h1>{Questions[0]["quizz"][lvlDifficulty][tirageAleatoire]["question"]}</h1>
        <button className="Answer" id="0"
          onClick={(event) => {
            setSelectedButton(event);
            chooseOption(Questions[0]["quizz"][lvlDifficulty][tirageAleatoire]["propositions"][0]);
          }}
        >
          {Questions[0]["quizz"][lvlDifficulty][tirageAleatoire]["propositions"][0]}
        </button>
        <button className="Answer" id="1"
          onClick={(event) => {
            setSelectedButton(event);
            chooseOption(Questions[0]["quizz"][lvlDifficulty][tirageAleatoire]["propositions"][1]);
          }}
        >
          {Questions[0]["quizz"][lvlDifficulty][tirageAleatoire]["propositions"][1]}
        </button>
        <button className="Answer" id="2"
          onClick={(event) => {
            setSelectedButton(event);
            chooseOption(Questions[0]["quizz"][lvlDifficulty][tirageAleatoire]["propositions"][2]);
          }}
        >
          {Questions[0]["quizz"][lvlDifficulty][tirageAleatoire]["propositions"][2]}
        </button>
        <button className="Answer" id="3"
          onClick={(event) => {
            setSelectedButton(event);
            chooseOption(Questions[0]["quizz"][lvlDifficulty][tirageAleatoire]["propositions"][3]);
          }}
        >
          {Questions[0]["quizz"][lvlDifficulty][tirageAleatoire]["propositions"][3]}
        </button>
      </div>
      {console.log(lvlDifficulty)}
      {(lvlDifficulty === "expert") && (score == 100) ? (
        <button onClick={finishQuiz} id="nextQuestion">
          Dernière question Quiz
        </button>
      ) : (
        <button id="nextQuestion" onClick={nextQuestion}>
          Prochaine Question
        </button>
      )}
    </div>
  );
}

export default Quiz;
