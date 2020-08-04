import React, {useState, useRef, useEffect} from "react";
import PropTypes from "prop-types";

const withAudio = (Component) => {

  const WithAudio = (props) => {
    const {onPlayButtonClick} = props;

    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(props.isPlaying);

    const audioRef = useRef();
    const didMountRef = useRef(false);

    useEffect(() => {
      const {src} = props;

      const audio = audioRef.current;

      audio.src = src;

      audio.oncanplaythrough = () => setIsLoading(false);

      audio.onplay = () => setIsPlaying(true);

      audio.onpause = () => setIsPlaying(false);

      return () => {
        audio.oncanplaythrough = null;
        audio.onplay = null;
        audio.onpause = null;
        audio.ontimeupdate = null;
        audio.src = ``;
      };
    }, []);


    useEffect(() => {
      if (!didMountRef.current) {
        didMountRef.current = true;
      } else {
        const audio = audioRef.current;
        if (props.isPlaying) {
          audio.play();
        } else {
          audio.pause();
        }
      }
    });

    return (
      <Component
        {...props}
        isLoading={isLoading}
        isPlaying={isPlaying}
        onPlayButtonClick={() => {
          setIsPlaying(!isPlaying);
          onPlayButtonClick();
        }}
      >
        <audio
          ref={audioRef}
        />
      </Component>
    );
  };

  WithAudio.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    onPlayButtonClick: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
  };

  return WithAudio;
};

export default withAudio;

