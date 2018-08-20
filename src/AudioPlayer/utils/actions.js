import { PlayerStatus } from "./index";

export const playAudio = player => {
  if (player) {
    let status = null;

    if (player.paused) {
      player.play();
      status = PlayerStatus.PLAYING;
    } else {
      player.pause();
      status = PlayerStatus.PAUSED;
    }

    return { playStatus: status };
  }

  return null;
};

export const muteAudio = player => {
  if (player) {
    let status = null;

    if (player.muted) {
      player.muted = false;
      status = PlayerStatus.UNMUTED;
    } else {
      player.muted = true;
      status = PlayerStatus.MUTED;
    }

    return { muteStatus: status };
  }

  return null;
};

export const loopAudio = player => {
  if (player) {
    let status = null;

    if (player.loop) {
      player.loop = false;
      status = PlayerStatus.UNLOOP;
    } else {
      player.loop = true;
      status = PlayerStatus.LOOP;
    }

    return { loopStatus: status };
  }

  return null;
};

export const getPlayerStateFromAction = (player, action) => {
  let newState = null;

  switch (action) {
    case PlayerStatus.LOOP:
      newState = loopAudio(player);
      break;
    case PlayerStatus.MUTED:
      newState = muteAudio(player);
      break;
    case PlayerStatus.PLAYING:
    default:
      newState = playAudio(player);
      break;
  }

  return newState;
};
