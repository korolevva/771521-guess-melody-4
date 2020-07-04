import React from 'react';
import AudioPlayer from "../../components/audio-player/audio-player.jsx";

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
