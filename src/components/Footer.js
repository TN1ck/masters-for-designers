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
  display: flex;
  align-self: flex-end;
`;

const FooterInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: black;
  padding: 10px 0;
  color: white;
  text-transform: uppercase;

  @media (max-width: 800px) {
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }
`;

const FoooterRightSide = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 800px) {
    margin-top: 10px;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
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

const Footer = class extends React.Component {
  render() {
    return (
      <FooterContainer>
        <Container>
          <FooterInnerContainer>
            <FooterLink to="/">
              <i>M</i>aster for <i>D</i>esigners
            </FooterLink>
            <FoooterRightSide>
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/glossary">Glossar</FooterLink>
              <FooterLink to="/imprint">Impressum</FooterLink>
              <FooterLink to="/privacy">Datenschutz</FooterLink>
              <FooterSocialLinks>
                <InstagramLink />
                <FacebookLink />
              </FooterSocialLinks>
            </FoooterRightSide>
          </FooterInnerContainer>
        </Container>
      </FooterContainer>
    );
  }
};

export default Footer;
