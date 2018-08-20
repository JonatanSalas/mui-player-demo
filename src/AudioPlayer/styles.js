import { lighten } from "@material-ui/core/styles/colorManipulator";

const getColor = (theme, type, opacity) => {
  const color = theme.palette[type][theme.palette.type === "light" ? "main" : "dark"];

  if (!opacity) {
    return color;
  }

  return lighten(color, opacity);
};

export default theme => ({
  "player-grid-container": {
    "background-color": theme.palette.background.default,
    margin: "0px",
    padding: "4px"
  },
  "player-centered-grid-item": {
    "text-align": "center"
  },
  "player-default-icon": {
    padding: "0px",
    margin: "0px",
    width: "30px",
    height: "30px",
    fill: getColor(theme, "primary"),
    color: getColor(theme, "primary"),
    "&:hover": {
      fill: getColor(theme, "primary", 0.25),
      color: getColor(theme, "primary", 0.25),
    }
  },
  "player-main-icon": {
    width: "40px",
    height: "40px",
    fill: getColor(theme, "secondary"),
    color: getColor(theme, "secondary"),
    "&:hover": {
      fill: getColor(theme, "secondary", 0.25),
      color: getColor(theme, "secondary", 0.25)
    }
  },
  "player-slider-bar": {
    width: "auto !important",
    "border-radius": "4px",
    "margin-top": "4px",
    height: "9px"
  },
  "player-text-timer": {
    color: theme.palette.getContrastText(theme.palette.background.default),
    "margin-top": "10px"
  }
});
