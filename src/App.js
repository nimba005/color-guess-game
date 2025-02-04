import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useEffect(0);
  const [gameStatus, setGameStatus] = useState("");
  const colors = Array.from({ length: 6 }, () => getRandomColor());

  useEffect(() => {
    setTargetColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);

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
    } else {
      setGameStatus("Wrong! Try Again.");
    }
  }

  function handleNewGame() {
    setGameStatus("");
    setTargetColor(colors[Math.floor(Math.random() * colors.length)]);
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
          ></button>
        ))}
      </div>
      <p data-testid="gameStatus">{gameStatus}</p>
      <p data-testid="score">Score: {score}</p>
      <button data-testid="newGameButton" onClick={handleNewGame}>
        New Game
      </button>
    </div>
  );
}

export default App;
