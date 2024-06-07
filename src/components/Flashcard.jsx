import React, { useState, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip'; // Assuming you're using a library like react-card-flip
import axios from 'axios';
import "./Flashcard.css";



function Flashcard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [flashcards, setFlashcards] = useState([]);
  const [flashcard, setFlashcard] = useState({}); // State for the current displayed flashcard
  const [difficulty, setDifficulty] = useState('');
  const [difficultyArr, setDifficultyArr] = React.useState([]);


  useEffect(() => {
    setIsLoading(true); // Set loading to true initially

    axios.get('http://localhost:3001/flashcards/')
      .then((response) => {
        setFlashcards(response.data);
        // Set a random flashcard as the initial displayed one
        setFlashcard(response.data[Math.floor(Math.random() * response.data.length)]);
        setIsLoading(false); // Set loading to false after success
      })
      .catch((error) => {
        console.error('Error fetching flashcards:', error);
        setIsLoading(false); // Set loading to false on error
      });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  const handleClickEasy = (e) => {
    e.preventDefault();
    setDifficulty('Easy');
    
// <----------------------------------------------------->
    
    axios.get('http://localhost:3001/flashcards/')
      .then((response) => {
        setFlashcards(response.data);
        // Set a random flashcard as the initial displayed one
        setFlashcard(response.data[Math.floor(Math.random() * response.data.length)]);
        setIsLoading(false); // Set loading to false after success
      })
      .catch((error) => {
        console.error('Error fetching flashcards:', error);
        setIsLoading(false); // Set loading to false on error
      });

      setIsFlipped(false);
  }

  const handleClickMedium = (e) => {
    e.preventDefault();
    setDifficulty('Medium');


// <----------------------------------------------------->
    
  axios.get('http://localhost:3001/flashcards/')
  .then((response) => {
    setFlashcards(response.data);
   // Set a random flashcard as the initial displayed one
   setFlashcard(response.data[Math.floor(Math.random() * response.data.length)]);
   setIsLoading(false); // Set loading to false after success
  })
  .catch((error) => {
    console.error('Error fetching flashcards:', error);
    setIsLoading(false); // Set loading to false on error
  });

  setIsFlipped(false);

  }

  const handleClickHard = (e) => {
    e.preventDefault();
    setDifficulty('Hard');

    // <----------------------------------------------------->
    
  axios.get('http://localhost:3001/flashcards/')
  .then((response) => {
    setFlashcards(response.data);
   // Set a random flashcard as the initial displayed one
   setFlashcard(response.data[Math.floor(Math.random() * response.data.length)]);
   setIsLoading(false); // Set loading to false after success
  })
  .catch((error) => {
    console.error('Error fetching flashcards:', error);
    setIsLoading(false); // Set loading to false on error
  });

  setIsFlipped(false);

  }

  if(flashcards){
    console.log(flashcards)
  }

  return (
    <>
      {isLoading ? ( // Conditional rendering for loading state
        <div>Loading flashcards...</div>
      ) : (
        <div>
          <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <div className='flashcard-container'>
              <h3>Question</h3>
              <img
                onClick={handleClick}
                src={require('../' + flashcard.question)}                
                className = "flashcard-image"
              />
            </div>
            <div className='flashcard-container'>
              <h3>Answer</h3>
              <img
                onClick={handleClick}
                src={require('../' + flashcard.answer)}
                className = "flashcard-image"
              />
            </div>
          </ReactCardFlip>

          {isFlipped? <button onClick={handleClickEasy}>Easy</button>:null}
          {isFlipped? <button onClick={handleClickMedium}>Medium</button>:null}
          {isFlipped? <button onClick={handleClickHard}>Hard</button>:null}


        </div>
      )}
    </>
  );
}

export default Flashcard;
