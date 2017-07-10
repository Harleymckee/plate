import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
    :root {
      --black: #000;
      --near-black: #111;
      --dark-gray:#333;
      --mid-gray:#555;
      --gray: #777;
      --silver: #999;
      --light-silver: #aaa;
      --moon-gray: #ccc;
      --light-gray: #eee;
      --near-white: #f4f4f4;
      --white: #fff;

      --dark-red: #f00008;
      --red: #ff3223;
      --orange: #f3a801;
      --gold: #f2c800;
      --yellow: #ffde37;
      --light-yellow: #FBF1A9;
      --purple: #7d5da9;
      --light-purple: #8d4f92;

  }
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;
