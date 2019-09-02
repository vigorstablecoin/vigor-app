import { createGlobalStyle } from 'styled-components';
import { media } from './breakpoints';
import colors from './colors';

const GlobalStyles = createGlobalStyle`
body {
  padding: 0;
  margin: 0;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: ${colors.white};
  background-color: ${colors.bg};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  ${media.lessThan('xs-max')} {
    font-size: 15px;
  }
}

button, input[type="submit"], input[type="reset"] {
  background: none;
  border: none;
  color: inherit;
  padding: 0;
  font: inherit;
  cursor: pointer;
}

p {
  margin: 0;
}

* {
  font-family: Montserrat, sans-serif;
  box-sizing: border-box;
}
`;

export default GlobalStyles;
