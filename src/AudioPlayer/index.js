import React from "react";
import css from "classnames";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/lab/Slider";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import {
  formatProgressOverDuration,
  getIconByPlayerStatus,
  getIconByMuteStatus,
  getIconByLoopStatus,
  getCurrentTime,
  getProgress,
  PlayerStatus
} from "./utils";

import { getPlayerStateFromAction } from "./utils/actions";
import { attachToEvent, removeFromEvent, PlayerEvents } from "./utils/events";

import styles from "./styles";

class AudioPlayer extends React.PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    classes: PropTypes.object,
    classNames: PropTypes.shape({
      player: PropTypes.string,
      loopIcon: PropTypes.string,
      playIcon: PropTypes.string,
      muteIcon: PropTypes.string,
      slider: PropTypes.string,
      text: PropTypes.string
    })
  };

  static defaultProps = {
    classes: {},
    classNames: {},
    width: "450px",
    height: "45px"
  };

  state = {
    current: 0,
    progress: 0,
    duration: 0,
    loopStatus: PlayerStatus.UNLOOP,
    playStatus: PlayerStatus.PAUSED,
    muteStatus: PlayerStatus.UNMUTED
  };

  componentDidMount() {
    attachToEvent(this.player, PlayerEvents.CAN_PLAY, this.handleCanPlay);

    if (this.props.autoPlay) {
      this.triggerAction(PlayerStatus.PLAYING);
    }
  }

  componentWillUnmount() {
    if (this.player) {
      removeFromEvent(this.player, PlayerEvents.TIME_UPDATE, this.handleTimeUpdate);
      removeFromEvent(this.player, PlayerEvents.CAN_PLAY, this.handleCanPlay);

      this.player = null;
    }
  }

  render() {
    const { width, height, src, classes, classNames: { player, loopIcon, playIcon, muteIcon, slider, text } } = this.props;
    const { loopStatus, playStatus, muteStatus, progress, current, duration } = this.state;

    const PlayStatusIcon = getIconByPlayerStatus(playStatus);
    const MuteStatusIcon = getIconByMuteStatus(muteStatus);
    const LoopStatusIcon = getIconByLoopStatus(loopStatus);

    return (
      <React.Fragment>
        <audio
          ref={node => (this.player = node)}
          controls="true"
          preload="true"
          hidden="true"
        >
          <source src={src} />
        </audio>
        <Paper
          className={css(classes["player"], player)}
          elevation={1}
          square={true}
          style={{
            width,
            height
          }}
        >
          <Grid alignItems="center" justify="center" spacing={16} container>
            <Grid xs={1} item>
              <LoopStatusIcon
                onClick={() => this.triggerAction("loop")}
                className={css(classes["loop-icon"], loopIcon)}
              />
            </Grid>
            <Grid xs={1} item>
              <PlayStatusIcon
                onClick={() => this.triggerAction("play")}
                className={css(classes["play-icon"], playIcon)}
              />
            </Grid>
            <Grid xs={1} item>
              <MuteStatusIcon
                onClick={() => this.triggerAction("mute")}
                className={css(classes["mute-icon"], muteIcon)}
              />
            </Grid>
            <Grid xs={9} item>
              <Grid spacing={8} direction="row" container>
                <Grid xs={8} item>
                  <Slider
                    onChange={(_, progress) => this.handleChange(progress, this.player)}
                    className={css(classes["progress"], slider)}
                    variant="determinate"
                    color="secondary"
                    value={progress}
                  />
                </Grid>
                <Grid xs={4} item>
                  <Typography
                    className={css(classes["text"], text)}
                    align="center"
                    gutterBottom
                    noWrap
                  >
                    {formatProgressOverDuration(current, duration)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </React.Fragment>
    );
  }

  triggerAction = action => {
    const newState = getPlayerStateFromAction(this.player, action);

    if (newState) {
      this.setState(newState);
    }
  };

  handleCanPlay = player => {
    attachToEvent(player, PlayerEvents.TIME_UPDATE, this.handleTimeUpdate);
  
    this.setState({
      duration: player.duration
    });
  };

  handleTimeUpdate = player => {
    this.setState({
      current: player.currentTime,
      progress: getProgress(player.currentTime, player.duration)
    });
  };

  handleChange = (progress, player) => {
    if (player) {
      const currentTime = getCurrentTime(progress, player.duration);

      if (!isNaN(currentTime)) {
        player.currentTime = currentTime;
      }

      this.setState({
        progress,
        currentTime
      });
    }
  };
}

export default withStyles(styles, { withTheme: true })(AudioPlayer);
