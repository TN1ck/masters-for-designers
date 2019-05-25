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

const FooterInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: black;
  padding: 10px 0;
  color: white;
  text-transform: uppercase;
`;

const FoooterRightSide = styled.div`
  display: flex;
  align-items: center;
`;

const FooterLink = styled(Link)`
  margin-right: 10px;
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
              <InstagramLink />
              <FacebookLink />
            </FoooterRightSide>
          </FooterInnerContainer>
        </Container>
      </FooterContainer>
    );
  }
};

export default Footer;
