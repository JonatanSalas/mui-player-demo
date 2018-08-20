import PauseIcon from "@material-ui/icons/PauseCircleFilled";
import PlayIcon from "@material-ui/icons/PlayCircleFilled";
import VolumeOff from "@material-ui/icons/VolumeOff";
import VolumeUp from "@material-ui/icons/VolumeUp";
import LoopIcon from "@material-ui/icons/Repeat";

import Player from "./constants";

export * from "./actions";
export * from "./events";

export const appendZero = number => (number < 10 ? `0${number}` : number);

export const getFormattedTime = time => {
  const dateTime = new Date(0, 0, 0, 0, 0, time, 0);

  const dateTimeM = appendZero(dateTime.getMinutes());
  const dateTimeS = appendZero(dateTime.getSeconds());

  return `${dateTimeM}:${dateTimeS}`;
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
  return LoopIcon;
};

export const getProgress = (currentTime, duration) =>
  parseFloat(100 * (currentTime / duration));

export const getCurrentTime = (progress, duration) =>
  parseFloat((progress * duration) / 100);
