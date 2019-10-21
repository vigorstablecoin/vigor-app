import { lighten, darken } from 'polished';

const white = `#ffffff`
const bg = `#13161f`;
const primary = `#2fe7f3`;
const secondary = `#9100E7`; // unused for now, feel free to change
const gray = `#dbddea`;

const colors = {
    bg,
    bgLight: lighten(0.05, bg),
    bgLighter: lighten(0.1, bg),
    bgLightest: lighten(0.15, bg),
    white,
    whiteDark: darken(0.05, white),
    whiteDarker: darken(0.1, white),
    whiteDarkest: darken(0.15, white),
    primary,
    primaryDark: darken(0.05, primary),
    primaryDarker: darken(0.1, primary),
    primaryDarkest: darken(0.15, primary),
    secondary,
    secondaryDark: darken(0.05, secondary),
    secondaryDarker: darken(0.1, secondary),
    secondaryDarkest: darken(0.15, secondary),
    gray,
    grayDark: darken(0.5, gray),
    grayDarker: darken(0.1, gray),
};

export default colors;
