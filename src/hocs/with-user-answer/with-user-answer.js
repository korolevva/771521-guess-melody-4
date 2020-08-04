import React, {useState} from "react";
import PropTypes from "prop-types";
import {GameType} from "../../const.js";

const withUserAnswer = (Component) => {
  const WithUserAnswer = (props) => {
    const [userAnswers, setUserAnswers] = useState(new Array(props.question.answers.length).fill(false));

    const handleAnswer = () => {
      const {onAnswer, question} = props;

      onAnswer(question, userAnswers);
    };

    const handleChange = (i, value) => {
      const newUserAnswers = [...userAnswers];
      newUserAnswers[i] = value;
      setUserAnswers(newUserAnswers);
    };

    return (
      <Component
        {...props}
        userAnswers={userAnswers}
        onAnswer={handleAnswer}
        onChange={handleChange}
      />
    );
  };

  WithUserAnswer.propTypes = {
    question: PropTypes.shape({
      answers: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
      })).isRequired,
      genre: PropTypes.string.isRequired,
      type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]).isRequired,
    }).isRequired,
    onAnswer: PropTypes.func.isRequired,
  };

  return WithUserAnswer;
};

export default withUserAnswer;

