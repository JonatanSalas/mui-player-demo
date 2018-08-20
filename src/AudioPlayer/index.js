import React from "react";
import css from "classnames";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/lab/Slider";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import {
  getPlayerStateFromAction,
  getIconByPlayerStatus,
  getIconByMuteStatus,
  getIconByLoopStatus,
  getFormattedTime,
  removeFromEvent,
  getCurrentTime,
  attachToEvent,
  getProgress,
} from "./utils";

import Player from './utils/constants';

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
    width: "500px",
    height: "45px"
  };

  state = {
    current: 0,
    progress: 0,
    duration: 0,
    loopStatus: Player.Status.UNLOOP,
    playStatus: Player.Status.PAUSE,
    muteStatus: Player.Status.UNMUTE
  };

  componentDidMount() {
    attachToEvent(this.player, Player.Events.CAN_PLAY, this.handleCanPlay);

    if (this.props.autoPlay) {
      this.triggerAction(Player.Status.PLAY);
    }
  }

  componentWillUnmount() {
    if (this.player) {
      removeFromEvent(this.player, Player.Events.TIME_UPDATE, this.handleTimeUpdate);
      removeFromEvent(this.player, Player.Events.CAN_PLAY, this.handleCanPlay);

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
          className={css(classes["player-grid-container"], player)}
          elevation={1}
          square={true}
          style={{
            width,
            height
          }}
        >
          <Grid alignItems="center" justify="center" spacing={0} container>
            <Grid className={classes["player-centered-grid-item"]} xs={1} item>
              <LoopStatusIcon
                onClick={() => this.triggerAction(Player.Status.LOOP)}
                className={css(classes["player-default-icon"], loopIcon)}
                focusable="true"
              />
            </Grid>
            <Grid className={classes["player-centered-grid-item"]} xs={1} item>
              <PlayStatusIcon
                onClick={() => this.triggerAction(Player.Status.PLAY)}
                className={css(classes["player-default-icon"], classes["player-main-icon"], playIcon)}
                focusable="true"
              />
            </Grid>
            <Grid className={classes["player-centered-grid-item"]} xs={1} item>
              <MuteStatusIcon
                onClick={() => this.triggerAction(Player.Status.MUTE)}
                className={css(classes["player-default-icon"], muteIcon)}
                focusable="true"
              />
            </Grid>
            <Grid className={classes["player-centered-grid-item"]} xs={9} item>
              <Grid justify="center" spacing={0} direction="row" container>
                <Grid className={classes["player-centered-grid-item"]} xs={2} item>
                  <Typography
                    className={css(classes["player-text-timer"], text)}
                    align="center"
                    gutterBottom
                    noWrap
                  >
                    {getFormattedTime(current)}
                  </Typography>
                </Grid>
                <Grid className={classes["player-centered-grid-item"]} xs={8} item>
                  <Slider
                    onChange={(_, progress) => this.handleChange(progress, this.player)}
                    className={css(classes["player-slider-bar"], slider)}
                    variant="determinate"
                    color="secondary"
                    value={progress}
                  />
                </Grid>
                <Grid className={classes["player-centered-grid-item"]} xs={2} item>
                  <Typography
                    className={css(classes["player-text-timer"], text)}
                    align="center"
                    gutterBottom
                    noWrap
                  >
                    {getFormattedTime(duration)}
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
    attachToEvent(player, Player.Events.TIME_UPDATE, this.handleTimeUpdate);

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
