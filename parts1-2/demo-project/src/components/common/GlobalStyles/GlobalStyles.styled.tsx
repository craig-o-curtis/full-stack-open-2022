import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    padding: 0;
    margin: 0;
    height: 100%;
  }
  #root {
    height: 100%;
  }
  h1,h2,h3,h4,h5,h6 {
    margin: 0;
  }
`;

export default GlobalStyles;
