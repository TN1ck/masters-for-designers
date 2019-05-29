import React from "react";
import {createGlobalStyle} from "styled-components";
import Helmet from "react-helmet";

import Footer from "../components/Footer";
import useSiteMetadata from "./SiteMetadata";

// import "./all.sass";
import Fonts from "./Fonts";
import CookieBanner from "./CookieBanner";

export const GlobalStyle = createGlobalStyle`
  body, html {
    font-family: L10, Helvetica Neue, Helvetica, Arial, Sans-Serif;
    padding: 0;
    margin: 0;
    font-weight: 400;
    line-height: 1.4;
  }

  * {
    box-sizing: border-box;
  }

  a, a:visited, a:focus {
    color: black;
    text-decoration: none;
    border-bottom: 1px solid black;
  }
`;

const Layout = ({children, background}) => {
  const {title, description} = useSiteMetadata();
  return (
    <div>
      <GlobalStyle />
      <Fonts />
      <CookieBanner />
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
        <link rel="icon" type="image/png" href="/img/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/img/favicon-16x16.png" sizes="16x16" />

        <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#ff4400" />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta property="og:image" content="/img/og-image.jpg" />
      </Helmet>
      {/* We give it a min-height of 100vh to make sure the footer is not looking broken, 49 is the desktop height of the footer*/}
      <div style={{minHeight: "calc(100vh - 49px)", background}}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
