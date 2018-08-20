import PauseIcon from "@material-ui/icons/PauseCircleFilled";
import PlayIcon from "@material-ui/icons/PlayCircleFilled";
import VolumeOff from "@material-ui/icons/VolumeOff";
import VolumeUp from "@material-ui/icons/VolumeUp";
import LoopIcon from "@material-ui/icons/Sync";
import UnLoopIcon from "@material-ui/icons/SyncDisabled";

export const PlayerStatus = {
  PLAYING: "play",
  PAUSED: "pause",
  MUTED: "mute",
  UNMUTED: "unmute",
  LOOP: "loop",
  UNLOOP: "unloop"
};

export const appendZero = number => {
  if (number < 10) {
    return `0${number}`;
  }

  return number;
};

export const formatProgressOverDuration = (progress, duration) => {
  const progressTime = new Date(0, 0, 0, 0, 0, progress, 0);
  const durationTime = new Date(0, 0, 0, 0, 0, duration, 0);

  const progressM = appendZero(progressTime.getMinutes());
  const progressS = appendZero(progressTime.getSeconds());

  const durationM = appendZero(durationTime.getMinutes());
  const durationS = appendZero(durationTime.getSeconds());

  const progressValue = `${progressM}:${progressS}`;
  const durationValue = `${durationM}:${durationS}`;

  return `${progressValue} / ${durationValue}`;
};

export const getIconByPlayerStatus = playerStatus => {
  switch (playerStatus) {
    case PlayerStatus.PAUSED:
      return PlayIcon;
    case PlayerStatus.PLAYING:
    default:
      return PauseIcon;
  }
};

export const getIconByMuteStatus = muteStatus => {
  switch (muteStatus) {
    case PlayerStatus.MUTED:
      return VolumeOff;
    case PlayerStatus.UNMUTED:
    default:
      return VolumeUp;
  }
};

export const getIconByLoopStatus = loopStatus => {
  switch (loopStatus) {
    case PlayerStatus.LOOP:
      return LoopIcon;
    case PlayerStatus.UNLOOP:
    default:
      return UnLoopIcon;
  }
}

export const getProgress = (currentTime, duration) =>
  parseFloat(100 * (currentTime / duration));

export const getCurrentTime = (progress, duration) =>
  parseFloat((progress * duration) / 100);
