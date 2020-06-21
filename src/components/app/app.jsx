import React, {useState} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import WelcomeScreen from "../welcom-screen/welcome-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import {GameType} from "../../const.js";

const App = ({errorsCount, questions}) => {
  const [step, useStep] = useState(-1);

  const renderGameScreen = () => {
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={errorsCount}
          onWelcomeButtonClick={() => useStep(step + 1)}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <ArtistQuestionScreen
              question={question}
              onAnswer={() => useStep(step + 1)}
            />
          );
        case GameType.GENRE:
          return (
            <GenreQuestionScreen
              question={question}
              onAnswer={() => useStep(step + 1)}
            />
          );
      }
    }

    return null;
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {renderGameScreen()}
        </Route>
        <Route exact path="/dev-artist">
          <ArtistQuestionScreen
            question={questions[1]}
            onAnswer={() => {}}
          />
        </Route>
        <Route exact path="/dev-genre">
          <GenreQuestionScreen
            question={questions[0]}
            onAnswer={() => {}}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};

export default App;
