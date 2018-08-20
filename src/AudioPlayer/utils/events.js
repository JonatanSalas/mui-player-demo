export const PlayerEvents = {
  TIME_UPDATE: "timeupdate",
  CAN_PLAY: "canplaythrough"
};

export const attachToEvent = (player, name, callback) => {
  if (player) {
    player.addEventListener(name, () => callback(player), false);
  }
};

export const removeFromEvent = (player, name, callback) => {
  if (player) {
    player.removeEventListener(name, () => callback(player), false);
  }
};
