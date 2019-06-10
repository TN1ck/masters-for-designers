import * as React from "react";
import styled from "styled-components";
import {Link} from "gatsby";
import closeIcon from "../img/close-white.svg";

const CookieBannerContainerInner = styled.div`
  padding: 20px;
  padding-top: 30px;
  padding-right: 60px;
`;

const CookieBannerContainer = styled.div`
  position: fixed;
  z-index: 99;
  bottom: 40px;
  max-width: 100%;
  width: 500px;
  right: 0;
  background-color: black;
  color: white;
  pointer-events: initial;
  display: none;

  & p {
    margin: 0;
    padding: 0;
  }

  & a {
    margin-left: 10px;
    color: white !important;
    border-bottom: 1px solid white !important;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
  background: none;
  border: none;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  padding: 0;
  line-height: 1;
  outline: none;
  &:hover {
    cursor: pointer;
  }
`;

const INLINE_SCRIPT = `
var COOKIE_KEY = "master-for-designers-1.0";
var showConsent = localStorage.getItem(COOKIE_KEY) === null;
if (showConsent) {
  var container = document.getElementById("cookie-banner");
  container.style.display = "block";
  var hide = function() {
    container.style.display = "none";
  };
  var hideForever = function() {
    hide();
    localStorage.setItem(COOKIE_KEY, "true");
  };

  document.getElementById("cookie-banner-close").onclick = function() {
    hideForever();
  };

  document.getElementById("cookie-banner-link").onclick = function() {
    hideForever();
  };
}
window.consentCodeExecuted = true;
`.trim();

export default class CookieBanner extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  componentDidMount() {
    // for development
    if (typeof window !== "undefined" && !window.consentCodeExecuted) {
      const script = document.createElement("script");
      script.innerHTML = INLINE_SCRIPT;
      document.body.appendChild(script);
    }
  }
  componentWillUnmount() {
    window.consentCodeExecuted = false;
  }
  render() {
    return (
      <CookieBannerContainer id="cookie-banner">
        <CloseButton id="cookie-banner-close">
          <img width={15} height={15} src={closeIcon} alt="close filters" />
        </CloseButton>
        <CookieBannerContainerInner>
          <p>
            MD verwendet Cookies. Mit der Nutzung der Webseite erklärst du dich damit einverstanden.
            <Link to="/privacy" id="cookie-banner-link">
              {"Erfahre Mehr"}
            </Link>
          </p>
        </CookieBannerContainerInner>
        <script dangerouslySetInnerHTML={{__html: INLINE_SCRIPT}} />
      </CookieBannerContainer>
    );
  }
}
