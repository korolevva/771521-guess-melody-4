import React, {useState} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import WelcomeScreen from "../welcom-screen/welcome-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GameScreen from "../game-screen/game-screen.jsx";
import {GameType} from "../../const.js";
import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player.js";

const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);
const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);

const App = ({errorsCount, questions}) => {
  const [step, setStep] = useState(-1);
  const question = questions[step];

  const renderGameScreen = () => {
    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={errorsCount}
          onWelcomeButtonClick={() => setStep(0)}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen
              type={question.type}
            >
              <ArtistQuestionScreenWrapped
                question={question}
                onAnswer={() => setStep(step + 1)}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen
              type={question.type}
            >
              <GenreQuestionScreenWrapped
                question={question}
                onAnswer={() => setStep(step + 1)}
              />
            </GameScreen>
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
          <ArtistQuestionScreenWrapped
            question={questions[1]}
            onAnswer={() => {}}
          />
        </Route>
        <Route exact path="/dev-genre">
          <GenreQuestionScreenWrapped
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
