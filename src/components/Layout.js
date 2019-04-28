import React from "react";
import {createGlobalStyle} from "styled-components";
import Helmet from "react-helmet";

import Footer from "../components/Footer";
import useSiteMetadata from "./SiteMetadata";

// import "./all.sass";
import Fonts from "./Fonts";

const GlobalStyle = createGlobalStyle`
  body, html {
    font-family: L10;
    padding: 0;
    margin: 0;
    font-weight: 300;
  }
`;

const TemplateWrapper = ({children}) => {
  const {title, description} = useSiteMetadata();
  return (
    <div>
      <GlobalStyle />
      <Fonts />
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
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default TemplateWrapper;