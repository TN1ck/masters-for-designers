import * as Sentry from "@sentry/browser";
import React from "react";
import {createGlobalStyle} from "styled-components";
import Helmet from "react-helmet";

import Footer from "../components/Footer";
import useSiteMetadata from "./SiteMetadata";

// import "./all.sass";
import Fonts from "./Fonts";
import CookieBanner from "./CookieBanner";
import THEME from "../theme";

Sentry.init({dsn: "https://23dd6c59639548449a21fd6c8984504c@sentry.io/1499779"});

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
  const {title, description, siteUrl} = useSiteMetadata();
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

        <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color={THEME.colors.orange} />
        <meta name="theme-color" content={THEME.colors.orange} />

        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/mastersfordesigners.png`} />
        <meta property="twitter:image" content={`${siteUrl}/mastersfordesigners.png`} />
      </Helmet>
      {/* We give it a min-height of 100vh to make sure the footer is not looking broken, 49 is the desktop height of the footer*/}
      <div style={{minHeight: "calc(100vh - 49px)", background}}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
