import React, {useState, useEffect} from "react";

const WelcomeScreen = (props) => {
  // eslint-disable-next-line react/prop-types
  const {errorsCount} = props;

  const [errors, setErrorsCount] = useState(errorsCount);

  useEffect(() => {
    document.title = `Можно допустить ${errors} ошибки`;
  });

  return (
    <section className="welcome">
      <div className="welcome__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>
      <button className="welcome__button" onClick={() => setErrorsCount(errors + 1)}>
        <span className="visually-hidden">Начать игру</span>
      </button>
      <h2 className="welcome__rules-title">Правила игры</h2>
      <p className="welcome__text">Правила просты:</p>
      <ul className="welcome__rules-list">
        <li>Нужно ответить на все вопросы.</li>
        <li>Можно допустить {errors} ошибки.</li>
      </ul>
      <p className="welcome__text">Удачи!</p>
    </section>
  );
};

export default WelcomeScreen;


