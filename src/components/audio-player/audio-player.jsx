import React, {Fragment, useState, useRef, useEffect} from "react";
import PropTypes from "prop-types";


const AudioPlayer = (props) => {
  const {onPlayButtonClick} = props;

  const [progress, setProgress] = useState(0);
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

    audio.ontimeupdate = () => {
      progress = audio.currentTime;
      setProgress(progress);
    };
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
    <Fragment>
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        type="button"
        disabled={isLoading}
        onClick={() => {
          setIsPlaying(!isPlaying);
          onPlayButtonClick();
        }}
      />
      <div className="track__status">
        <audio
          ref={audioRef}
        />
      </div>
    </Fragment>
  );
};

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
};

export default AudioPlayer;
