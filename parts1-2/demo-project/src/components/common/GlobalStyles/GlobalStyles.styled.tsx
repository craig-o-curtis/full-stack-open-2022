import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    overflow:hidden;
    height: 100%;
  }
  body {
    padding: 0;
    margin: 0;
    overflow:hidden;
    height: 100%;
  }
  #root {
    height: 100%;
  }
  h1,h2,h3,h4,h5,h6 {
    margin: 0;
  }
`

export default GlobalStyles;