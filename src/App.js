import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [colors, setColors] = useState([])

  useEffect(() => {
    startNewRound();
  }, []);

  function startNewRound() {
    const newColors = Array.from({ length: 6 }, () => getRandomColor());
    setColors(newColors);
    setTargetColor(newColors[Math.floor(Math.random() * newColors.length)]);
    setGameStatus("");
  }

  function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function handleColorGuess(color) {
    if (color === targetColor) {
      setGameStatus("Correct!");
      setScore(score + 1);
      setTimeout(startNewRound, 1000);
    } else {
      setGameStatus("Wrong! Game Over.");
    }
  }

  function resetGame() {
    setScore(0);
    setGameStatus("");
    startNewRound();
  }

  return (
    <div className="App">
      <h1 data-testid="gameInstructions">Guess the Correct Color!</h1>
      <div
        data-testid="colorBox"
        className="color-box"
        style={{ backgroundColor: targetColor }}
      ></div>
      <div className="color-options">
        {colors.map((color,index) => (
          <button
            key={index}
            data-testid="colorOption"
            style={{ backgroundColor: color }}
            onClick={() => handleColorGuess(color)}
            disabled={gameStatus === "Wrong! Game Over."}
          ></button>
        ))}
      </div>
      <p data-testid="gameStatus">{gameStatus}</p>
      <p data-testid="score">Score: {score}</p>
      {gameStatus === "Wrong! Game Over." ? (
        <button data-testid="newGameButton" onClick={resetGame}>
          New Game
        </button>
      ) : null}
    </div>
  );
}

export default App;