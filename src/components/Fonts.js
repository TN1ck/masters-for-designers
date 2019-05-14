import {createGlobalStyle} from "styled-components";

import L10RegularWoff2 from "../../fonts/L10-Regular.woff2";
import L10RegularWoff from "../../fonts/L10-Regular.woff";

// import L10RegularItalicWoff2 from "../../fonts/L10-RegularItalic.woff2";
import L10RegularItalicWoff from "../../fonts/L10-RegularItalic.woff";

import L10BoldWoff2 from "../../fonts/L10-Bold.woff2";
import L10BoldWoff from "../../fonts/L10-Bold.woff";

import L10MediumWoff2 from "../../fonts/L10-Medium.woff2";
import L10MediumWoff from "../../fonts/L10-Medium.woff";

import L10MediumItalicWoff from "../../fonts/L10-MediumItalic.woff";

// import L10BoldItalicWoff2 from "../../fonts/L10-BoldItalic.woff2";
import L10BoldItalicWoff from "../../fonts/L10-BoldItalic.woff";

const Fonts = createGlobalStyle`
  @font-face {
    font-family: "L10";
    font-weight: 400;
    font-style: normal;
    font-display: fallback;
    src: url(${L10RegularWoff2}) format("woff2"), url(${L10RegularWoff}) format("woff");
  }

  @font-face {
    font-family: "L10";
    font-weight: 400;
    font-style: italic;
    font-display: fallback;
    src: url(${L10RegularItalicWoff}) format("woff");
  }

  @font-face {
    font-family: "L10";
    font-weight: 700;
    font-style: normal;
    font-display: fallback;
    src: url(${L10BoldWoff2}) format("woff2"), url(${L10BoldWoff}) format("woff");
  }

  @font-face {
    font-family: "L10";
    font-weight: 700;
    font-style: italic;
    font-display: fallback;
    src: url(${L10BoldItalicWoff}) format("woff");
  }

  @font-face {
    font-family: "L10";
    font-weight: 500;
    font-style: italic;
    font-display: fallback;
    src: url(${L10MediumItalicWoff}) format("woff");
  }

  @font-face {
    font-family: "L10";
    font-weight: 500;
    font-style: normal;
    font-display: fallback;
    src:url(${L10MediumWoff2}) format("woff2"), url(${L10MediumWoff}) format("woff");
  }


`;

export default Fonts;
