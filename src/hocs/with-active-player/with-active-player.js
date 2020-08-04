import React from 'react';
import Player from "../../components/audio-player/audio-player.jsx";
import withAudio from "../with-audio/with-audio.js";

const AudioPlayer = withAudio(Player);

export const withActivePlayer = (Component) => (props) => {
  const [activePlayerId, setActivePlayerId] = React.useState(0);

  return (
    <Component
      {...props}
      renderPlayer={(src, id) => {
        return (
          <AudioPlayer
            src={src}
            isPlaying={id === activePlayerId}
            onPlayButtonClick={() => setActivePlayerId(activePlayerId === id ? -1 : id)}
          />
        );
      }}
    />
  );
};

export default withActivePlayer;
