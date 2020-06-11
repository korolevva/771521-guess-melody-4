import React from "react";
import PropTypes from "prop-types";
import WelcomeScreen from "../welcom-screen/welcome-screen.jsx";

const App = ({errorsCount}) => {
  return (
    <WelcomeScreen errorsCount={errorsCount}/>
  );
};

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
};

export default App;
