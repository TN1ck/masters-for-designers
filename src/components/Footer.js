import React from "react";
import styled from "styled-components";
import Container from "./Container";
import {Link} from "gatsby";
import {FacebookLink, InstagramLink} from "./Social";

const FooterContainer = styled.div`
  background: black;
  color: white;
  text-transform: uppercase;
`;

const FooterSocialLinks = styled.div`
  grid-area: footer-social-links;
  display: flex;
  justify-content: flex-end;
`;

const FooterInnerContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto 72px;
  grid-template-rows: auto;
  grid-template-areas: "footer-header footer-links footer-social-links";

  background: black;
  padding: 10px 0;
  color: white;
  text-transform: uppercase;

  @media (max-width: 800px) {
    grid-template-columns: auto auto;
    grid-template-rows: auto;
    grid-template-areas: "footer-header footer-social-links" "footer-links footer-links";
  }
`;

const FooterLink = styled(Link)`
  margin-right: 24px;
  &,
  &:hover,
  &:visited {
    color: white;
    border: none;
  }
  text-decoration: none;
  text-transform: uppercase;
`;

const FooterHeader = styled(FooterLink)`
  font-size: 18px;
  grid-area: footer-header;
`;

const FooterLinks = styled.div`
  grid-area: footer-links;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 800px) {
    margin-top: 10px;
    width: 100%;
    justify-content: flex-start;
  }

  @media (max-width: 450px) {
    flex-direction: column;
    align-items: flex-start;

    & ${FooterLink} {
      margin-top: 5px;
    }
  }
`;

const Footer = class extends React.Component {
  render() {
    return (
      <FooterContainer>
        <Container>
          <FooterInnerContainer>
            <FooterHeader to="/">
              <i>M</i>aster for <i>D</i>esigners
            </FooterHeader>
            <FooterLinks>
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/glossary">Glossar</FooterLink>
              <FooterLink to="/imprint">Impressum</FooterLink>
              <FooterLink to="/privacy">Datenschutz</FooterLink>
            </FooterLinks>
            <FooterSocialLinks>
              <InstagramLink />
              <FacebookLink />
            </FooterSocialLinks>
          </FooterInnerContainer>
        </Container>
      </FooterContainer>
    );
  }
};

export default Footer;
