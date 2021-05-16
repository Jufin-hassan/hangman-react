import React, { Component, useState } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from './words'

var test = []

const Hangman = () =>{
  const maxWrong = 6
  const images = [img0, img1, img2, img3, img4, img5, img6]

  const [nWrong,setnWrong] = useState(0)
  const [guessed,setGuessed] = useState([])
  const [answer,setAnswer] = useState(randomWord())

  //checking whether the guessed letter is in answer
  const guessedWord = () => {
    return answer
      .split("")
      .map(ltr => (guessed.includes(ltr) ? ltr : "_"))
  }

  //.push in setState didnt work so 1st pushed into a dummy array and added the array in setState 
  const handleGuess = (e) => {
    let ltr = e.target.value;
    test.push(ltr)
    console.log(test);
    setGuessed( [...guessed+ test])
    test = []
    setnWrong(nWrong + (answer.includes(ltr) ? 0 : 1))
    
  }

  //generating button and disabling the use button
  const generateButtons = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={handleGuess}
        disabled={guessed.includes(ltr)}
        
      >
        {ltr}
      </button>
    ));

  }
  
  //restarting the game
  const restartGame = () => {
    setAnswer(randomWord())
    setGuessed([])
    setnWrong(0)

  }

  const gameOver = (nWrong >= maxWrong) //Checking Whether game is over
  const isWin = guessedWord().join("") === answer //Checking whether won
  let game= generateButtons() //Displaying the buttons only while playing!
  if(gameOver) game = "You Lose!"
  if(isWin) game = "You Win!"

    return (
      
      <div className='Hangman'>
        <h1>Hangman</h1>
          {!gameOver || !isWin ? 
          <div>
            <img src={images[nWrong]} alt={`${nWrong} wrong guesses!`}/> 
            <p>Number of wrong guesses : {nWrong}</p>
            <p className='Hangman-word'>{!gameOver ? guessedWord() : answer}</p>
            <p className='Hangman-btns'>{game}</p>
            <button className="restart" onClick={restartGame}>Restart</button>

        </div> :
        <div> 
          <h3>{game}</h3>
          <h2 className='Hangman-word'>{!gameOver ? guessedWord() : answer}</h2>
         
          <button className="restart" onClick={restartGame}>Restart</button>
        </div>
        }
        </div>
    );
  
}

export default Hangman;
