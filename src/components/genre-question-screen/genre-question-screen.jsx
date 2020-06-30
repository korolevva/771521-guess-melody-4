import React, {useState} from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const.js";
import AudioPlayer from "../audio-player/audio-player.jsx";

const GenreQuestionScreen = ({onAnswer, question}) => {
  const [userAnswers, setUserAnswers] = useState([false, false, false, false]);
  const [activePlayer, setActivePlayer] = useState(0);
  const {answers, genre} = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>
      <form
        className="game__tracks"
        onSubmit={(evt) => {
          evt.preventDefault();
          onAnswer(question, userAnswers);
        }}
      >
        {answers.map((answer, i) => (
          <div key={`${i}-${answer.src}`} className="track">
            <AudioPlayer
              onPlayButtonClick={() => setActivePlayer(activePlayer === i ? -1 : i)}
              isPlaying={i === activePlayer}
              src={answer.src}
            />
            <div className="game__answer">
              <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i}`}
                id={`answer-${i}`}
                checked={userAnswers[i]}
                onChange={(evt) => {
                  const value = evt.target.checked;
                  const newUserAnswers = [...userAnswers];
                  newUserAnswers[i] = value;
                  setUserAnswers(newUserAnswers);
                }}
              />
              <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
            </div>
          </div>
        ))}

        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  );
};

GenreQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })).isRequired,
    genre: PropTypes.string.isRequired,
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
  }).isRequired,
};


export default GenreQuestionScreen;
