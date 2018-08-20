import PauseIcon from "@material-ui/icons/PauseCircleFilled";
import PlayIcon from "@material-ui/icons/PlayCircleFilled";
import VolumeOff from "@material-ui/icons/VolumeOff";
import VolumeUp from "@material-ui/icons/VolumeUp";
import LoopIcon from "@material-ui/icons/Repeat";
import UnLoopIcon from "@material-ui/icons/SyncDisabled";

import Player from './constants';

export const appendZero = number => {
  if (number < 10) {
    return `0${number}`;
  }

  return number;
};

export const getFormattedTime = time => {
  const dateTime = new Date(0, 0, 0, 0, 0, time, 0);

  const dateTimeM = appendZero(dateTime.getMinutes());
  const dateTimeS = appendZero(dateTime.getSeconds());

  return `${dateTimeM}:${dateTimeS}`;
};

export const formatProgressOverDuration = (progress, duration) => {
  return `${getFormattedTime(progress)} / ${getFormattedTime(duration)}`;
};

export const getIconByPlayerStatus = playerStatus => {
  switch (playerStatus) {
    case Player.Status.PAUSE:
      return PlayIcon;
    case Player.Status.PLAY:
    default:
      return PauseIcon;
  }
};

export const getIconByMuteStatus = muteStatus => {
  switch (muteStatus) {
    case Player.Status.MUTE:
      return VolumeOff;
    case Player.Status.UNMUTE:
    default:
      return VolumeUp;
  }
};

export const getIconByLoopStatus = loopStatus => {
  switch (loopStatus) {
    case Player.Status.LOOP:
      return LoopIcon;
    case Player.Status.UNLOOP:
    default:
      return UnLoopIcon;
  }
};

export const getProgress = (currentTime, duration) =>
  parseFloat(100 * (currentTime / duration));

export const getCurrentTime = (progress, duration) =>
  parseFloat((progress * duration) / 100);
