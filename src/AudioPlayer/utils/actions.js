import Player from './constants';

export const playAudio = player => {
  if (player) {
    let status = null;

    if (player.paused) {
      player.play();
      status = Player.Status.PLAY;
    } else {
      player.pause();
      status = Player.Status.PAUSE;
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
      status = Player.Status.UNMUTE;
    } else {
      player.muted = true;
      status = Player.Status.MUTE;
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
      status = Player.Status.UNLOOP;
    } else {
      player.loop = true;
      status = Player.Status.LOOP;
    }

    return { loopStatus: status };
  }

  return null;
};

export const getPlayerStateFromAction = (player, action) => {
  let newState = null;

  switch (action) {
    case Player.Status.LOOP:
      newState = loopAudio(player);
      break;
    case Player.Status.MUTE:
      newState = muteAudio(player);
      break;
    case Player.Status.PLAY:
    default:
      newState = playAudio(player);
      break;
  }

  return newState;
};
