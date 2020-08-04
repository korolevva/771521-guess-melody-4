import React from "react";
import PropTypes from "prop-types";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withAudio from "./with-audio.js";

configure({adapter: new Adapter()});

const Player = (props) => {
  const {onPlayButtonClick, children} = props;
  return (
    <div>
      <button onClick={onPlayButtonClick} />
      {children}
    </div>
  );
};

Player.propTypes = {
  onPlayButtonClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

it(`Checks that HOCs callback turn on audio (play)`, () => {
  const PlayerWrapped = withAudio(Player);

  const playStub = jest
      .spyOn(window.HTMLMediaElement.prototype, `play`)
      .mockImplementation(() => {});

  const wrapper = mount(<PlayerWrapped
    isPlaying={false}
    onPlayButtonClick={() => {}}
    src=""
  />);

  wrapper.setProps({isPlaying: true});
  expect(playStub).toHaveBeenCalled();
});

it(`Checks that HOCs callback turn off audio (pause)`, () => {
  const PlayerWrapped = withAudio(Player);

  const playStub = jest
      .spyOn(window.HTMLMediaElement.prototype, `pause`)
      .mockImplementation(() => {});

  const wrapper = mount(<PlayerWrapped
    isPlaying={true}
    onPlayButtonClick={() => {}}
    src=""
  />);

  wrapper.setProps({isPlaying: false});
  expect(playStub).toHaveBeenCalled();
});
